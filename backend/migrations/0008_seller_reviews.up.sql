ALTER TABLE sellers
    ADD COLUMN IF NOT EXISTS rating        NUMERIC(3,2) NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS reviews_count INT NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS seller_reviews (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id   UUID NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating      INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text        TEXT NOT NULL DEFAULT '',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at  TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_seller_reviews_seller ON seller_reviews(seller_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_seller_reviews_user ON seller_reviews(user_id) WHERE deleted_at IS NULL;
