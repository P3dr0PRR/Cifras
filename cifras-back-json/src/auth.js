const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyPassword } = require('./password');
const { sendError } = require('./sendError');
const { findUserByEmail, toPublicUser } = require('./userStore');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';
const TOKEN_EXPIRATION = '1d';

function authenticateToken(request, response, next) {
  const authorizationHeader = request.headers.authorization;
  const token =
    (authorizationHeader && authorizationHeader.split(' ')[1]) ||
    request.query.token;

  if (!token) {
    return sendError(response, 401, 'Token nao fornecido');
  }

  jwt.verify(token, JWT_SECRET, (error, tokenPayload) => {
    if (error) {
      return sendError(response, 403, 'Token invalido ou expirado');
    }
    request.user = tokenPayload;
    next();
  });
}

const authRouter = express.Router();

authRouter.post('/auth/login', (request, response) => {
  const { email, password, type } = request.body;

  if (typeof email !== 'string' || typeof password !== 'string') {
    return sendError(response, 400, 'Email e password sao obrigatorios');
  }

  const authType = (type || 'json').toLowerCase();
  if (authType !== 'json') {
    return sendError(
      response,
      400,
      'Tipo de autenticacao invalido ou indisponivel. Use "json"',
    );
  }

  const user = findUserByEmail(email);
  if (!user || !verifyPassword(password, user.password)) {
    return sendError(response, 401, 'Credenciais invalidas');
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRATION },
  );

  return response.json({
    success: true,
    token,
    user: toPublicUser(user),
    type: authType,
  });
});

authRouter.get('/perfil', authenticateToken, (request, response) => {
  return response.json({ message: 'Acesso autorizado', user: request.user });
});

module.exports = { authRouter, authenticateToken };
