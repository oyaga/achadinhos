-- Agendamento de exibição dos slides/anúncios do Mural: fora do período
-- [starts_at, ends_at] o banner não sai na listagem pública.
ALTER TABLE banners ADD COLUMN IF NOT EXISTS starts_at DATE;
ALTER TABLE banners ADD COLUMN IF NOT EXISTS ends_at DATE;
