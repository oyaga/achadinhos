package dto

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
