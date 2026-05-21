DROP INDEX IF EXISTS idx_sellers_category_id;

ALTER TABLE sellers DROP COLUMN IF EXISTS category_id;
