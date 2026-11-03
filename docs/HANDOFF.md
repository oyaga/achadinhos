# Guia para o próximo programador

Leia isto antes de mexer. Dúvida sobre segurança → [`SECURITY.md`](SECURITY.md).

## 1. O que é o produto

**Achadinhos do Condomínio**: vitrine/marketplace para síndicos e moradores
encontrarem e contratarem prestadores de serviço, empresas e produtos
("Shopping do condomínio"). O contato é direto por WhatsApp; a receita vem de
planos/selos de certificação das empresas e de anúncios (banners).

### Perfis de usuário (`models.Role`)
| Role | Como entra | Pode |
|---|---|---|
| (anônimo) | — | navegar, buscar, agendar reunião, preencher ficha por link |
| `sindico` | `/cadastro/sindico` (também morador/conselho/administradora via `condo_role`) | avaliar, favoritar, editar perfil |
| `empresa` | `/cadastro` (autocadastro "free", sem selo) | editar a própria empresa, logo e portfólio |
| `admin` | criado manualmente no banco / seed (dev) | tudo em `/admin` |

### Funcionalidades
- **Catálogo**: categorias, prestadores (`providers`), empresas/lojas (`sellers`), produtos, avaliações, favoritos, destaques.
- **Certificação**: certificados com código verificável por QR (`/verificar`, `/certificacao`), níveis `blue`/`ouro`/`black`, assinatura desenhada (PNG), PDF gerado no navegador (`@react-pdf/renderer`).
- **Fichas de cadastro**: admin gera link com token → responsável preenche (`/ficha/?token=`), e-mail via Resend.
- **Eventos / Banners / Blog** (post em HTML ou apresentação em PDF) geridos no admin.
- **Agenda estilo Calendly** (`/agendar/<slug>`, subdomínio `ligia.<domínio>`): Google Calendar + Meet via OAuth.
- **PWA**: instalável, service worker (`src/app/sw.ts`), banner de instalação.
- **Anti-clonagem**: bloqueio de UAs de scrapers/IA de treino e rate limit (ver SECURITY.md). `public/llms.txt` descreve o site para assistentes de IA.

## 2. Arquitetura

```
Cloudflare ─► Traefik (TLS, cloudflare-only, security-headers) ─► container "app" (:8080)
                                                                    ├─ /api/v1/*   API Gin
                                                                    ├─ /uploads/*  arquivos enviados (volume)
                                                                    └─ /*          frontend estático embutido (go:embed)
                                              Postgres 18 (rede interna, sem porta publicada)
```

- **Uma única imagem**: o `Dockerfile` builda o Next (`bun run build` → `out/`), copia para `backend/internal/static/web` e compila o Go com `embed`. Em dev, front (`:3000`) e API (`:8080`) rodam separados.
- O frontend é **100% estático** (`output: "export"`, `trailingSlash`). Não há SSR: nada de cookies/headers server-side, `middleware.ts` ou rotas de API do Next.
- Páginas dinâmicas pós-build (empresas/posts criados depois) usam as "cascas" `empresa/_unavailable` e `blog/_unavailable`, servidas pelo fallback em `internal/static/static.go`, que leem o id/slug da URL e buscam na API.

### Backend (`backend/`)
```
cmd/api        entrypoint (config → db → AutoMigrate/Ensure* → router → http.Server c/ graceful shutdown)
cmd/seed       dados demo (recusa rodar em produção)
internal/
  config/      env vars + validação de segredos
  router/      TODAS as rotas e middlewares (comece por aqui)
  middleware/  auth (JWT/role), antibot, ratelimit, security headers, cors, logger, recover
  handlers/    um arquivo por domínio (admin.go é grande: CRUD + uploads)
  auth/        registro, login, refresh, JWT, bcrypt, validação CPF/CNPJ, CEP
  models/ dto/ GORM models e payloads
  db/          conexão, AutoMigrate, categorias canônicas, rotinas Ensure* idempotentes
  agenda/      slots + integração Google Calendar/OAuth
  email/       Resend (no-op se sem chave)
  static/      servidor do frontend embutido + cache headers
migrations/    SQL versionado (0001…0030)
tests/         integração (testcontainers) — ver "Testes"
```
Convenções: erros via `handlers.JSONError`; validação com tags `binding` + `BindJSON`; IDs UUID; soft delete em `users`; logs JSON (`slog`).

### Frontend (`frontend/src/`)
- `app/` rotas (App Router). Telas grandes ficam em `*-screen.tsx` com um `page.tsx` fino (metadados/SEO).
- `lib/api.ts` — **cliente único da API** (tipos, refresh automático em 401, `adminApi`, `myCompanyApi`…). `lib/adapters.ts` converte resposta → modelos de UI.
- `contexts/auth-context.tsx` — sessão. `components/` por área (home, shop, screens, admin, certificate…).
- `sitemap.ts` e `generateStaticParams` buscam o catálogo **na API de produção durante o build** (ver armadilhas).
- **Atenção**: `frontend/AGENTS.md` avisa que o Next é uma versão com mudanças incompatíveis — leia `node_modules/next/dist/docs/` antes de usar APIs que você "já conhece".

