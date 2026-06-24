-- 0014: tipo de conta no cadastro de síndico — "pessoa" (física, CPF) ou
-- "empresa" (administradora de condomínios, CNPJ + razão social). A coluna
-- company_name (razão social) já foi criada na 0002; aqui só introduzimos o
-- discriminador account_type. Contas existentes viram "pessoa".
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS account_type VARCHAR(8) NOT NULL DEFAULT 'pessoa';

UPDATE users SET account_type = 'pessoa'
    WHERE account_type IS NULL OR account_type = '';
