package dto

// ── Empresas (sellers) ───────────────────────────────────────────────────────

// AdminSellerRequest is the body for POST /admin/sellers.
type AdminSellerRequest struct {
	Name         string `json:"name" binding:"required,min=2,max=255"`
	CategoryID   string `json:"category_id" binding:"required"`
	Description  string `json:"description" binding:"max=2000"`
	WhatsApp     string `json:"whatsapp" binding:"required,min=8,max=32"`
	Link         string `json:"link" binding:"omitempty,max=500"`
	Partner      bool   `json:"partner"`
	Highlight    bool   `json:"highlight"`
	DocumentType string `json:"document_type" binding:"required,oneof=cpf cnpj"`
	Document     string `json:"document" binding:"required"`
}

// AdminSellerPatch is the body for PATCH /admin/sellers/:id. All fields optional.
type AdminSellerPatch struct {
	Name         *string `json:"name" binding:"omitempty,min=2,max=255"`
	CategoryID   *string `json:"category_id"`
	Description  *string `json:"description" binding:"omitempty,max=2000"`
	WhatsApp     *string `json:"whatsapp" binding:"omitempty,min=8,max=32"`
	Link         *string `json:"link" binding:"omitempty,max=500"`
	Partner      *bool   `json:"partner"`
	Highlight    *bool   `json:"highlight"`
	DocumentType *string `json:"document_type" binding:"omitempty,oneof=cpf cnpj"`
	Document     *string `json:"document"`
}

// ── Prestadores (providers) ──────────────────────────────────────────────────

// AdminProviderRequest is the body for POST /admin/providers.
type AdminProviderRequest struct {
	Name              string   `json:"name" binding:"required,min=2,max=255"`
	CategoryID        string   `json:"category_id" binding:"required"`
	Description       string   `json:"description" binding:"required,min=10"`
	Services          []string `json:"services" binding:"omitempty,dive,min=1,max=128"`
	WhatsApp          string   `json:"whatsapp" binding:"required,min=8,max=32"`
	YearsActive       int      `json:"years_active" binding:"min=0,max=99"`
	JobsDone          int      `json:"jobs_done" binding:"min=0"`
	PriceLabel        string   `json:"price_label" binding:"max=64"`
	ResponseTimeLabel string   `json:"response_time_label" binding:"max=64"`
	DistanceLabel     string   `json:"distance_label" binding:"max=64"`
	Coverage          string   `json:"coverage" binding:"omitempty,oneof=bairro cidade regiao"`
	RadiusKM          int      `json:"radius_km" binding:"min=0,max=200"`
	Verified          bool     `json:"verified"`
	Highlight         bool     `json:"highlight"`
	Badge             string   `json:"badge" binding:"max=16"`
	DocumentType      string   `json:"document_type" binding:"required,oneof=cpf cnpj"`
	Document          string   `json:"document" binding:"required"`
}

// AdminProviderPatch is the body for PATCH /admin/providers/:id. All optional.
type AdminProviderPatch struct {
	Name              *string   `json:"name" binding:"omitempty,min=2,max=255"`
	CategoryID        *string   `json:"category_id"`
	Description       *string   `json:"description" binding:"omitempty,min=10"`
	Services          *[]string `json:"services"`
	WhatsApp          *string   `json:"whatsapp" binding:"omitempty,min=8,max=32"`
	YearsActive       *int      `json:"years_active" binding:"omitempty,min=0,max=99"`
	JobsDone          *int      `json:"jobs_done" binding:"omitempty,min=0"`
	PriceLabel        *string   `json:"price_label" binding:"omitempty,max=64"`
	ResponseTimeLabel *string   `json:"response_time_label" binding:"omitempty,max=64"`
	DistanceLabel     *string   `json:"distance_label" binding:"omitempty,max=64"`
	Coverage          *string   `json:"coverage" binding:"omitempty,oneof=bairro cidade regiao"`
	RadiusKM          *int      `json:"radius_km" binding:"omitempty,min=0,max=200"`
	Verified          *bool     `json:"verified"`
	Highlight         *bool     `json:"highlight"`
	Badge             *string   `json:"badge" binding:"omitempty,max=16"`
	DocumentType      *string   `json:"document_type" binding:"omitempty,oneof=cpf cnpj"`
	Document          *string   `json:"document"`
}

// ── Produtos ─────────────────────────────────────────────────────────────────

// AdminProductRequest is the body for POST /admin/products.
type AdminProductRequest struct {
	Name         string   `json:"name" binding:"required,min=2,max=255"`
	Category     string   `json:"category" binding:"required"`
	Price        float64  `json:"price" binding:"required,gt=0"`
	OldPrice     *float64 `json:"old_price"`
	SellerID     string   `json:"seller_id" binding:"omitempty,uuid"`
	Tag          string   `json:"tag" binding:"max=64"`
	Badge        string   `json:"badge" binding:"max=16"`
	Stock        string   `json:"stock" binding:"max=64"`
	Link         string   `json:"link" binding:"omitempty,max=500"`
	Manufacturer string   `json:"manufacturer" binding:"max=255"`
	Highlight    bool     `json:"highlight"`
}

// AdminProductPatch is the body for PATCH /admin/products/:id. All optional.
type AdminProductPatch struct {
	Name         *string  `json:"name" binding:"omitempty,min=2,max=255"`
	Category     *string  `json:"category"`
	Price        *float64 `json:"price" binding:"omitempty,gt=0"`
	OldPrice     *float64 `json:"old_price"`
	SellerID     *string  `json:"seller_id"`
	Tag          *string  `json:"tag" binding:"omitempty,max=64"`
	Badge        *string  `json:"badge" binding:"omitempty,max=16"`
	Stock        *string  `json:"stock" binding:"omitempty,max=64"`
	Link         *string  `json:"link" binding:"omitempty,max=500"`
	Manufacturer *string  `json:"manufacturer" binding:"omitempty,max=255"`
	Highlight    *bool    `json:"highlight"`
}
