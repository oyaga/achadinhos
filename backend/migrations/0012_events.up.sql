-- Eventos do condomínio: o admin cadastra (título, data, hora, local, descrição)
-- e os síndicos acompanham num calendário. Eventos são globais.
CREATE TABLE IF NOT EXISTS events (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(255) NOT NULL,
    description TEXT         NOT NULL DEFAULT '',
    location    VARCHAR(500) NOT NULL DEFAULT '',
    event_date  DATE         NOT NULL,
    event_time  VARCHAR(5)   NOT NULL DEFAULT '', -- "HH:MM"
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at  TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date) WHERE deleted_at IS NULL;
