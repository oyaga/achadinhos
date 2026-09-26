-- Categorias duplicadas: cada uma é absorvida pela categoria original.
-- Em produção quem aplica é EnsureCategories (mergedCategories); este arquivo
-- mantém o caminho do golang-migrate em dia.
UPDATE categories SET label = 'Armários inteligentes', short = E'Armários\ninteligentes' WHERE id = 'armarios';
UPDATE categories SET label = 'Dedetização', short = E'Dedeti-\nzação' WHERE id = 'dedetizacao';
UPDATE categories SET label = 'Treinamento de brigada de incêndio' WHERE id = 'treinamento-brigada';
UPDATE categories SET description = 'Diaristas, faxina geral, pós-obra e limpeza profissional' WHERE id = 'limpeza';

CREATE TEMP TABLE category_merge (dup TEXT PRIMARY KEY, keep TEXT NOT NULL);
INSERT INTO category_merge VALUES
  ('armarios-inteligentes', 'armarios'),
  ('facilities-terceirizada', 'facilities'),
  ('manutencao-geral', 'manutencao'),
  ('dedetizacao-extra', 'dedetizacao'),
  ('treinamentos-brigada', 'treinamento-brigada'),
  ('limpeza-profissional', 'limpeza');

UPDATE sellers s   SET category_id = m.keep FROM category_merge m WHERE s.category_id = m.dup;
UPDATE providers p SET category_id = m.keep FROM category_merge m WHERE p.category_id = m.dup;
INSERT INTO seller_categories (seller_id, category_id)
  SELECT sc.seller_id, m.keep FROM seller_categories sc JOIN category_merge m ON sc.category_id = m.dup
  ON CONFLICT DO NOTHING;
DELETE FROM seller_categories WHERE category_id IN (SELECT dup FROM category_merge);
DELETE FROM categories WHERE id IN (SELECT dup FROM category_merge);
DROP TABLE category_merge;
