# Achadinhos do Condomínio — Backend (Go)

API HTTP em Go para o marketplace **Achadinhos do Condomínio** (síndicos × prestadores × shopping de produtos para condomínios).

## Stack

- Go 1.23+ (compatível com 1.25)
- Gin (HTTP)
- GORM v2 + PostgreSQL 18
- golang-migrate (migrations SQL versionadas)
- JWT (HS256) + bcrypt
- godotenv, validator/v10, log/slog

## Pré-requisitos

- Go 1.23 ou mais novo
- Docker + Docker Compose
- (opcional) [`golang-migrate` CLI](https://github.com/golang-migrate/migrate/tree/master/cmd/migrate) — só pra rodar `make migrate-up`. O server faz auto-migrate como fallback.

## Setup

```bash
cp .env.example .env
make docker-up        # sobe Postgres 18 (porta 5432)
make migrate-up       # aplica schema (ou pula — auto-migrate cobre)
make seed             # popula com mock data
make run              # API em http://localhost:8080
```

Confirma com:

```bash
curl http://localhost:8080/api/v1/categories | jq
```

As env vars estão documentadas em [.env.example](.env.example). Destaques:

- `APP_BASE_URL` — URL pública do app; monta links de e-mail e o redirect OAuth.
- `RESEND_API_KEY` / `MAIL_FROM` — e-mail transacional (vazio = no-op).
- `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET` — feature de
  agendamento (Google Calendar + Meet). Redirect URI a cadastrar no console do
  Google: `{APP_BASE_URL}/api/v1/agenda/google/callback`. Vazio = endpoints da
  agenda respondem `google_not_configured`.

## Endpoints

Prefix: `/api/v1`

| Método  | Rota                                | Auth         | Descrição                                              |
| ------- | ----------------------------------- | ------------ | ------------------------------------------------------ |
| POST    | `/auth/register`                    | público      | cria conta `{ email, password, name, role }`           |
| POST    | `/auth/login`                       | público      | autentica e retorna pair de tokens                     |
| POST    | `/auth/refresh`                     | público      | rotaciona refresh token                                |
| GET     | `/me`                               | sim          | usuário atual                                          |
| PATCH   | `/me`                               | sim          | atualiza name/phone/avatar/condo                       |
| GET     | `/categories`                       | público      | lista categorias com `count` agregado                  |
| GET     | `/categories/:id`                   | público      | detalhe da categoria                                   |
| GET     | `/providers`                        | público      | lista filtrável (category, verified, badge, sort, q)   |
| GET     | `/providers/:id`                    | público      | detalhe do provider                                    |
| GET     | `/providers/:id/reviews`            | público      | reviews do provider, ordenados por helpful             |
| POST    | `/providers`                        | role=prest.  | cadastro do prestador (5 passos do wizard)             |
| POST    | `/providers/:id/reviews`            | sim          | cria review (1 por user/provider)                      |
| DELETE  | `/reviews/:id`                      | dono/admin   | remove review                                          |
| POST    | `/reviews/:id/helpful`              | sim          | marca como útil (idempotente)                          |
| GET     | `/favorites?type=provider\|product` | sim          | favoritos do user                                      |
| POST    | `/favorites`                        | sim          | adiciona favorito (`{ target_type, target_id }`)       |
| DELETE  | `/favorites`                        | sim          | remove favorito                                        |
| GET     | `/products`                         | público      | lista produtos (category, q, sort)                     |
| GET     | `/products/:id`                     | público      | produto + 4 relacionados                               |
| GET     | `/sellers/:id`                      | público      | seller + produtos                                      |
| GET     | `/agenda/:slug`                     | público      | info da página de agendamento (Calendly-like)          |
| GET     | `/agenda/:slug/slots`               | público      | horários livres (`?from=YYYY-MM-DD&to=YYYY-MM-DD`)     |
| POST    | `/agenda/:slug/book`                | público      | agenda: cria evento no Google Calendar + link do Meet  |
| GET     | `/agenda/google/callback`           | público      | callback OAuth do Google (redirect p/ /admin)          |
| GET/PUT | `/admin/agenda`                     | role=admin   | lê/atualiza settings da agenda                         |
| GET     | `/admin/agenda/google/url`          | role=admin   | URL de consentimento OAuth                             |
| DELETE  | `/admin/agenda/google`              | role=admin   | desconecta a conta Google                              |
| GET     | `/health`                           | público      | healthcheck                                            |

## Auth flow (curl)

```bash
# register
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"a@a.com","password":"senha123","name":"Ana","role":"sindico"}'

# login
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"a@a.com","password":"senha123"}'

# me
curl http://localhost:8080/api/v1/me \
  -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

Access token: HS256, 15 min. Refresh: opaco (hex), 30 dias, rotacionado a cada `/auth/refresh`.

## Estrutura

```
backend/
├── cmd/api/         entrypoint do servidor
├── cmd/seed/        CLI de seed
├── internal/
│   ├── config/      env vars
│   ├── db/          GORM + migrate runner
│   ├── models/      GORM models
│   ├── auth/        bcrypt + JWT + service
│   ├── handlers/    HTTP handlers
│   ├── middleware/  auth, cors, logger, recover
│   ├── dto/         request/response DTOs
│   └── router/      gin engine
├── migrations/      SQL up/down (golang-migrate)
├── tests/           integração (testcontainers postgres)
├── docker-compose.yml
├── Dockerfile       multi-stage
└── Makefile
```

## Testes

Os testes usam **testcontainers-go** subindo um Postgres 18 ephemeral por suite. Primeira execução baixa a imagem (~80 MB).

```bash
make test
```

## Dev tips

- Usuário síndico de exemplo seedado: `sindico@aurora.com` / `senha123`.
- IDs de categorias e produtos são slugs humanos (ex.: `manutencao`, `p1`) pra bater com o frontend. Provider/User/Review usam UUIDs.
- Logs em JSON estruturado via `log/slog`.
- A API faz auto-migrate ao iniciar (idempotente). Em produção, prefira `make migrate-up` versionado.
