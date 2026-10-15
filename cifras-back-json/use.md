# Documentacao de Uso da API

Backend de autenticacao com JWT e persistencia em arquivo JSON (`users.json`).

## Execucao

```bash
npm install
npm run dev
```

Servidor em `http://localhost:3999`. CORS liberado para o front na porta 3998 em `localhost` e na rede local (`192.168.x.x` e `10.x.x.x`). A porta do front pode ser trocada com a variavel `FRONT_END_PORT`.

Erros sempre voltam no formato `{ "statusCode": 400, "message": "..." }` (em erros de validacao, `message` e uma lista).

## Usuario

Formato: `{ "id": 1, "name": "...", "instrument": "...", "email": "...", "password": "..." }`. A senha e salva com hash (scrypt) e nunca e devolvida.

| Metodo | Rota | Token | Descricao |
| --- | --- | --- | --- |
| POST | `/user` | nao | Cadastra. Body: `name`, `instrument`, `email`, `password` (min. 6). 409 se o email ja existe |
| GET | `/user` | nao | Lista todos |
| GET | `/user/:id` | nao | Busca por id. 404 se nao existe |
| PATCH | `/user/:id` | sim | Atualiza qualquer campo do cadastro |
| DELETE | `/user/:id` | sim | Remove |

## Autenticacao

### `POST /auth/login`

Body: `{ "email": "...", "password": "...", "type": "json" }` (`type` e opcional).

Resposta 200:

```json
{
  "success": true,
  "token": "<TOKEN_JWT>",
  "user": { "id": 1, "name": "...", "instrument": "...", "email": "..." },
  "type": "json"
}
```

401 com `Credenciais invalidas` se o email ou a senha estiverem errados. O token vale 1 dia e carrega `userId`, `email` e `name`.

### `GET /perfil` (token)

Header `Authorization: Bearer <TOKEN_JWT>` (ou `?token=<TOKEN_JWT>`). Devolve os dados do token.
