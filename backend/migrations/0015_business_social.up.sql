-- 0015: redes sociais para empresas (sellers) e afiliados (providers). Quando
-- preenchidas, aparecem como ícones no perfil público para o síndico acessar.
-- Empresas usam a coluna `link` (já existente) como site; afiliados ganham `site`.
ALTER TABLE sellers
    ADD COLUMN IF NOT EXISTS instagram VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS facebook  VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS tiktok    VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS youtube   VARCHAR(255) NOT NULL DEFAULT '';

ALTER TABLE providers
    ADD COLUMN IF NOT EXISTS instagram VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS facebook  VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS tiktok    VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS youtube   VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN IF NOT EXISTS site      VARCHAR(500) NOT NULL DEFAULT '';
