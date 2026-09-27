# Cifras — Roadmap da versão Alpha

> **Objetivo da alpha:** provar o fluxo de identidade (cadastrar → entrar → sessão → área protegida → sair). Nada além disso.
> **Régua:** caprichar onde é caro consertar depois (segurança, contratos de dados, validação). Não perfeccionismo em UI/features ainda.
> Marque cada item trocando `[ ]` por `[x]` (ou escreva `OK` na frente) conforme a gente for fazendo.

Legenda de status inicial: ✅ feito · 🟡 parcial · ⬜ a fazer

---

## F0 · Base limpa (higiene que evita retrabalho)

- [ ] ⬜ Desfazer a pasta aninhada `Cifras Back-end/project-name` → mover o Nest pra raiz (origem dos erros de comando na pasta errada)
- [ ] 🟡 Decisão consciente de linter/formatter: Biome (front) e ESLint+Prettier (back), com `format on save` por projeto
- [ ] ⬜ `.env` no `.gitignore` + `.env.example` versionado + `JWT_SECRET` forte
- [ ] ⬜ README "rodar em 3 comandos": `docker compose up` → `prisma migrate` → `npm run start:dev`

## F1 · Contratos de dados (o "bem feito")

- [ ] ⬜ DTOs reais com `class-validator`: `RegisterDto` e `LoginDto` (hoje o login é inline e não valida nada)
- [ ] 🟡 Nunca retornar `password` — centralizar o "omit" (`const { password: _, ...rest }`) num único serializer/interceptor
- [ ] ⬜ Exception filter global: erros com formato previsível, sem vazar stack trace

## F2 · Identidade ponta a ponta (coração da alpha)

- [ ] 🟡 Cadastro completo front → back → Prisma com bcrypt + tratamento de e-mail duplicado (`@unique`)
- [ ] 🟡 JWT com payload mínimo (`sub: id`), expiração definida, segredo do `.env`
- [ ] ⬜ Cookie `httpOnly` + `Secure` + `SameSite`
- [ ] ⬜ Guard no back (`JwtAuthGuard`) nas rotas privadas — o back nunca confia no cliente
- [ ] ⬜ Logout (limpar cookie) + middleware do front cobrindo as rotas reais (hoje só `/`)

## F3 · Blindagem mínima (barato agora, caro depois)

- [ ] ⬜ CORS restrito à origem do front (hoje `enableCors()` está aberto)
- [ ] ⬜ Rate limit no login (`@nestjs/throttler`) — trava força-bruta
- [ ] ⬜ Erro de login genérico ("credenciais inválidas", sem revelar se o e-mail existe) + Helmet

## F4 · UX de autenticação (usável, não bonito ainda)

- [ ] ⬜ Estados de loading, erro e sucesso nos forms de login/register
- [ ] ⬜ Validação no cliente espelhando as regras do back
- [ ] 🟡 Redirecionos corretos (logado → home, deslogado → login)

## F5 · Confiança (prova de que funciona)

- [ ] ⬜ Testes do `auth.service`: login ok, senha errada, usuário inexistente, e-mail duplicado
- [ ] ⬜ Um teste e2e do login + `npm run build` e lint limpos + zero `any` no auth

## F6 · Fechar a alpha (Definition of Done)

- [ ] ⬜ Rodar num clone limpo, do zero: cadastrar → entrar → área protegida → sair
- [ ] ⬜ Tag `v0.1.0-alpha` no git + destravar o backlog de features do pai

---

**Definition of Done da alpha:** o caminho `cadastrar → entrar → sessão via cookie httpOnly → área protegida (guard) → sair` funciona num ambiente limpo, com o back recusando qualquer atalho pelo cliente.
