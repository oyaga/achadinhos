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
	{Slug: "prov-1", Name: "TurboElev Manutenção", Cat: "manutencao", Avatar: "T", Rating: 4.9, Reviews: 128, Badge: "Ouro", Verified: true, Distance: "1,2km", Price: "R$ 180/visita", ResponseTime: "15min", Desc: "Especialistas em elevadores residenciais e comerciais. Atendimento 24h, peças originais e contrato de manutenção preventiva.", Services: []string{"Manutenção preventiva", "Emergência 24h", "Modernização", "Laudo técnico"}, YearsActive: 12, JobsDone: 340, WhatsApp: "11987654321", Highlight: true},
	{Slug: "prov-2", Name: "Alpha Elétrica 24h", Cat: "eletrica", Avatar: "A", Rating: 4.8, Reviews: 96, Badge: "Verificado", Verified: true, Distance: "0,8km", Price: "R$ 120/h", ResponseTime: "20min", Desc: "Eletricistas certificados pelo CREA. Atendimento emergencial e instalações completas.", Services: []string{"Instalação elétrica", "Quadros e disjuntores", "Para-raios", "Geradores"}, YearsActive: 8, JobsDone: 215, WhatsApp: "11987654322"},
	{Slug: "prov-3", Name: "Home Solutions Predial", Cat: "manutencao", Avatar: "H", Rating: 4.7, Reviews: 214, Badge: "Top", Verified: true, Distance: "2,1km", Price: "Sob consulta", ResponseTime: "1h", Desc: "Time multidisciplinar para manutenção predial completa. Contratos mensais com SLA garantido.", Services: []string{"Hidráulica", "Elétrica", "Pintura", "Marcenaria"}, YearsActive: 15, JobsDone: 580, WhatsApp: "11987654323"},
	{Slug: "prov-4", Name: "CleanPro Condomínios", Cat: "limpeza", Avatar: "C", Rating: 4.9, Reviews: 342, Badge: "Ouro", Verified: true, Distance: "0,5km", Price: "R$ 220/dia", ResponseTime: "10min", Desc: "Equipe própria treinada. Limpeza áreas comuns, pós-obra e jardinagem.", Services: []string{"Áreas comuns", "Pós-obra", "Vidros", "Jardinagem"}, YearsActive: 10, JobsDone: 890, WhatsApp: "11987654324", Highlight: true},
	{Slug: "prov-5", Name: "Guardião Segurança", Cat: "seguranca", Avatar: "G", Rating: 4.6, Reviews: 78, Verified: false, Distance: "3,4km", Price: "R$ 6.500/mês", ResponseTime: "30min", Desc: "Soluções integradas de segurança eletrônica e física para condomínios.", Services: []string{"Câmeras 24h", "Controle de acesso", "Cercas elétricas", "Alarmes"}, YearsActive: 6, JobsDone: 142, WhatsApp: "11987654325"},
	{Slug: "prov-6", Name: "Visão CFTV", Cat: "seguranca", Avatar: "V", Rating: 4.8, Reviews: 65, Badge: "Verificado", Verified: true, Distance: "4,1km", Price: "Sob consulta", ResponseTime: "45min", Desc: "Câmeras 4K com analytics IA, integração com aplicativo do morador.", Services: []string{"CFTV 4K", "Analytics IA", "Backup nuvem", "App do morador"}, YearsActive: 5, JobsDone: 87, WhatsApp: "11987654326"},
	{Slug: "prov-7", Name: "Portaria Connect", Cat: "portaria", Avatar: "P", Rating: 4.7, Reviews: 53, Badge: "Verificado", Verified: true, Distance: "5,2km", Price: "R$ 3.200/mês", ResponseTime: "1h", Desc: "Portaria remota 24h. Economize até 60% comparado à portaria física.", Services: []string{"Atendimento 24h", "Liberação remota", "Reconhecimento facial", "App integrado"}, YearsActive: 4, JobsDone: 38, WhatsApp: "11987654327"},
	{Slug: "prov-8", Name: "PestZero", Cat: "dedetizacao", Avatar: "P", Rating: 4.9, Reviews: 187, Badge: "Ouro", Verified: true, Distance: "2,8km", Price: "R$ 350/aplicação", ResponseTime: "2h", Desc: "Dedetização ecológica com produtos certificados. Garantia de 90 dias.", Services: []string{"Baratas", "Ratos", "Cupins", "Pombos"}, YearsActive: 9, JobsDone: 420, WhatsApp: "11987654328"},
	{Slug: "prov-9", Name: "LockerSmart", Cat: "armarios", Avatar: "L", Rating: 4.7, Reviews: 32, Badge: "Verificado", Verified: true, Distance: "6,3km", Price: "R$ 12.000/locker", ResponseTime: "24h", Desc: "Armários inteligentes para entregas. Integração com Mercado Livre, iFood, Correios.", Services: []string{"Instalação", "Manutenção", "App próprio", "Suporte 24h"}, YearsActive: 3, JobsDone: 28, WhatsApp: "11987654329"},
	{Slug: "prov-10", Name: "FacilityMaster", Cat: "facilities", Avatar: "F", Rating: 4.8, Reviews: 91, Badge: "Top", Verified: true, Distance: "3,1km", Price: "A partir de R$ 8k/mês", ResponseTime: "4h", Desc: "Gestão integrada de todos os serviços prediais. Um único contrato, um único contato.", Services: []string{"Gestão integrada", "SLA garantido", "Relatórios mensais", "BI próprio"}, YearsActive: 11, JobsDone: 156, WhatsApp: "11987654330", Highlight: true},
	{Slug: "prov-11", Name: "Equipe Total Terceirização", Cat: "terceirizacao", Avatar: "E", Rating: 4.6, Reviews: 124, Verified: true, Distance: "4,5km", Price: "Sob consulta", ResponseTime: "4h", Desc: "Equipes próprias para portaria, limpeza e manutenção. CLT registrado.", Services: []string{"Portaria", "Limpeza", "Manutenção", "Jardinagem"}, YearsActive: 14, JobsDone: 312, WhatsApp: "11987654331"},
	{Slug: "prov-12", Name: "BPS Condomínios", Cat: "parceiros", Avatar: "B", Rating: 4.9, Reviews: 264, Badge: "Ouro", Verified: true, Distance: "1,8km", Price: "Sob consulta", ResponseTime: "30min", Desc: "Empresa auditada e homologada. Acordos preferenciais negociados pela administradora.", Services: []string{"Manutenção predial", "Reformas", "Pintura", "Hidráulica"}, YearsActive: 18, JobsDone: 740, WhatsApp: "11987654332"},
}

