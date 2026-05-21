ALTER TABLE sellers
    ADD COLUMN IF NOT EXISTS category_id VARCHAR(64) DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_sellers_category_id ON sellers(category_id);
