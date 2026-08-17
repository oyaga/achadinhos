package db

import (
	"context"

	"gorm.io/gorm"
)

// EnsureSellerCategories garante que toda empresa tenha sua categoria
// principal (sellers.category_id) espelhada na tabela de junção
// seller_categories — o backfill da migração 0026, repetido de forma
// idempotente no start para instalações que só rodam o AutoMigrate.
func EnsureSellerCategories(ctx context.Context, gdb *gorm.DB) error {
	return gdb.WithContext(ctx).Exec(`
		INSERT INTO seller_categories (seller_id, category_id)
		SELECT s.id, s.category_id
		FROM sellers s
		WHERE s.category_id <> ''
		  AND EXISTS (SELECT 1 FROM categories c WHERE c.id = s.category_id)
		ON CONFLICT DO NOTHING`).Error
}
