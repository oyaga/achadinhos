ALTER TABLE sellers
    DROP COLUMN IF EXISTS contrato_inicio,
    DROP COLUMN IF EXISTS contrato_vigencia_meses,
    DROP COLUMN IF EXISTS valor_mensal,
    DROP COLUMN IF EXISTS valor_anual;
