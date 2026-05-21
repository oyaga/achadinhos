-- Initial schema for Achadinhos do Condomínio.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ====== users ======
CREATE TABLE IF NOT EXISTS users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name          VARCHAR(255) NOT NULL,
    role          VARCHAR(32)  NOT NULL,
    condo_id      UUID,
    provider_id   UUID,
    avatar_url    VARCHAR(500) DEFAULT '',
    phone         VARCHAR(32)  DEFAULT '',
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW(),
    deleted_at    TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_condo ON users(condo_id);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider_id);
CREATE INDEX IF NOT EXISTS idx_users_deleted ON users(deleted_at);

-- ====== condominios ======
CREATE TABLE IF NOT EXISTS condominios (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,
    address     VARCHAR(500) DEFAULT '',
    city        VARCHAR(128) DEFAULT '',
    state       VARCHAR(32)  DEFAULT '',
    sindico_id  UUID,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW(),
    deleted_at  TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_condominios_sindico ON condominios(sindico_id);
CREATE INDEX IF NOT EXISTS idx_condominios_deleted ON condominios(deleted_at);

-- ====== categories (slug PK) ======
CREATE TABLE IF NOT EXISTS categories (
    id          VARCHAR(64) PRIMARY KEY,
    label       VARCHAR(128) NOT NULL,
    short       VARCHAR(64) DEFAULT '',
    icon        VARCHAR(64) DEFAULT '',
    badge       VARCHAR(16) DEFAULT '',
    description TEXT DEFAULT '',
    sort_order  INTEGER DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ====== providers ======
CREATE TABLE IF NOT EXISTS providers (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name                 VARCHAR(255) NOT NULL,
    category_id          VARCHAR(64) NOT NULL REFERENCES categories(id),
    avatar               VARCHAR(8) DEFAULT '',
    rating               NUMERIC(3,2) DEFAULT 0,
    reviews_count        INTEGER DEFAULT 0,
    badge                VARCHAR(16) DEFAULT '',
    verified             BOOLEAN DEFAULT FALSE,
    distance_label       VARCHAR(64) DEFAULT '',
    price_label          VARCHAR(64) DEFAULT '',
    response_time_label  VARCHAR(64) DEFAULT '',
    description          TEXT DEFAULT '',
    services             JSONB DEFAULT '[]',
    years_active         INTEGER DEFAULT 0,
    jobs_done            INTEGER DEFAULT 0,
    whatsapp             VARCHAR(32) DEFAULT '',
    highlight            BOOLEAN DEFAULT FALSE,
    owner_user_id        UUID,
    coverage             VARCHAR(16) DEFAULT 'cidade',
    radius_km            INTEGER DEFAULT 10,
    created_at           TIMESTAMPTZ DEFAULT NOW(),
    updated_at           TIMESTAMPTZ DEFAULT NOW(),
    deleted_at           TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_providers_name ON providers(name);
CREATE INDEX IF NOT EXISTS idx_providers_category ON providers(category_id);
CREATE INDEX IF NOT EXISTS idx_providers_verified ON providers(verified);
CREATE INDEX IF NOT EXISTS idx_providers_highlight ON providers(highlight);
CREATE INDEX IF NOT EXISTS idx_providers_owner ON providers(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_providers_deleted ON providers(deleted_at);

-- FKs from users.
ALTER TABLE users
    ADD CONSTRAINT fk_users_condo FOREIGN KEY (condo_id) REFERENCES condominios(id) ON DELETE SET NULL;
ALTER TABLE users
    ADD CONSTRAINT fk_users_provider FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE SET NULL;
ALTER TABLE condominios
    ADD CONSTRAINT fk_condo_sindico FOREIGN KEY (sindico_id) REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE providers
    ADD CONSTRAINT fk_providers_owner FOREIGN KEY (owner_user_id) REFERENCES users(id) ON DELETE SET NULL;

-- ====== reviews ======
CREATE TABLE IF NOT EXISTS reviews (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id   UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
    user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating        INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    text          TEXT DEFAULT '',
    helpful_count INTEGER DEFAULT 0,
    tags          JSONB DEFAULT '[]',
    verified      BOOLEAN DEFAULT FALSE,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW(),
    deleted_at    TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_reviews_provider ON reviews(provider_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_deleted ON reviews(deleted_at);
CREATE UNIQUE INDEX IF NOT EXISTS uq_reviews_provider_user_alive
    ON reviews(provider_id, user_id) WHERE deleted_at IS NULL;

-- ====== review_helpfuls ======
CREATE TABLE IF NOT EXISTS review_helpfuls (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id  UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (review_id, user_id)
);

-- ====== favorites ======
CREATE TABLE IF NOT EXISTS favorites (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_type VARCHAR(16) NOT NULL,
    target_id   VARCHAR(64) NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, target_type, target_id)
);

-- ====== sellers ======
CREATE TABLE IF NOT EXISTS sellers (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL UNIQUE,
    avatar      VARCHAR(8) DEFAULT '',
    description TEXT DEFAULT '',
    whatsapp    VARCHAR(32) DEFAULT '',
    link        VARCHAR(500) DEFAULT '',
    partner     BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW(),
    deleted_at  TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_sellers_deleted ON sellers(deleted_at);

-- ====== products ======
CREATE TABLE IF NOT EXISTS products (
    id                 VARCHAR(64) PRIMARY KEY,
    seller_id          UUID NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
    name               VARCHAR(255) NOT NULL,
    category           VARCHAR(32) NOT NULL,
    price              NUMERIC(10,2) NOT NULL,
    old_price          NUMERIC(10,2),
    rating             NUMERIC(3,2) DEFAULT 0,
    reviews_count      INTEGER DEFAULT 0,
    tag                VARCHAR(64) DEFAULT '',
    badge              VARCHAR(16) DEFAULT '',
    stock              VARCHAR(64) DEFAULT '',
    whatsapp_override  VARCHAR(32) DEFAULT '',
    link_override      VARCHAR(500) DEFAULT '',
    created_at         TIMESTAMPTZ DEFAULT NOW(),
    updated_at         TIMESTAMPTZ DEFAULT NOW(),
    deleted_at         TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_deleted ON products(deleted_at);

-- ====== refresh_tokens ======
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token      VARCHAR(128) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_refresh_user ON refresh_tokens(user_id);
