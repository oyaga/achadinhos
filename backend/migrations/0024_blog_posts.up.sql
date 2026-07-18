CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt VARCHAR(600) NOT NULL DEFAULT '',
  format VARCHAR(20) NOT NULL DEFAULT 'traditional',
  content_html TEXT NOT NULL DEFAULT '',
  cover_url VARCHAR(1000) NOT NULL DEFAULT '',
  pdf_url VARCHAR(1000) NOT NULL DEFAULT '',
  published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_deleted_at ON blog_posts(deleted_at);
