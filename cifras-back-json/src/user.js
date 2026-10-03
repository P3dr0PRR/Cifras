const express = require('express');
const { authenticateToken } = require('./auth');
const { hashPassword } = require('./password');
const { sendError } = require('./sendError');
const {
  readUsers,
  saveUsers,
  findUserByEmail,
  nextUserId,
  toPublicUser,
} = require('./userStore');

const USER_FIELDS = ['name', 'instrument', 'email', 'password'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

function pickUserFields(body) {
  const userFields = {};
  for (const fieldName of USER_FIELDS) {
    if (body[fieldName] !== undefined) {
      userFields[fieldName] = body[fieldName];
    }
  }
  return userFields;
}

function isFilledString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function validateUserFields(userFields, { isPartial }) {
  const shouldValidate = (fieldName) =>
    !isPartial || userFields[fieldName] !== undefined;
  const validationErrors = [];

  if (shouldValidate('name') && !isFilledString(userFields.name)) {
    validationErrors.push('name nao pode ser vazio');
  }
  if (shouldValidate('instrument') && !isFilledString(userFields.instrument)) {
    validationErrors.push('instrument nao pode ser vazio');
  }
  if (
    shouldValidate('email') &&
    !(
      typeof userFields.email === 'string' &&
      EMAIL_PATTERN.test(userFields.email)
    )
  ) {
    validationErrors.push('email deve ser um email valido');
  }
  if (
    shouldValidate('password') &&
    !(
      typeof userFields.password === 'string' &&
      userFields.password.length >= MIN_PASSWORD_LENGTH
    )
  ) {
    validationErrors.push(
      `password deve ter no minimo ${MIN_PASSWORD_LENGTH} caracteres`,
    );
  }

  return validationErrors;
}

function parseUserId(request, response) {
  const userId = Number(request.params.id);
  if (!Number.isInteger(userId)) {
    sendError(response, 400, 'id deve ser um numero inteiro');
    return null;
  }
  return userId;
}

const userRouter = express.Router();

userRouter.post('/user', (request, response) => {
  const userFields = pickUserFields(request.body);
  const validationErrors = validateUserFields(userFields, { isPartial: false });
  if (validationErrors.length > 0) {
    return sendError(response, 400, validationErrors);
  }

  if (findUserByEmail(userFields.email)) {
    return sendError(response, 409, 'Email ja cadastrado');
  }

  const users = readUsers();
  const newUser = {
    id: nextUserId(users),
    ...userFields,
    password: hashPassword(userFields.password),
  };
  users.push(newUser);
  saveUsers(users);

  return response.status(201).json(toPublicUser(newUser));
});

userRouter.get('/user', (request, response) => {
  return response.json(readUsers().map(toPublicUser));
});

userRouter.get('/user/:id', (request, response) => {
  const userId = parseUserId(request, response);
  if (userId === null) {
    return;
  }

  const user = readUsers().find((storedUser) => storedUser.id === userId);
  if (!user) {
    return sendError(response, 404, 'Usuario nao encontrado');
  }

  return response.json(toPublicUser(user));
});

userRouter.patch('/user/:id', authenticateToken, (request, response) => {
  const userId = parseUserId(request, response);
  if (userId === null) {
    return;
  }

  const userFields = pickUserFields(request.body);
  if (Object.keys(userFields).length === 0) {
    return sendError(response, 400, 'Informe ao menos um campo para atualizar');
  }

  const validationErrors = validateUserFields(userFields, { isPartial: true });
  if (validationErrors.length > 0) {
    return sendError(response, 400, validationErrors);
  }

  const users = readUsers();
  const user = users.find((storedUser) => storedUser.id === userId);
  if (!user) {
    return sendError(response, 404, 'Usuario nao encontrado');
  }

  if (userFields.email) {
    const userWithSameEmail = findUserByEmail(userFields.email);
    if (userWithSameEmail && userWithSameEmail.id !== userId) {
      return sendError(response, 409, 'Email ja cadastrado');
    }
  }

  Object.assign(user, userFields);
  if (userFields.password) {
    user.password = hashPassword(userFields.password);
  }
  saveUsers(users);

  return response.json(toPublicUser(user));
});

userRouter.delete('/user/:id', authenticateToken, (request, response) => {
  const userId = parseUserId(request, response);
  if (userId === null) {
    return;
  }

  const users = readUsers();
  const userIndex = users.findIndex((storedUser) => storedUser.id === userId);
  if (userIndex === -1) {
    return sendError(response, 404, 'Usuario nao encontrado');
  }

  const [removedUser] = users.splice(userIndex, 1);
  saveUsers(users);

  return response.json(toPublicUser(removedUser));
});

module.exports = { userRouter };
