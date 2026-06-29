-- 0016: certificados passam a aceitar dois titulares — empresa (seller) OU
-- afiliado/prestador (provider) — e ganham um nível (tier: prata/ouro/black).
-- Também desnormalizamos o tier ativo em sellers/providers para o selo do
-- marketplace.
--
-- Observação: em produção o app aplica o GORM AutoMigrate (adiciona colunas) +
-- a função idempotente EnsureCertificateSchema (torna seller_id nullable e
-- ressincroniza cert_tier). Este arquivo cobre o caminho `make migrate-up`/dev.

ALTER TABLE certificates
    ADD COLUMN IF NOT EXISTS tipo        VARCHAR(16) NOT NULL DEFAULT 'empresa',
    ADD COLUMN IF NOT EXISTS tier        VARCHAR(8)  NOT NULL DEFAULT 'ouro',
    ADD COLUMN IF NOT EXISTS provider_id UUID REFERENCES providers(id) ON DELETE CASCADE;

-- Afiliados não têm seller — seller_id deixa de ser obrigatório.
ALTER TABLE certificates ALTER COLUMN seller_id DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_certificates_provider
    ON certificates(provider_id) WHERE deleted_at IS NULL;

-- Selo desnormalizado no marketplace.
ALTER TABLE sellers   ADD COLUMN IF NOT EXISTS cert_tier VARCHAR(8) NOT NULL DEFAULT '';
ALTER TABLE providers ADD COLUMN IF NOT EXISTS cert_tier VARCHAR(8) NOT NULL DEFAULT '';

-- Backfill do selo a partir do certificado ativo mais recente de cada titular.
-- Certificados antigos já são tipo='empresa'/tier='ouro' (defaults acima).
UPDATE sellers s SET cert_tier = COALESCE((
    SELECT c.tier FROM certificates c
    WHERE c.seller_id = s.id AND c.deleted_at IS NULL
      AND c.revoked = FALSE AND c.valid_until >= CURRENT_DATE
    ORDER BY c.issued_at DESC LIMIT 1
), '');
