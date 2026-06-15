package main

import (
	"context"
	"log/slog"
	"os"
	"time"

	"github.com/achadinhos/backend/internal/auth"
	"github.com/achadinhos/backend/internal/config"
	"github.com/achadinhos/backend/internal/db"
	"github.com/achadinhos/backend/internal/models"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type providerSeed struct {
	Slug              string
	Name              string
	Cat               string
	Avatar            string
	Rating            float64
	Reviews           int
	Badge             string
	Verified          bool
	Distance          string
	Price             string
	ResponseTime      string
	Desc              string
	Services          []string
	YearsActive       int
	JobsDone          int
	WhatsApp          string
	Highlight         bool
}

type productSeed struct {
	ID         string
	Name       string
	Cat        string
	Price      float64
	OldPrice   *float64
	Rating     float64
	Reviews    int
	Seller     string
	Tag        string
	WhatsApp   string
	Link       string
	Badge      string
	Stock      string
}

func ptr[T any](v T) *T { return &v }

var providers = []providerSeed{
	{Slug: "premium-admin", Name: "Premium Administradora", Cat: "administracao-condominios", Avatar: "P", Rating: 5.0, Reviews: 2, Badge: "Ouro", Verified: true, Distance: "2,5km", Price: "Sob consulta", ResponseTime: "15min", Desc: "Gestão completa e transparente para o seu condomínio. Equipe especializada e tecnologia de ponta.", Services: []string{"Gestão financeira", "Assessoria jurídica", "Recursos humanos", "App do morador"}, YearsActive: 10, JobsDone: 150, WhatsApp: "11987654333", Highlight: true},
}

// Sample products. Each references a seller (empresa) by name; the seller
// records are derived from this list and managed through the admin panel.
var products = []productSeed{}

type reviewSeed struct {
	ProviderSlug string
	Author       string
	Condo        string
	Rating       int
	Text         string
	Helpful      int
	Tags         []string
	CreatedAt    time.Time
}

var reviews = []reviewSeed{
	{ProviderSlug: "premium-admin", Author: "Ricardo Silva", Condo: "Edifício Aurora · Síndico", Rating: 5, Text: "Excelente administradora. Transparência total nas contas e o suporte jurídico é muito eficiente.", Helpful: 12, Tags: []string{"Profissional", "Atencioso"}, CreatedAt: time.Date(2026, 6, 1, 10, 0, 0, 0, time.UTC)},
	{ProviderSlug: "premium-admin", Author: "Mariana Costa", Condo: "Condomínio Vila Nova · Síndica", Rating: 5, Text: "Gostamos muito do atendimento da Premium. O app deles facilita muito a vida dos moradores.", Helpful: 8, Tags: []string{"Preço justo", "Resolve rápido"}, CreatedAt: time.Date(2026, 6, 5, 10, 0, 0, 0, time.UTC)},
}

func main() {
	cfg, err := config.Load()
	if err != nil {
		slog.Error("failed to load config", "err", err)
		os.Exit(1)
	}
	gdb, err := db.New(cfg)
	if err != nil {
		slog.Error("failed to connect to db", "err", err)
		os.Exit(1)
	}
	if err := db.AutoMigrate(gdb); err != nil {
		slog.Warn("auto-migrate non-fatal", "err", err)
	}
	if err := Run(context.Background(), gdb); err != nil {
		slog.Error("seed failed", "err", err)
		os.Exit(1)
	}
	slog.Info("seed complete")
}

// Run is the public seed entrypoint. Reusable from tests.
func Run(ctx context.Context, gdb *gorm.DB) error {
	// SAFETY: Destructive truncate disabled to prevent accidental data loss in production.
	// To force a clean seed, manually truncate tables or uncomment below if in development.
	/*
		tables := []string{
			"review_helpfuls", "reviews", "favorites",
			"refresh_tokens", "products", "sellers",
			"providers", "users", "condominios", "categories",
		}
		for _, t := range tables {
			if err := gdb.WithContext(ctx).Exec("TRUNCATE TABLE " + t + " RESTART IDENTITY CASCADE").Error; err != nil {
				return err
			}
		}
	*/

	// Categories — canonical list lives in internal/db (so api startup
	// and the seed share the same source of truth).
	for i := range db.CanonicalCategories {
		if err := gdb.WithContext(ctx).Clauses(clause.OnConflict{UpdateAll: true}).Create(&db.CanonicalCategories[i]).Error; err != nil {
			return err
		}
	}

	// Sample condo + sindico user.
	condo := &models.Condominio{
		ID:      uuid.New(),
		Name:    "Edifício Aurora",
		Address: "Av. Paulista, 1000",
		City:    "São Paulo",
		State:   "SP",
	}
	if err := gdb.WithContext(ctx).Create(condo).Error; err != nil {
		return err
	}
	pwHash, err := auth.HashPassword("senha123")
	if err != nil {
		return err
	}
	sindico := &models.User{
		ID:           uuid.New(),
		Email:        "sindico@aurora.com",
		PasswordHash: pwHash,
		Name:         "Carlos Mendes",
		Role:         models.RoleSindico,
		CondoID:      &condo.ID,
	}
	if err := gdb.WithContext(ctx).Create(sindico).Error; err != nil {
		return err
	}
	if err := gdb.WithContext(ctx).Model(condo).Update("sindico_id", sindico.ID).Error; err != nil {
		return err
	}

	// Admin account — manages products, empresas and prestadores via the admin panel.
	adminHash, err := auth.HashPassword("senha123")
	if err != nil {
		return err
	}
	admin := &models.User{
		ID:           uuid.New(),
		Email:        "admin@achadinhos.com",
		PasswordHash: adminHash,
		Name:         "Administrador",
		Role:         models.RoleAdmin,
	}
	if err := gdb.WithContext(ctx).Create(admin).Error; err != nil {
		return err
	}
	slog.Info("admin user created", "email", admin.Email)

	// Providers (slug -> uuid map).
	provIDs := make(map[string]uuid.UUID, len(providers))
	for _, p := range providers {
		mp := &models.Provider{
			ID:                uuid.New(),
			Name:              p.Name,
			CategoryID:        p.Cat,
			Avatar:            p.Avatar,
			Rating:            p.Rating,
			ReviewsCount:      p.Reviews,
			Badge:             p.Badge,
			Verified:          p.Verified,
			DistanceLabel:     p.Distance,
			PriceLabel:        p.Price,
			ResponseTimeLabel: p.ResponseTime,
			Description:       p.Desc,
			Services:          models.StringSlice(p.Services),
			YearsActive:       p.YearsActive,
			JobsDone:          p.JobsDone,
			WhatsApp:          p.WhatsApp,
			Highlight:         p.Highlight,
			Coverage:          models.CoverageCidade,
			RadiusKM:          15,
		}
		if err := gdb.WithContext(ctx).Create(mp).Error; err != nil {
			return err
		}
		provIDs[p.Slug] = mp.ID
	}

	// Sellers (empresas), derived from product list.
	sellerNames := map[string]struct{}{}
	for _, p := range products {
		sellerNames[p.Seller] = struct{}{}
	}
	sellerIDs := make(map[string]uuid.UUID, len(sellerNames))
	for name := range sellerNames {
		s := &models.Seller{
			ID:         uuid.New(),
			Name:       name,
			CategoryID: "shopping",
			Avatar:     string([]rune(name)[0]),
			WhatsApp:   "11900000000",
			Partner:    false,
		}
		if err := gdb.WithContext(ctx).Create(s).Error; err != nil {
			return err
		}
		sellerIDs[name] = s.ID
	}

	// Products.
	for _, p := range products {
		sellerID := sellerIDs[p.Seller]
		mp := &models.Product{
			ID:               p.ID,
			SellerID:         &sellerID,
			Name:             p.Name,
			Category:         p.Cat,
			Price:            p.Price,
			OldPrice:         p.OldPrice,
			Rating:           p.Rating,
			ReviewsCount:     p.Reviews,
			Tag:              p.Tag,
			Badge:            p.Badge,
			Stock:            p.Stock,
			WhatsAppOverride: p.WhatsApp,
			LinkOverride:     p.Link,
		}
		if err := gdb.WithContext(ctx).Create(mp).Error; err != nil {
			return err
		}
	}

	// Reviews — every review needs a real user. We re-use the sindico for sample reviews,
	// but reviews must be unique per (provider_id, user_id). Create one ephemeral user per review author.
	for _, rv := range reviews {
		// Create a dedicated reviewer user (idempotency: TRUNCATE was already run).
		reviewer := &models.User{
			ID:           uuid.New(),
			Email:        sanitizeEmail(rv.Author),
			PasswordHash: pwHash,
			Name:         rv.Author,
			Role:         models.RoleSindico,
		}
		if err := gdb.WithContext(ctx).Create(reviewer).Error; err != nil {
			return err
		}
		mr := &models.Review{
			ID:           uuid.New(),
			ProviderID:   provIDs[rv.ProviderSlug],
			UserID:       reviewer.ID,
			Rating:       rv.Rating,
			Text:         rv.Text,
			HelpfulCount: rv.Helpful,
			Tags:         models.StringSlice(rv.Tags),
			Verified:     true,
			CreatedAt:    rv.CreatedAt,
		}
		if err := gdb.WithContext(ctx).Create(mr).Error; err != nil {
			return err
		}
	}
	return nil
}

func sanitizeEmail(name string) string {
	out := make([]rune, 0, len(name))
	for _, r := range name {
		switch {
		case r >= 'a' && r <= 'z', r >= '0' && r <= '9':
			out = append(out, r)
		case r >= 'A' && r <= 'Z':
			out = append(out, r+32)
		case r == ' ':
			out = append(out, '.')
		}
	}
	return string(out) + "@seed.local"
}
