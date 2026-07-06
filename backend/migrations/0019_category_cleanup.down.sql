-- Best-effort: recria as categorias removidas (vínculos migrados não voltam).
INSERT INTO categories (id, label, short, icon, badge, description, sort_order)
VALUES
  ('parceiros', 'Parceiros homologados', E'Parceiros\nhomologados', 'CatPartners', '', 'Empresas auditadas e aprovadas pela administração', 3),
  ('administradora', 'Administradora', 'Admin', 'CatPartners', '', '', 140)
ON CONFLICT (id) DO NOTHING;

UPDATE sellers SET category_id = 'shopping' WHERE category_id = 'loja';
DELETE FROM categories WHERE id = 'loja';
