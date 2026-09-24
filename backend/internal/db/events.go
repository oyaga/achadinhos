package db

import (
	"context"

	"github.com/achadinhos/backend/internal/models"
	"gorm.io/gorm"
)

// EnsureEventDays copia a data/hora de eventos antigos (anteriores à tabela
// event_days) para um registro de dia. Roda no boot, idempotente: só cria
// para eventos que ainda não têm nenhum dia. (Produção aplica AutoMigrate,
// que cria a tabela mas não faz data-fix — o fix vive aqui, como nas
// categorias.)
func EnsureEventDays(ctx context.Context, gdb *gorm.DB) error {
	var events []models.Event
	if err := gdb.WithContext(ctx).
		Where("NOT EXISTS (SELECT 1 FROM event_days d WHERE d.event_id = events.id)").
		Find(&events).Error; err != nil {
		return err
	}
	for i := range events {
		day := models.EventDay{
			EventID: events[i].ID,
			Day:     events[i].EventDate,
			DayTime: events[i].EventTime,
		}
		if err := gdb.WithContext(ctx).Create(&day).Error; err != nil {
			return err
		}
	}
	return nil
}
