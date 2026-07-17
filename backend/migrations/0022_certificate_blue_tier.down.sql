-- Restaura o identificador anterior do nível intermediário.
UPDATE certificates SET tier = 'ouro' WHERE tier = 'blue';
UPDATE sellers SET cert_tier = 'ouro' WHERE cert_tier = 'blue';
UPDATE providers SET cert_tier = 'ouro' WHERE cert_tier = 'blue';

ALTER TABLE certificates ALTER COLUMN tier SET DEFAULT 'ouro';