## 3. Configuração (variáveis de ambiente)

Fonte da verdade: `.env.example` (raiz, produção) e `backend/.env.example` (dev).

| Variável | Obrigatória em prod | Função |
|---|---|---|
| `POSTGRES_*` / `DB_*` | sim | banco |
| `JWT_SECRET` | **sim, ≥32 chars** | assina JWT e o `state` do OAuth. A API não sobe sem |
| `APP_BASE_URL` | sim | links em e-mails e redirect OAuth |
| `CORS_ORIGINS` | não | vazio = mesma origem |
| `TRUSTED_PROXIES` | sim (atrás de proxy) | CIDRs do Traefik; define o IP do cliente |
| `RESEND_API_KEY`, `MAIL_FROM` | não | e-mails; vazio desliga |
| `GOOGLE_OAUTH_CLIENT_ID/SECRET` | não | agenda; redirect `{APP_BASE_URL}/api/v1/agenda/google/callback` |
| `ANTIBOT_BYPASS_TOKEN` | não | header `X-Antibot-Bypass` pula antibot (nosso headless) |
| `NEXT_PUBLIC_API_URL` | build | URL da API embutida no bundle |

## 4. Deploy

1. Push/merge na `master` → `.github/workflows/deploy.yml` builda e publica `ghcr.io/oyaga/achadinhos:latest` e `:<sha>`.
2. Redeploy: webhook do Portainer (best-effort, nem sempre dispara) **ou** rodar `/root/achadinhos-redeploy.sh` no servidor. O Watchtower também vigia `:latest`.
3. Servidor: `docker-compose.yml` da raiz + `.env` (fora do git). Requer a rede externa `traefik-public` e os middlewares `cloudflare-only@file`/`security-headers@file` do Traefik (stack de infra separada).
4. **Rollback**: troque a imagem do compose para `ghcr.io/oyaga/achadinhos:<sha-anterior>` e suba de novo.
5. Migrations: o app roda `AutoMigrate` + rotinas `Ensure*` no boot. Os `.sql` em `migrations/` existem para ambientes controlados — mantenha ambos coerentes ao alterar models.

## 5. Testes e qualidade
```bash
cd backend && go vet ./... && go test -race ./...
# sem Docker: TEST_DB_HOST=127.0.0.1 TEST_DB_PORT=5432 (user/senha "test", banco achadinhos_test)
cd frontend && npx tsc --noEmit
```
Cobertura é razoável em auth/admin/providers/reviews/favorites/banners; **não há testes** de agenda via HTTP, fichas, certificados, blog, eventos nem de frontend. CI em `.github/workflows/ci.yml`.

## 6. Armadilhas (leia!)

1. **Build do frontend depende da API de produção** (`generateStaticParams`/sitemap). Se a API estiver fora ou o antibot bloquear, o export sai sem páginas de empresa — o `Dockerfile` falha de propósito (`grep /empresa/ sitemap.xml`). O rate limit global foi dimensionado para o build do CI (burst 400): não reduza sem testar.
2. **Antibot bloqueia `curl`, `python-requests`, headless etc.** em produção (exceto `/health`). Para inspecionar, use `X-Antibot-Bypass`.
3. **IP do cliente**: se mudar a topologia de rede (novo proxy/CDN), ajuste `TRUSTED_PROXIES`; senão o rate limit passa a enxergar o IP do proxy (todos viram um só) ou fica burlável.
4. **Uploads vivem no volume** `achadinhos_uploads`, não no banco nem na imagem. Backup separado. Servidos sob `/uploads/` com CSP sandbox.
5. **Cache do service worker/Cloudflare**: `sw.js` precisa de `no-store` (já tratado em `static.go`); mudou asset e o usuário não vê? Suspeite do SW.
6. **Seed**: cria `admin@achadinhos.com`/`senha123` — só dev. Admin de produção é criado direto no banco (INSERT com hash bcrypt custo 12 gerado por `auth.HashPassword`).
7. **Tokens do refresh agora são guardados com hash**: sessões anteriores a esta mudança foram invalidadas (usuários logam de novo uma vez).
8. **`project/`** é o protótipo HTML do design (Claude Design); serve de referência visual, não entra na imagem (`.dockerignore`).
9. Categorias canônicas ficam em `internal/db` (`CanonicalCategories`) e são upsertadas a cada boot; editar categoria só no banco será sobrescrito.
10. Domínio e URL de produção estão hard-coded em `Dockerfile` (`NEXT_PUBLIC_API_URL`), `docker-compose.yml` (labels Traefik, `APP_BASE_URL`) e `frontend/public/llms.txt`. Troca de domínio = revisar os três.

## 7. Backlog sugerido (ordem de valor)
1. Itens 1–3 de "Pendências" em `SECURITY.md` (cookie HttpOnly, CSP, sanitizar blog).
2. Recuperação de senha + verificação de e-mail.
3. Padronizar migrations (remover dependência de `AutoMigrate` em produção).
4. Testes para agenda/fichas/certificados e e2e do fluxo de cadastro.
5. Rate limit no edge (Cloudflare) e métricas/alertas (hoje só logs JSON).
