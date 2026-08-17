-- Dados internos do contrato da empresa (mesmos campos da ficha de cadastro).
-- São de uso administrativo e NUNCA aparecem nas rotas públicas (json:"-").
ALTER TABLE sellers
    ADD COLUMN IF NOT EXISTS contrato_inicio         VARCHAR(32) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS contrato_vigencia_meses VARCHAR(32) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS valor_mensal            VARCHAR(32) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS valor_anual             VARCHAR(32) NOT NULL DEFAULT '';
