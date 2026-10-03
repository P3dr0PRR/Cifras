const express = require('express');
const { authRouter } = require('./src/auth');
const { sendError } = require('./src/sendError');
const { userRouter } = require('./src/user');

const app = express();

const FRONT_END_PORT = process.env.FRONT_END_PORT || 3998;
const ALLOWED_ORIGIN_PATTERN = new RegExp(
  `^http://(localhost|127\\.0\\.0\\.1|192\\.168\\.\\d{1,3}\\.\\d{1,3}|10\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}):${FRONT_END_PORT}$`,
);

app.use((request, response, next) => {
  const requestOrigin = request.headers.origin;
  if (requestOrigin && ALLOWED_ORIGIN_PATTERN.test(requestOrigin)) {
    response.setHeader('Access-Control-Allow-Origin', requestOrigin);
    response.setHeader('Vary', 'Origin');
  }
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS',
  );
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  );

  if (request.method === 'OPTIONS') {
    return response.sendStatus(204);
  }

  next();
});

app.use(express.json());

app.get('/', (request, response) => {
  return response.send('Hello World!');
});

app.use(authRouter);
app.use(userRouter);

app.use((error, request, response, next) => {
  if (error.type === 'entity.parse.failed') {
    return sendError(response, 400, 'JSON invalido no corpo da requisicao');
  }
  return sendError(response, 500, 'Erro interno do servidor');
});

const PORT = process.env.PORT || 3999;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
