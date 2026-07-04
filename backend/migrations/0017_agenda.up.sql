-- Agendamento (booking estilo Calendly): a admin conecta a conta Google dela
-- uma vez e visitantes agendam horários livres; o backend cria o evento no
-- Google Calendar com o convidado + link do Meet.

-- Configuração de uma agenda pública (registro por slug; hoje só "ligia").
CREATE TABLE IF NOT EXISTS agenda_settings (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug          VARCHAR(64)  NOT NULL UNIQUE,
    display_name  VARCHAR(255) NOT NULL,
    title         VARCHAR(255) NOT NULL DEFAULT '',
    duration_min  INTEGER      NOT NULL DEFAULT 60,
    buffer_min    INTEGER      NOT NULL DEFAULT 15,
    timezone      VARCHAR(64)  NOT NULL DEFAULT 'America/Sao_Paulo',
    -- Janelas de atendimento por dia da semana (0=domingo .. 6=sábado):
    -- {"1":[{"start":"09:00","end":"18:00"}], ...}. Lista vazia/ausente = dia
    -- indisponível.
    work_hours    JSONB        NOT NULL DEFAULT '{}',
    active        BOOLEAN      NOT NULL DEFAULT TRUE,
    lead_time_min INTEGER      NOT NULL DEFAULT 120,
    horizon_days  INTEGER      NOT NULL DEFAULT 30,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Tokens OAuth do Google. owner identifica o dono lógico (ex.: "agenda:ligia").
CREATE TABLE IF NOT EXISTS google_oauth_tokens (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner         VARCHAR(128) NOT NULL UNIQUE,
    refresh_token TEXT         NOT NULL,
    access_token  TEXT         NOT NULL DEFAULT '',
    expiry        TIMESTAMPTZ,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Seed: agenda da Ligia, seg-sex 09:00-18:00.
INSERT INTO agenda_settings (slug, display_name, title, duration_min, buffer_min, timezone, work_hours, active, lead_time_min, horizon_days)
VALUES (
    'ligia',
    'Ligia Claudia',
    'Consultoria condominial',
    60,
    15,
    'America/Sao_Paulo',
    '{"0":[],"1":[{"start":"09:00","end":"18:00"}],"2":[{"start":"09:00","end":"18:00"}],"3":[{"start":"09:00","end":"18:00"}],"4":[{"start":"09:00","end":"18:00"}],"5":[{"start":"09:00","end":"18:00"}],"6":[]}'::jsonb,
    TRUE,
    120,
    30
)
ON CONFLICT (slug) DO NOTHING;
