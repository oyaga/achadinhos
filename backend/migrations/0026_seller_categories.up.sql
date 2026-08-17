-- Uma empresa pode atuar em mais de uma categoria. A tabela de junção guarda
-- TODAS as categorias (inclusive a principal, que segue em sellers.category_id
-- por compatibilidade com listagens/filtros existentes).
CREATE TABLE IF NOT EXISTS seller_categories (
    seller_id   UUID        NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
    category_id VARCHAR(64) NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (seller_id, category_id)
);

-- Backfill: a categoria principal de cada empresa vira a primeira linha.
INSERT INTO seller_categories (seller_id, category_id)
SELECT s.id, s.category_id
FROM sellers s
WHERE s.category_id <> ''
  AND EXISTS (SELECT 1 FROM categories c WHERE c.id = s.category_id)
ON CONFLICT DO NOTHING;
