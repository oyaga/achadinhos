package router

import (
	"log/slog"
	"net/http"

	"github.com/achadinhos/backend/internal/auth"
	"github.com/achadinhos/backend/internal/config"
	"github.com/achadinhos/backend/internal/handlers"
	"github.com/achadinhos/backend/internal/middleware"
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
	r.Use(middleware.CORS(cfg.CORSOrigins))

	// Serve uploaded product photos as static files.
	r.Static("/uploads", "./uploads")

	// Health.
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
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

	v1 := r.Group("/api/v1")

	// Public auth.
	v1Auth := v1.Group("/auth")
	{
		v1Auth.POST("/register", authH.Register)
		v1Auth.POST("/register/sindico", authH.RegisterSindico)
		v1Auth.POST("/register/prestador", authH.RegisterPrestador)
		v1Auth.POST("/register/seller", authH.RegisterSeller)
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

	// Seller "me" routes must be registered BEFORE /sellers/:id so Gin's
	// radix tree resolves the static segment "me" ahead of the param.
	sellerAuth := v1.Group("/sellers")
	sellerAuth.Use(middleware.RequireAuth(cfg.JWTSecret))
	{
		sellerAuth.GET("/me", sellH.GetMe)
		sellerAuth.PATCH("/me", sellH.PatchMe)
		sellerAuth.POST("/me/products", sellH.CreateProduct)
		sellerAuth.PATCH("/me/products/:id", sellH.UpdateProduct)
		sellerAuth.DELETE("/me/products/:id", sellH.DeleteProduct)
		sellerAuth.POST("/me/products/:id/photos", sellH.UploadProductPhoto)
		sellerAuth.DELETE("/me/products/:id/photos/:photo_id", sellH.DeleteProductPhoto)
	}

	// Public seller lookup — registered after /sellers/me so "me" isn't swallowed.
	v1.GET("/sellers/:id", sellH.Get)

	// Authenticated.
	authed := v1.Group("")
	authed.Use(middleware.RequireAuth(cfg.JWTSecret))
	{
		authed.GET("/me", meH.Get)
		authed.PATCH("/me", meH.Patch)

		authed.POST("/providers/:id/reviews", revH.Create)
		authed.DELETE("/reviews/:id", revH.Delete)
		authed.POST("/reviews/:id/helpful", revH.MarkHelpful)

		authed.GET("/favorites", favH.List)
		authed.POST("/favorites", favH.Create)
		authed.DELETE("/favorites", favH.Delete)

		// Provider creation: prestador only.
		prestador := authed.Group("")
		prestador.Use(middleware.RequireRole(string("prestador"), "admin"))
		prestador.POST("/providers", provH.Create)
	}

	if err := static.Mount(r); err != nil {
		slog.Warn("static frontend mount failed", "err", err)
	}

	return r
}
