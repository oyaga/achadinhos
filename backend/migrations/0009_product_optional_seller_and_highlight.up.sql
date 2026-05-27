ALTER TABLE products ALTER COLUMN seller_id DROP NOT NULL;
ALTER TABLE products ADD COLUMN IF NOT EXISTS highlight BOOLEAN NOT NULL DEFAULT false;
CREATE INDEX IF NOT EXISTS idx_products_highlight ON products(highlight) WHERE deleted_at IS NULL;
