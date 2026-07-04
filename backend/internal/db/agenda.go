package db

import (
	"context"

	"github.com/achadinhos/backend/internal/models"
	"gorm.io/gorm"
)

// EnsureAgendaSettings seeds the default agenda ("ligia") when none exists.
// Idempotent — mirrors the seed shipped in migration 0017 for installs that
// only run AutoMigrate (dev/test).
func EnsureAgendaSettings(ctx context.Context, gdb *gorm.DB) error {
	var n int64
	if err := gdb.WithContext(ctx).Model(&models.AgendaSettings{}).Count(&n).Error; err != nil {
		return err
	}
	if n > 0 {
		return nil
	}
	weekday := []models.AgendaWindow{{Start: "09:00", End: "18:00"}}
	return gdb.WithContext(ctx).Create(&models.AgendaSettings{
		Slug:        "ligia",
		DisplayName: "Ligia Claudia",
		Title:       "Consultoria condominial",
		DurationMin: 60,
		BufferMin:   15,
		Timezone:    "America/Sao_Paulo",
		WorkHours: models.AgendaWorkHours{
			"0": {}, "1": weekday, "2": weekday, "3": weekday, "4": weekday, "5": weekday, "6": {},
		},
		Active:      true,
		LeadTimeMin: 120,
		HorizonDays: 30,
	}).Error
}
