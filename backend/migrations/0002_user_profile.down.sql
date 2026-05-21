-- Revert 0002_user_profile.

DROP INDEX IF EXISTS uq_users_document_alive;
DROP INDEX IF EXISTS uq_users_cpf_alive;

ALTER TABLE users
    DROP COLUMN IF EXISTS state,
    DROP COLUMN IF EXISTS city,
    DROP COLUMN IF EXISTS neighborhood,
    DROP COLUMN IF EXISTS complement,
    DROP COLUMN IF EXISTS number,
    DROP COLUMN IF EXISTS street,
    DROP COLUMN IF EXISTS cep,
    DROP COLUMN IF EXISTS company_name,
    DROP COLUMN IF EXISTS condo_role,
    DROP COLUMN IF EXISTS condo_name,
    DROP COLUMN IF EXISTS whatsapp,
    DROP COLUMN IF EXISTS document,
    DROP COLUMN IF EXISTS document_type,
    DROP COLUMN IF EXISTS cpf;