// Sample products. Each references a seller (empresa) by name; the seller
// records are derived from this list and managed through the admin panel.
var products = []productSeed{
	{ID: "p1", Name: "Saco de lixo reforçado 100L (cx c/ 100)", Cat: "limpeza", Price: 89.9, OldPrice: ptr(119.9), Rating: 4.8, Reviews: 64, Seller: "Distribuidora Higicond", Tag: "Mais vendido", WhatsApp: "11987654401", Link: "https://exemplo.com/p/saco100l", Badge: "OFERTA", Stock: "Em estoque"},
	{ID: "p2", Name: "Vassoura industrial 60cm com cabo", Cat: "limpeza", Price: 38.5, Rating: 4.6, Reviews: 28, Seller: "Distribuidora Higicond", WhatsApp: "11987654401", Link: "https://exemplo.com/p/vassoura", Stock: "Em estoque"},
	{ID: "p3", Name: "Detergente neutro 5L (galão)", Cat: "limpeza", Price: 24.9, OldPrice: ptr(32.0), Rating: 4.7, Reviews: 92, Seller: "Distribuidora Higicond", WhatsApp: "11987654401", Link: "https://exemplo.com/p/detergente5l", Stock: "Em estoque"},
	{ID: "p4", Name: "Caixa de fusíveis NH 100A", Cat: "eletrica", Price: 245.0, Rating: 4.9, Reviews: 14, Seller: "Distribuidora Higicond", Tag: "Profissional", WhatsApp: "11987654401", Link: "https://exemplo.com/p/fusivel-nh", Stock: "Em estoque"},
	{ID: "p5", Name: "Capacete de segurança branco com jugular", Cat: "epi", Price: 32.9, Rating: 4.5, Reviews: 41, Seller: "Distribuidora Higicond", WhatsApp: "11987654401", Link: "https://exemplo.com/p/capacete", Stock: "Em estoque"},
	{ID: "p6", Name: "Cloro multiação 10kg", Cat: "piscina", Price: 189.0, OldPrice: ptr(219.0), Rating: 4.8, Reviews: 38, Seller: "Distribuidora Higicond", Tag: "Recomendado", WhatsApp: "11987654401", Link: "https://exemplo.com/p/cloro10kg", Badge: "OFERTA", Stock: "Últimas unidades"},
	{ID: "p7", Name: "Adubo NPK 10-10-10 saco 25kg", Cat: "jardim", Price: 78.0, Rating: 4.6, Reviews: 19, Seller: "Distribuidora Higicond", WhatsApp: "11987654401", Link: "https://exemplo.com/p/adubo", Stock: "Em estoque"},
	{ID: "p8", Name: "Kit ferramentas predial 132 peças", Cat: "manutencao", Price: 489.9, OldPrice: ptr(599.0), Rating: 4.9, Reviews: 56, Seller: "Distribuidora Higicond", Tag: "Mais vendido", WhatsApp: "11987654401", Link: "https://exemplo.com/p/kit-ferramentas", Badge: "OFERTA", Stock: "Em estoque"},
	{ID: "p9", Name: "Luva nitrílica caixa c/ 100 unid.", Cat: "epi", Price: 42.0, Rating: 4.7, Reviews: 73, Seller: "Distribuidora Higicond", WhatsApp: "11987654401", Link: "https://exemplo.com/p/luva-nitrilica", Stock: "Em estoque"},
	{ID: "p10", Name: "Mangueira flex 50m com esguicho", Cat: "jardim", Price: 129.0, Rating: 4.4, Reviews: 22, Seller: "Distribuidora Higicond", WhatsApp: "11987654401", Link: "https://exemplo.com/p/mangueira", Stock: "Em estoque"},
	{ID: "p11", Name: "Kit limpeza piscina (peneira + escova)", Cat: "piscina", Price: 145.0, Rating: 4.6, Reviews: 31, Seller: "Distribuidora Higicond", WhatsApp: "11987654401", Link: "https://exemplo.com/p/kit-piscina", Stock: "Em estoque"},
	{ID: "p12", Name: "Resma papel A4 75g (caixa 10x)", Cat: "escritorio", Price: 159.9, Rating: 4.5, Reviews: 87, Seller: "Distribuidora Higicond", WhatsApp: "11987654401", Link: "https://exemplo.com/p/papel-a4", Stock: "Em estoque"},
}

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
	{ProviderSlug: "prov-1", Author: "Carlos Mendes", Condo: "Edifício Aurora · Síndico", Rating: 5, Text: "Atendimento impecável. Chegaram em 15 minutos e resolveram o problema do elevador. Recomendo!", Helpful: 12, Tags: []string{"Pontual", "Profissional", "Resolve rápido"}, CreatedAt: time.Date(2026, 4, 12, 10, 0, 0, 0, time.UTC)},
	{ProviderSlug: "prov-1", Author: "Juliana Ferraz", Condo: "Condomínio Vila Nova · Síndica", Rating: 5, Text: "Já é o terceiro contrato com eles. Sempre cumprem o prazo e o orçamento. Equipe muito educada.", Helpful: 8, Tags: []string{"Preço justo", "Atencioso"}, CreatedAt: time.Date(2026, 4, 8, 10, 0, 0, 0, time.UTC)},
	{ProviderSlug: "prov-1", Author: "Roberto Lima", Condo: "Residencial Park · Síndico", Rating: 4, Text: "Bom atendimento, só achei o preço um pouco acima da média. Mas a qualidade compensa.", Helpful: 5, Tags: []string{"Profissional"}, CreatedAt: time.Date(2026, 4, 2, 10, 0, 0, 0, time.UTC)},
	{ProviderSlug: "prov-1", Author: "Maria Souza", Condo: "Cond. Jardins · Síndica", Rating: 5, Text: "Salvaram nosso elevador num domingo de manhã. Atendimento 24h é real mesmo.", Helpful: 18, Tags: []string{"Pontual", "Resolve rápido"}, CreatedAt: time.Date(2026, 3, 28, 10, 0, 0, 0, time.UTC)},
	{ProviderSlug: "prov-2", Author: "André Gomes", Condo: "Edif. Solar · Síndico", Rating: 5, Text: "Resolveram um curto que tinha 3 meses. Muito técnicos e diretos.", Helpful: 9, Tags: []string{"Profissional", "Resolve rápido"}, CreatedAt: time.Date(2026, 4, 10, 10, 0, 0, 0, time.UTC)},
	{ProviderSlug: "prov-4", Author: "Fernanda Castro", Condo: "Cond. Atlântico · Síndica", Rating: 5, Text: "Equipe pontual e caprichosa. Áreas comuns ficaram impecáveis após pós-obra.", Helpful: 22, Tags: []string{"Limpo", "Pontual"}, CreatedAt: time.Date(2026, 4, 14, 10, 0, 0, 0, time.UTC)},
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
	// Truncate everything for idempotency.
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
