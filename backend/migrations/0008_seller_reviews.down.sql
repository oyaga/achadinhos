DROP TABLE IF EXISTS seller_reviews;
ALTER TABLE sellers
    DROP COLUMN IF EXISTS rating,
    DROP COLUMN IF EXISTS reviews_count;
