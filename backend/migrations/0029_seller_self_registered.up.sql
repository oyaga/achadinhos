-- Empresas free: autocadastro pelo site, com login próprio (role=empresa).
-- Em produção quem cria as colunas é o AutoMigrate (models.Seller); este
-- arquivo mantém o caminho do golang-migrate em dia.
ALTER TABLE sellers ADD COLUMN IF NOT EXISTS self_registered BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE sellers ADD COLUMN IF NOT EXISTS owner_user_id UUID;
CREATE INDEX IF NOT EXISTS idx_sellers_self_registered ON sellers (self_registered);
CREATE UNIQUE INDEX IF NOT EXISTS idx_sellers_owner_user_id ON sellers (owner_user_id);
