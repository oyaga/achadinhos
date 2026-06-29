package db

import (
	"context"

	"gorm.io/gorm"
)

// EnsureCertificateSchema adjusts the certificates schema and resyncs the
// denormalized certificate tier on sellers/providers. Idempotent — safe to run
// on every boot. Needed because production applies the GORM AutoMigrate (which
// adds new columns) but not the SQL migrations: AutoMigrate cannot relax the
// legacy `seller_id NOT NULL` constraint, and the marketplace badge must be
// recomputed from the certificates that are currently active.
func EnsureCertificateSchema(ctx context.Context, gdb *gorm.DB) error {
	// Afiliados (providers) não têm seller — seller_id passa a ser opcional.
	// No-op se a coluna já for nullable (instalações novas via AutoMigrate).
	if err := gdb.WithContext(ctx).
		Exec(`ALTER TABLE certificates ALTER COLUMN seller_id DROP NOT NULL`).Error; err != nil {
		return err
	}

	// Recalcula o selo (cert_tier) a partir do certificado ativo mais recente
	// de cada titular. Faz o selo "expirar" naturalmente a cada boot/deploy:
	// certificados vencidos ou revogados deixam de contar.
	if err := gdb.WithContext(ctx).Exec(`
		UPDATE sellers s SET cert_tier = COALESCE((
			SELECT c.tier FROM certificates c
			WHERE c.seller_id = s.id AND c.deleted_at IS NULL
			  AND c.revoked = FALSE AND c.valid_until >= CURRENT_DATE
			ORDER BY c.issued_at DESC LIMIT 1
		), '')`).Error; err != nil {
		return err
	}
	if err := gdb.WithContext(ctx).Exec(`
		UPDATE providers p SET cert_tier = COALESCE((
			SELECT c.tier FROM certificates c
			WHERE c.provider_id = p.id AND c.deleted_at IS NULL
			  AND c.revoked = FALSE AND c.valid_until >= CURRENT_DATE
			ORDER BY c.issued_at DESC LIMIT 1
		), '')`).Error; err != nil {
		return err
	}
	return nil
}
