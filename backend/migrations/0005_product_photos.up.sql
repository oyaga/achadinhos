CREATE TABLE IF NOT EXISTS product_photos (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id  VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url         TEXT NOT NULL,
    position    INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at  TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_product_photos_product_id ON product_photos(product_id) WHERE deleted_at IS NULL;
ALTER TABLE products DROP COLUMN IF EXISTS photo_url;
