ALTER TABLE providers DROP COLUMN IF EXISTS cert_tier;
ALTER TABLE sellers   DROP COLUMN IF EXISTS cert_tier;

DROP INDEX IF EXISTS idx_certificates_provider;

ALTER TABLE certificates
    DROP COLUMN IF EXISTS provider_id,
    DROP COLUMN IF EXISTS tier,
    DROP COLUMN IF EXISTS tipo;

-- Não restauramos NOT NULL em seller_id: pode haver certificados de afiliado
-- (seller_id nulo) que violariam a constraint.
