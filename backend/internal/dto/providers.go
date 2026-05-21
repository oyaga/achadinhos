package dto

// CreateProviderRequest reflects the 5-step wizard from the frontend.
type CreateProviderRequest struct {
	Name              string   `json:"name" binding:"required,min=2,max=255"`
	CategoryID        string   `json:"category_id" binding:"required"`
	Description       string   `json:"description" binding:"required,min=10"`
	Services          []string `json:"services" binding:"required,min=1,dive,min=1,max=128"`
	YearsActive       int      `json:"years_active" binding:"min=0,max=99"`
	JobsDone          int      `json:"jobs_done" binding:"min=0"`
	WhatsApp          string   `json:"whatsapp" binding:"required,min=8,max=32"`
	PriceLabel        string   `json:"price_label" binding:"required,max=64"`
	ResponseTimeLabel string   `json:"response_time_label" binding:"required,max=64"`
	DistanceLabel     string   `json:"distance_label" binding:"max=64"`
	Coverage          string   `json:"coverage" binding:"required,oneof=bairro cidade regiao"`
	RadiusKM          int      `json:"radius_km" binding:"min=1,max=200"`
	Avatar            string   `json:"avatar" binding:"max=8"`
}

// CreateReviewRequest is POST /providers/:id/reviews body.
type CreateReviewRequest struct {
	Rating int      `json:"rating" binding:"required,min=1,max=5"`
	Text   string   `json:"text" binding:"required,min=5,max=2000"`
	Tags   []string `json:"tags" binding:"omitempty,dive,min=1,max=64"`
}

// FavoriteRequest is the POST/DELETE /favorites body.
type FavoriteRequest struct {
	TargetType string `json:"target_type" binding:"required,oneof=provider product"`
	TargetID   string `json:"target_id" binding:"required,min=1,max=64"`
}
