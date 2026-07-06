package router

import (
	"log/slog"
	"net/http"

	"github.com/achadinhos/backend/internal/agenda"
	"github.com/achadinhos/backend/internal/auth"
	"github.com/achadinhos/backend/internal/config"
	"github.com/achadinhos/backend/internal/email"
	"github.com/achadinhos/backend/internal/handlers"
	"github.com/achadinhos/backend/internal/middleware"
	"github.com/achadinhos/backend/internal/models"
	"github.com/achadinhos/backend/internal/static"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// New constructs the gin engine with all middleware and routes mounted.
func New(cfg *config.Config, db *gorm.DB) *gin.Engine {
	if cfg.AppEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}
	r := gin.New()
	r.Use(middleware.Recover())
	r.Use(middleware.Logger())
	// Anti-clonagem: bloqueia user-agents de agentes de IA/scrapers e aplica
	// rate limit por IP. Só em produção para não atrapalhar dev/testes.
	r.Use(middleware.AntiBot(middleware.AntiBotConfig{
		Enabled:     cfg.AppEnv == "production",
		BypassToken: cfg.AntibotBypassToken,
	}))
	r.Use(middleware.CORS(cfg.CORSOrigins))

	// Serve uploaded product photos as static files.
	r.Static("/uploads", "./uploads")

	// Health.
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// Sinaliza a bots "educados" (inclui os crawlers de IA) que o conteúdo não
	// pode ser copiado nem usado para treinamento. Buscadores continuam livres.
	r.GET("/robots.txt", func(c *gin.Context) {
		c.Data(http.StatusOK, "text/plain; charset=utf-8", []byte(robotsTxt))
	})

	authSvc := auth.New(db, cfg)
	authH := handlers.NewAuthHandler(authSvc)
	meH := handlers.NewMeHandler(db, authSvc)
	catH := handlers.NewCategoriesHandler(db)
	provH := handlers.NewProvidersHandler(db)
	revH := handlers.NewReviewsHandler(db)
	favH := handlers.NewFavoritesHandler(db)
	prodH := handlers.NewProductsHandler(db)
	sellH := handlers.NewSellersHandler(db)
	adminH := handlers.NewAdminHandler(db)
	mailer := email.NewClient(cfg.ResendAPIKey, cfg.MailFrom)
	fichaH := handlers.NewFichaHandler(db, mailer, cfg.AppBaseURL)
	evH := handlers.NewEventHandler(db)
	certH := handlers.NewCertificateHandler(db)
	agendaSvc := agenda.NewService(
		db,
		cfg.GoogleOAuthClientID,
		cfg.GoogleOAuthClientSecret,
		cfg.AppBaseURL+"/api/v1/agenda/google/callback",
		cfg.JWTSecret,
	)
	agendaH := handlers.NewAgendaHandler(db, agendaSvc, cfg.AppBaseURL)

	v1 := r.Group("/api/v1")

	// Public auth. Síndico register is the only public sign-up flow.
	v1Auth := v1.Group("/auth")
	{
		v1Auth.POST("/register/sindico", authH.RegisterSindico)
		v1Auth.POST("/login", authH.Login)
		v1Auth.POST("/refresh", authH.Refresh)
	}

	// Public reads.
	v1.GET("/categories", catH.List)
	v1.GET("/categories/:id", catH.Get)

	v1.GET("/providers", provH.List)
	v1.GET("/providers/:id", provH.Get)
	v1.GET("/providers/:id/reviews", provH.ListReviews)

	v1.GET("/products", prodH.List)
	v1.GET("/products/:id", prodH.Get)

	v1.GET("/sellers", sellH.List)
	v1.GET("/sellers/:id", sellH.Get)
	v1.GET("/sellers/:id/reviews", sellH.ListReviews)

	// Public ficha de cadastro (preenchimento via link com token).
	v1.GET("/fichas/:token", fichaH.GetByToken)
	v1.POST("/fichas/:token", fichaH.Submit)

	// Public events (calendário do condomínio).
	v1.GET("/events", evH.List)
	v1.GET("/events/:id", evH.Get)

	// Public certificate verification (acessada pelo QR code).
	v1.GET("/certificates/:code", certH.GetByCode)

	// Public agenda (booking estilo Calendly). O callback OAuth é público por
	// natureza (redirect do Google) e valida um state assinado.
	v1.GET("/agenda/google/callback", agendaH.GoogleCallback)
	v1.GET("/agenda/:slug", agendaH.GetPublic)
	v1.GET("/agenda/:slug/slots", agendaH.Slots)
	v1.POST("/agenda/:slug/book", agendaH.Book)

	// Authenticated (any logged-in user: síndico or admin).
	authed := v1.Group("")
	authed.Use(middleware.RequireAuth(cfg.JWTSecret))
	{
		authed.GET("/me", meH.Get)
		authed.PATCH("/me", meH.Patch)

		authed.POST("/providers/:id/reviews", revH.Create)
		authed.POST("/sellers/:id/reviews", sellH.CreateReview)
		authed.DELETE("/reviews/:id", revH.Delete)
		authed.POST("/reviews/:id/helpful", revH.MarkHelpful)

		authed.GET("/favorites", favH.List)
		authed.POST("/favorites", favH.Create)
		authed.DELETE("/favorites", favH.Delete)
	}

	// Admin panel — products, empresas (sellers) and prestadores (providers).
	admin := v1.Group("/admin")
	admin.Use(middleware.RequireAuth(cfg.JWTSecret))
	admin.Use(middleware.RequireRole(string(models.RoleAdmin)))
	{
		admin.GET("/sindicos", adminH.ListSindicos)

		admin.GET("/sellers", adminH.ListSellers)
		admin.POST("/sellers", adminH.CreateSeller)
		admin.PATCH("/sellers/:id", adminH.UpdateSeller)
		admin.DELETE("/sellers/:id", adminH.DeleteSeller)
		admin.POST("/sellers/:id/convert", adminH.ConvertSellerToProvider)
		admin.POST("/sellers/:id/logo", adminH.UploadSellerLogo)
		admin.POST("/sellers/:id/portfolio", adminH.UploadSellerPortfolio)
		admin.POST("/sellers/:id/portfolio/link", adminH.AddSellerPortfolioLink)
		admin.DELETE("/sellers/:id/portfolio/:photo_id", adminH.DeleteSellerPortfolio)

		admin.GET("/providers", adminH.ListProviders)
		admin.POST("/providers", adminH.CreateProvider)
		admin.PATCH("/providers/:id", adminH.UpdateProvider)
		admin.DELETE("/providers/:id", adminH.DeleteProvider)
		admin.POST("/providers/:id/convert", adminH.ConvertProviderToSeller)
		admin.POST("/providers/:id/logo", adminH.UploadProviderLogo)
		admin.POST("/providers/:id/portfolio", adminH.UploadProviderPortfolio)
		admin.POST("/providers/:id/portfolio/link", adminH.AddProviderPortfolioLink)
		admin.DELETE("/providers/:id/portfolio/:photo_id", adminH.DeleteProviderPortfolio)

		admin.GET("/fichas", fichaH.List)
		admin.POST("/fichas", fichaH.Create)
		admin.POST("/fichas/:id/resend", fichaH.Resend)
		admin.DELETE("/fichas/:id", fichaH.Delete)

		admin.GET("/events", evH.List)
		admin.POST("/events", evH.Create)
		admin.PATCH("/events/:id", evH.Update)
		admin.DELETE("/events/:id", evH.Delete)
		admin.POST("/events/:id/banner", evH.UploadBanner)
		admin.DELETE("/events/:id/banner", evH.DeleteBanner)

		admin.GET("/agenda", agendaH.AdminGet)
		admin.PUT("/agenda", agendaH.AdminUpdate)
		admin.GET("/agenda/google/url", agendaH.GoogleAuthURL)
		admin.DELETE("/agenda/google", agendaH.GoogleDisconnect)

		admin.GET("/certificates", certH.List)
		admin.POST("/certificates", certH.Create)
		admin.PATCH("/certificates/:id", certH.Revoke)
		admin.DELETE("/certificates/:id", certH.Delete)

		admin.GET("/products", adminH.ListProducts)
		admin.POST("/products", adminH.CreateProduct)
		admin.PATCH("/products/:id", adminH.UpdateProduct)
		admin.DELETE("/products/:id", adminH.DeleteProduct)
		admin.POST("/products/:id/photos", adminH.UploadProductPhoto)
		admin.DELETE("/products/:id/photos/:photo_id", adminH.DeleteProductPhoto)
	}

	if err := static.Mount(r); err != nil {
		slog.Warn("static frontend mount failed", "err", err)
	}

	return r
}

// robotsTxt proíbe crawlers de IA (treinamento e agentes) e mantém os
// buscadores tradicionais liberados. É só um sinal — bots mal-comportados são
// barrados pelo middleware AntiBot.
const robotsTxt = `# Achadinhos do Condominio — conteudo protegido por direitos autorais.
# Uso para treinamento de IA ou copia/clonagem do site NAO e autorizado.

User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: OAI-SearchBot
User-agent: ClaudeBot
User-agent: Claude-Web
User-agent: anthropic-ai
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: CCBot
User-agent: Bytespider
User-agent: cohere-ai
User-agent: meta-externalagent
User-agent: FacebookBot
User-agent: Amazonbot
User-agent: AI2Bot
User-agent: Diffbot
User-agent: omgilibot
User-agent: YouBot
User-agent: MistralAI-User
User-agent: FirecrawlAgent
Disallow: /

User-agent: *
Disallow: /api/
Disallow: /admin/
Allow: /
`
