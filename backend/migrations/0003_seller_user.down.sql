DROP INDEX IF EXISTS idx_users_seller_id;
ALTER TABLE users DROP COLUMN IF EXISTS seller_id;
