-- Evento em destaque com banner: o admin marca eventos como destaque e sobe
-- uma imagem de banner; o frontend mostra esses eventos no carrossel da home.
ALTER TABLE events ADD COLUMN IF NOT EXISTS highlight BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE events ADD COLUMN IF NOT EXISTS banner_url VARCHAR(1000) NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_events_highlight ON events(highlight) WHERE deleted_at IS NULL;
