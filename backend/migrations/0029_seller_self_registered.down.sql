DROP INDEX IF EXISTS idx_sellers_owner_user_id;
DROP INDEX IF EXISTS idx_sellers_self_registered;
ALTER TABLE sellers DROP COLUMN IF EXISTS owner_user_id;
ALTER TABLE sellers DROP COLUMN IF EXISTS self_registered;
