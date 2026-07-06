DROP INDEX IF EXISTS idx_events_highlight;
ALTER TABLE events DROP COLUMN IF EXISTS banner_url;
ALTER TABLE events DROP COLUMN IF EXISTS highlight;
