-- Anúncios/slides gerenciados pelo admin: aparecem no slide principal da home
-- (placement "hero") ou no widget de eventos/calendário (placement "eventos").
CREATE TABLE IF NOT EXISTS banners (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT '',
    subtitle VARCHAR(500) NOT NULL DEFAULT '',
    link_url VARCHAR(1000) NOT NULL DEFAULT '',
    image_url VARCHAR(1000) NOT NULL DEFAULT '',
    placement VARCHAR(20) NOT NULL DEFAULT 'hero',
    position INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_banners_placement ON banners(placement) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_banners_active ON banners(active) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_banners_deleted_at ON banners(deleted_at);
