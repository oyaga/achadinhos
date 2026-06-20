-- Ficha de cadastro de empresas: o admin cria a ficha com nome + e-mail do
-- responsável, o sistema envia um link único (token) e o responsável preenche
-- o restante. status: 'pendente' -> 'concluido'.
CREATE TABLE IF NOT EXISTS fichas_cadastro (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token                   VARCHAR(64) NOT NULL UNIQUE,
    status                  VARCHAR(16) NOT NULL DEFAULT 'pendente',

    -- Informado pelo admin ao criar a ficha
    responsavel_nome        VARCHAR(255) NOT NULL,
    responsavel_email       VARCHAR(255) NOT NULL,

    -- Dados do responsável (preenchidos no formulário público)
    resp_cpf                VARCHAR(32)  NOT NULL DEFAULT '',
    resp_nascimento         VARCHAR(32)  NOT NULL DEFAULT '',
    resp_endereco           VARCHAR(500) NOT NULL DEFAULT '',
    resp_telefone           VARCHAR(32)  NOT NULL DEFAULT '',
    resp_cargo              VARCHAR(255) NOT NULL DEFAULT '',

    -- Dados da empresa
    razao_social            VARCHAR(255) NOT NULL DEFAULT '',
    cnpj                    VARCHAR(32)  NOT NULL DEFAULT '',
    empresa_endereco        VARCHAR(500) NOT NULL DEFAULT '',
    instagram               VARCHAR(255) NOT NULL DEFAULT '',
    facebook                VARCHAR(255) NOT NULL DEFAULT '',
    linkedin                VARCHAR(255) NOT NULL DEFAULT '',
    site                    VARCHAR(255) NOT NULL DEFAULT '',
    contrato_inicio         VARCHAR(32)  NOT NULL DEFAULT '',
    contrato_vigencia_meses VARCHAR(32)  NOT NULL DEFAULT '',
    valor_mensal            VARCHAR(64)  NOT NULL DEFAULT '',
    valor_anual             VARCHAR(64)  NOT NULL DEFAULT '',
    observacoes             TEXT         NOT NULL DEFAULT '',

    submitted_at            TIMESTAMPTZ,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at              TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_fichas_cadastro_token ON fichas_cadastro(token);
CREATE INDEX IF NOT EXISTS idx_fichas_cadastro_status ON fichas_cadastro(status) WHERE deleted_at IS NULL;
