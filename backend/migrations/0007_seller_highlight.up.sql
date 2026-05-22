ALTER TABLE sellers ADD COLUMN IF NOT EXISTS highlight BOOLEAN NOT NULL DEFAULT false;
CREATE INDEX IF NOT EXISTS idx_sellers_highlight ON sellers(highlight) WHERE deleted_at IS NULL;
