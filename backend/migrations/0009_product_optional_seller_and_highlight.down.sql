DROP INDEX IF EXISTS idx_products_highlight;
ALTER TABLE products DROP COLUMN IF EXISTS highlight;
-- Intentionally NOT restoring `seller_id NOT NULL`: rolling back the migration
-- after Achadinhos-owned (sellerless) products exist would fail with
-- "column contains null values". Restoring the constraint is the operator's
-- call once they decide what to do with those orphan rows.
