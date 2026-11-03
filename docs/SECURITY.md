# Segurança

Documento para quem opera e para quem contribui. Última revisão: 2026-11-03.

## Reportando vulnerabilidades

Não abra issue pública. Envie os detalhes em privado ao responsável pelo
projeto (use *Security → Report a vulnerability* do GitHub, se habilitado, ou
contato direto). Inclua passos para reproduzir.

## Modelo de ameaças (resumo)

- **Público anônimo**: lê catálogo, cria conta (síndico/empresa), agenda reunião, preenche ficha por token.
- **Usuário logado** (`sindico`, `empresa`): avalia, favorita, edita a própria empresa.
- **Admin**: gerencia todo o conteúdo, uploads, certificados, blog, agenda/Google.
- **Atacantes típicos**: bots de scraping/clonagem, força bruta de login, spam de cadastro/agendamento, upload malicioso, abuso de IDs/tokens.

## O que existe hoje

| Controle | Onde | Detalhe |
|---|---|---|
| Rate limit global | `middleware/antibot.go` | Token bucket por IP (burst 400, 6/s), só em produção. Bloqueia UAs de scrapers/IA de treino. |
| Rate limit estrito | `middleware/ratelimit.go`, `router/router.go` | login 10/min, cadastro 5/min, refresh 30/min, agendar/ficha 10/min, escrita autenticada 60/min — por IP e por rota. |
| IP real do cliente | `router.New` + `TRUSTED_PROXIES` | Só aceita `CF-Connecting-IP`/`X-Forwarded-For` de proxies confiáveis (rede do Traefik). Sem isso o limite seria burlável com cabeçalho forjado. |
| Segredos em produção | `config.Validate` | A API **não sobe** em produção com `JWT_SECRET` < 32 chars/placeholder ou senha de banco padrão. |
| Senhas | `auth/password.go` | bcrypt custo 12; login em tempo constante (sem enumeração de e-mail). |
| Sessões | `auth/service.go` | Access JWT 15 min; refresh opaco rotativo, **guardado como SHA-256**, rotação **atômica** (reuso/corrida → 401). |
| Uploads | `handlers/admin.go: saveUploadedFile` | Tipo detectado pelos **bytes** (não pelo cliente), extensão derivada do tipo (nunca do nome enviado), limite real na escrita (5 MB img / 20 MB PDF / 50 MB vídeo), `O_EXCL`. SVG/HTML rejeitados. |
| Servir uploads | `middleware/security.go` | `nosniff` + CSP `sandbox` + CORP em `/uploads/*`. |
| Cabeçalhos | `middleware/security.go` | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP, HSTS (prod). |
| Limite de corpo | `MaxBodyFor` | 1 MB JSON, 60 MB multipart. |
| Concorrência | `handlers/agenda.go`, `reviews.go` | Agendamento serializado por agenda (sem reserva dupla); "útil" idempotente com `ON CONFLICT`. |
| CORS | `middleware/cors.go` | Lista explícita de origens; vazio em produção (mesma origem). |
| Container | `docker-compose.yml` | Nenhuma porta publicada (só Traefik), `cap_drop: ALL`, `no-new-privileges`, FS somente leitura, usuário não-root. Postgres só na rede interna. |
| Seed | `cmd/seed` | Recusa rodar com `APP_ENV=production` (cria admin demo com senha conhecida). |

## Checklist antes de publicar / ir para produção

- [ ] `JWT_SECRET` = `openssl rand -hex 48`; `POSTGRES_PASSWORD` forte e único.
- [ ] `.env` **fora** do git (já ignorado). Rotacione qualquer segredo que já tenha sido colado em chat/issue.
- [ ] Nenhuma conta demo do seed existe em produção (`admin@achadinhos.com`, `sindico@aurora.com`). Se existir, troque a senha ou apague.
- [ ] `CORS_ORIGINS` vazio (mesma origem) ou só origens próprias.
- [ ] `TRUSTED_PROXIES` cobre **apenas** a rede do Traefik. Cloudflare "Proxied" ligado e `cloudflare-only` ativo no Traefik (o IP de origem do servidor não pode ser acessível direto).
- [ ] Firewall do host: só 80/443 (e SSH restrito). Porta 5432 e 8080 **fechadas** externamente.
- [ ] Backups do volume `achadinhos_pgdata` e `achadinhos_uploads` testados.
- [ ] Segredos do GitHub Actions (`PORTAINER_WEBHOOK`) com acesso mínimo; branch `master` protegida (PR + CI verde).
- [ ] Ative no GitHub: Dependabot alerts, secret scanning + push protection, code scanning.
- [ ] Rode `govulncheck ./...` e `npm audit` (o CI já faz).

## Pendências conhecidas (não resolvidas)

1. **Tokens em `localStorage`** (`frontend/src/lib/api.ts`): qualquer XSS rouba a sessão. Migrar refresh para cookie `HttpOnly; Secure; SameSite=Lax`.
2. **Sem Content-Security-Policy** nas páginas: o export do Next usa scripts inline; é preciso gerar hashes/nonce no build. Até lá, XSS depende de sanitização.
3. **HTML do blog sem sanitização** no servidor (`blog_posts.content_html` → `dangerouslySetInnerHTML`). Só admin escreve, mas um admin comprometido vira XSS para todos. Sanitizar (ex.: `bluemonday`) na gravação.
4. **Rate limit em memória**: zera ao reiniciar e não é compartilhado entre réplicas. Para escalar, mover para Redis ou regras do Cloudflare (WAF/Rate Limiting) — recomendado de qualquer forma para `/api/v1/auth/*`.
5. **Sem bloqueio por conta** após N senhas erradas (só por IP). Considerar lockout progressivo por e-mail.
6. **Sem verificação de e-mail** no cadastro e **sem fluxo de "esqueci a senha"**.
7. **Refresh tokens expirados nunca são apagados**; criar job de limpeza.
8. **`AutoMigrate` roda no boot** além das migrations SQL — risco de divergência de schema; padronizar em migrations.
9. **Imagens do WhatsApp/prints** foram removidas do índice do git (`project/uploads`), mas **continuam no histórico**. Se contêm dados pessoais, reescreva o histórico (`git filter-repo`) antes de tornar o repositório público.
10. **Backend Docker local (`backend/docker-compose.yml`)** usa credenciais fracas por design (somente loopback). Não use fora do dev.
11. Imagem base `latest` + Watchtower faz auto-deploy: sem aprovação manual nem rollback automático. Prefira tags por SHA (já publicadas pelo CI).
