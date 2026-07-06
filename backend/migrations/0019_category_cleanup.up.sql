-- Limpeza de categorias (pedido do admin):
-- 1. Nova categoria "loja": empresas que vendem produtos (aparecem no Shopping).
--    As empresas que estavam penduradas em "shopping" (a categoria da vitrine
--    de produtos) migram para "loja".
-- 2. "administradora" era duplicada de "administracao-condominios" — funde.
-- 3. "parceiros" (Parceiros homologados) sai da lista (sem vínculos em prod).

INSERT INTO categories (id, label, short, icon, badge, description, sort_order)
VALUES ('loja', 'Loja', 'Loja', 'CatShopping', '', 'Lojas parceiras com produtos e ofertas para o condomínio', 3)
ON CONFLICT (id) DO NOTHING;

UPDATE sellers SET category_id = 'loja' WHERE category_id = 'shopping';

UPDATE sellers   SET category_id = 'administracao-condominios' WHERE category_id = 'administradora';
UPDATE providers SET category_id = 'administracao-condominios' WHERE category_id = 'administradora';

-- Segurança: solta eventuais vínculos antes de apagar as categorias.
UPDATE sellers   SET category_id = NULL WHERE category_id = 'parceiros';
UPDATE providers SET category_id = 'administracao-condominios' WHERE category_id = 'parceiros';

DELETE FROM categories WHERE id IN ('administradora', 'parceiros');
