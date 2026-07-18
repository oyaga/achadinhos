package dto

type AdminBlogPostRequest struct {
	Title       string `json:"title" binding:"required,min=3,max=255"`
	Slug        string `json:"slug" binding:"required,min=3,max=255"`
	Excerpt     string `json:"excerpt" binding:"max=600"`
	Format      string `json:"format" binding:"required,oneof=traditional presentation"`
	ContentHTML string `json:"content_html"`
	Published   bool   `json:"published"`
}

type AdminBlogPostPatch struct {
	Title       *string `json:"title" binding:"omitempty,min=3,max=255"`
	Slug        *string `json:"slug" binding:"omitempty,min=3,max=255"`
	Excerpt     *string `json:"excerpt" binding:"omitempty,max=600"`
	Format      *string `json:"format" binding:"omitempty,oneof=traditional presentation"`
	ContentHTML *string `json:"content_html"`
	Published   *bool   `json:"published"`
}
