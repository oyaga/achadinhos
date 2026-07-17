-- Renomeia o nível intermediário de certificação de ouro para blue.
UPDATE certificates SET tier = 'blue' WHERE tier = 'ouro';
UPDATE sellers SET cert_tier = 'blue' WHERE cert_tier = 'ouro';
UPDATE providers SET cert_tier = 'blue' WHERE cert_tier = 'ouro';

ALTER TABLE certificates ALTER COLUMN tier SET DEFAULT 'blue';
