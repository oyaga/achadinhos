-- Restaura o estado produzido pela migração 0022.
UPDATE certificates SET tier = 'prata' WHERE tier = 'blue';
UPDATE sellers SET cert_tier = 'prata' WHERE cert_tier = 'blue';
UPDATE providers SET cert_tier = 'prata' WHERE cert_tier = 'blue';

UPDATE certificates SET tier = 'blue' WHERE tier = 'ouro';
UPDATE sellers SET cert_tier = 'blue' WHERE cert_tier = 'ouro';
UPDATE providers SET cert_tier = 'blue' WHERE cert_tier = 'ouro';

ALTER TABLE certificates ALTER COLUMN tier SET DEFAULT 'blue';
