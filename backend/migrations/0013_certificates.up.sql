-- Certificados de "Empresa Qualificada": o admin emite um certificado vinculado
-- a uma empresa (seller). O certificado é verificável publicamente pelo código
-- (QR code -> /verificar/?c=CODE). empresa_nome/categoria são snapshots no
-- momento da emissão, então o documento permanece estável mesmo se o cadastro
-- da empresa mudar depois.
CREATE TABLE IF NOT EXISTS certificates (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code             VARCHAR(32)  NOT NULL UNIQUE,
    seller_id        UUID         NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
    empresa_nome     VARCHAR(255) NOT NULL,
    categoria        VARCHAR(120) NOT NULL DEFAULT '',
    responsavel_nome VARCHAR(255) NOT NULL,
    responsavel_cpf  VARCHAR(14)  NOT NULL DEFAULT '',
    signature_url    VARCHAR(500) NOT NULL DEFAULT '',
    issued_at        DATE         NOT NULL,
    valid_until      DATE         NOT NULL,
    revoked          BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    deleted_at       TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_certificates_code   ON certificates(code)      WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_certificates_seller ON certificates(seller_id) WHERE deleted_at IS NULL;
