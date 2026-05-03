# API-ODS

This project is a NestJS REST API for registering and consulting sustainable practices aligned with ODS 12 and ODS 13.

Quick start

1. Copy `.env.example` to `.env` and set `MONGODB_URI` if needed.

2. Install dependencies:

```bash
npm install
```

3. Start the app (development):

```bash
npm run start:dev
```

Endpoints

- POST `/pratica` — create a practice
	- body: `{ nomeUsuario, tipo, data (YYYY-MM-DD), descricao? }`
- GET `/historico` — list practices, optional query: `nomeUsuario`, `tipo`, `dataInicial`, `dataFinal`
- GET `/estatisticas` — consolidated statistics

Example curl to create:

```bash
curl -X POST http://localhost:3000/pratica -H "Content-Type: application/json" -d '{"nomeUsuario":"Joao","tipo":"Uso de copo reutilizável","data":"2026-05-02","descricao":"Levei meu copo"}'
```

API desenvolvida para fins da disciplina de Web Mobile, do curso de Análise e Desenvolvimento de Sistemas da Universidade Presbiteriana Mackenzie
