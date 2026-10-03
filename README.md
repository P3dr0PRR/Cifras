# Cifras

**Cifras** é um sistema web para músicos que auxilia em ensaios e praticas com musicas.

## Status

Em desenvolvimento — fase **alpha**: cadastro e login de usuários.
O registro de ensaios e cifras entra depois que a alpha fechar.

## Stack

- **Front-end:**  Next, TypeScript, Tailwind
- **Back-end:**  Node.js, express, autenticação com JWT
- **Armazenamento:** arquivo JSON local

## Estrutura de pastas

```
cifras/
├── cifras-front-end/   # front-end (Next.js + Tailwind)
├── cifras-back-json/   # back-end (Express + JWT) + documentação da API (use.md)
├── README.md
└── ROADMAP-ALPHA.md    # planejamento da alpha
```

## Como rodar

### Pré-requisitos

- Node.js 22 (testado na 22.20.0)

Todos os comandos partem da raiz do projeto
Antes de rodar, abra `cifras-front-end/app/(system)/settingss/settings.tsx` e ajuste o `urlBaseBack` para `http://localhost:3999`.

### 1. Back-end (Em um terminal só para ele. Suba primeiro: o back-end)

```bash
cd cifras-back-json
npm install
npm run dev
```

API disponível em `http://localhost:3999`.

### 2. Front-end (rodar depois do back-end, em um terminal só para ele suba o front-end)

```bash
cd cifras-front-end
npm install
npm run dev
```

Acesse `http://localhost:3998`.

### Acessar pelo celular (mesma rede Wi-Fi)

1. O celular precisa estar conectado no mesmo wifi que o computador.
2. No seu computador, abra sua conexão wifi no computador e anote o Endereço IPv4.
3. No arquivo `cifras-front-end/app/(system)/settingss/settings.tsx`, troque o IP do urlBaseBack por `http://SEU_IP:3999.`
4. Suba o back e o front normalmente.
5. No navegador do celular, acesse `http://SEU_IP:3998`.
6. Se não abrir, libere as portas `3998` e `3999` no Firewall do Windows.

### Primeiro acesso

O arquivo de usuários não vem no projeto: ele é criado sozinho no primeiro cadastro. Então o primeiro passo é se cadastrar e, depois, entrar no sistema com o e-mail e a senha cadastrados.

## Documentação da API

Rotas, formatos e respostas estão em [Documentação de Uso da API](cifras-back-json/use.md).

## Roadmap

Objetivo do app e informações sobre a versão atual estão em [Cifras — Roadmap da versão Alpha](ROADMAP-ALPHA.md).

