-- 0002_user_profile: extend users with profile fields used by the
-- specific registration endpoints (sindico/morador and prestador).
-- All fields are NULL-safe so existing rows remain valid.

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS cpf            VARCHAR(14),
    ADD COLUMN IF NOT EXISTS document_type  VARCHAR(4),
    ADD COLUMN IF NOT EXISTS document       VARCHAR(18),
    ADD COLUMN IF NOT EXISTS whatsapp       VARCHAR(20),
    ADD COLUMN IF NOT EXISTS condo_name     VARCHAR(120),
    ADD COLUMN IF NOT EXISTS condo_role     VARCHAR(16),
    ADD COLUMN IF NOT EXISTS company_name   VARCHAR(160),
    ADD COLUMN IF NOT EXISTS cep            VARCHAR(9),
    ADD COLUMN IF NOT EXISTS street         VARCHAR(160),
    ADD COLUMN IF NOT EXISTS number         VARCHAR(20),
    ADD COLUMN IF NOT EXISTS complement     VARCHAR(80),
    ADD COLUMN IF NOT EXISTS neighborhood   VARCHAR(80),
    ADD COLUMN IF NOT EXISTS city           VARCHAR(80),
    ADD COLUMN IF NOT EXISTS state          VARCHAR(2);

-- Helpful indexes for unique-like lookups. We treat '' the same as NULL because
-- GORM serializes Go's zero-value strings as empty strings, not NULL.
CREATE UNIQUE INDEX IF NOT EXISTS uq_users_cpf_alive
    ON users(cpf) WHERE cpf IS NOT NULL AND cpf <> '' AND deleted_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_users_document_alive
    ON users(document) WHERE document IS NOT NULL AND document <> '' AND deleted_at IS NULL;
