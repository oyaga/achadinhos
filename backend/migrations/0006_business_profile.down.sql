DROP TABLE IF EXISTS portfolio_photos;

ALTER TABLE providers
    DROP COLUMN IF EXISTS logo_url,
    DROP COLUMN IF EXISTS document_type,
    DROP COLUMN IF EXISTS document;

ALTER TABLE sellers
    DROP COLUMN IF EXISTS logo_url,
    DROP COLUMN IF EXISTS document_type,
    DROP COLUMN IF EXISTS document;
