-- Add seller_id link from users to sellers
ALTER TABLE users ADD COLUMN IF NOT EXISTS seller_id UUID REFERENCES sellers(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_users_seller_id ON users(seller_id) WHERE deleted_at IS NULL;
