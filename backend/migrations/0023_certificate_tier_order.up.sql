-- Corrige os níveis para a ordem Blue, Ouro e Black após a migração 0022.
-- O blue da 0022 representa o antigo nível intermediário e volta a ser ouro.
UPDATE certificates SET tier = 'ouro' WHERE tier = 'blue';
UPDATE sellers SET cert_tier = 'ouro' WHERE cert_tier = 'blue';
UPDATE providers SET cert_tier = 'ouro' WHERE cert_tier = 'blue';

-- O antigo nível inicial prata passa a se chamar blue.
UPDATE certificates SET tier = 'blue' WHERE tier = 'prata';
UPDATE sellers SET cert_tier = 'blue' WHERE cert_tier = 'prata';
UPDATE providers SET cert_tier = 'blue' WHERE cert_tier = 'prata';

ALTER TABLE certificates ALTER COLUMN tier SET DEFAULT 'ouro';
