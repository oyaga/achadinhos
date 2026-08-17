-- TikTok entra no conjunto padrão de redes sociais da ficha de cadastro.
ALTER TABLE fichas_cadastro
    ADD COLUMN IF NOT EXISTS tiktok VARCHAR(255) NOT NULL DEFAULT '';
