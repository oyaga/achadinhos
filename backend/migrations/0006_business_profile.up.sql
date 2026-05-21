ALTER TABLE sellers
    ADD COLUMN IF NOT EXISTS logo_url      VARCHAR(500) DEFAULT '',
    ADD COLUMN IF NOT EXISTS document_type VARCHAR(4) DEFAULT '',
    ADD COLUMN IF NOT EXISTS document      VARCHAR(18) DEFAULT '';

ALTER TABLE providers
    ADD COLUMN IF NOT EXISTS logo_url      VARCHAR(500) DEFAULT '',
    ADD COLUMN IF NOT EXISTS document_type VARCHAR(4) DEFAULT '',
    ADD COLUMN IF NOT EXISTS document      VARCHAR(18) DEFAULT '';

CREATE TABLE IF NOT EXISTS portfolio_photos (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id    UUID NOT NULL,
    owner_type  VARCHAR(16) NOT NULL,
    url         TEXT NOT NULL,
    position    INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at  TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_portfolio_photos_owner
    ON portfolio_photos(owner_type, owner_id) WHERE deleted_at IS NULL;
