# Achadinhos do Condomínio

Marketplace que conecta síndicos e administradores de condomínio a prestadores
de serviço, empresas e afiliados. Site: <https://achadinhoscondominio.com.br>
(também instalável como PWA).

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 16 (App Router, `output: "export"` estático), React 19, Tailwind 4, PWA (Serwist) |
| Backend | Go 1.25, Gin, GORM, PostgreSQL 18, JWT (HS256) |
| Deploy | Imagem única (Go serve a API **e** o frontend embutido) → GHCR → Traefik/Cloudflare |

## Rodar localmente

```bash
# 1) Banco (Postgres em 127.0.0.1:5432)
cd backend && docker compose up -d postgres
cp .env.example .env           # já aponta para o banco acima
go run ./cmd/seed              # dados de demonstração (admin@achadinhos.com / senha123)
go run ./cmd/api               # API em :8080

# 2) Frontend (outro terminal)
cd frontend
echo 'NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1' > .env.local
npm install && npm run dev     # http://localhost:3000
```

Testes do backend: `cd backend && go test -race ./...`
(a suíte de integração sobe um Postgres via testcontainers; sem Docker, aponte
para um Postgres existente com `TEST_DB_HOST`/`TEST_DB_PORT`, usuário e senha
`test`, banco `achadinhos_test`).

## Documentação

- [`docs/HANDOFF.md`](docs/HANDOFF.md) — **comece aqui**: visão geral, arquitetura, mapa do código, funcionalidades, deploy e armadilhas.
- [`docs/SECURITY.md`](docs/SECURITY.md) — modelo de segurança, o que foi endurecido, checklist de produção e pendências.

## Estrutura

```
backend/    API Go (cmd/api, cmd/seed, internal/*, migrations/, tests/)
frontend/   Next.js (src/app, src/components, src/lib)
project/    Protótipos HTML do design original (referência visual, não é código de produção)
docs/       Documentação para quem assume o projeto
Dockerfile  Build multi-stage: frontend → backend (embute o export) → runtime alpine
docker-compose.yml  Stack de produção (Postgres + app atrás do Traefik)
```

## Contribuindo

- Nunca commite `.env`, dumps, chaves ou uploads reais (o `.gitignore` já cobre os casos comuns).
- Vulnerabilidade? Não abra issue pública — veja [`docs/SECURITY.md`](docs/SECURITY.md#reportando-vulnerabilidades).
- O CI (`.github/workflows/ci.yml`) roda `go vet`, testes com `-race`, `govulncheck`, `tsc` e `npm audit`.
