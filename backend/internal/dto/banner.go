package dto

// ── Anúncios (banners do slide principal e do widget de eventos) ─────────────

// AdminBannerRequest is the body for POST /admin/banners. A imagem sobe num
// segundo passo via POST /admin/banners/:id/image (padrão dos eventos).
type AdminBannerRequest struct {
	Title     string `json:"title" binding:"max=255"`
	Subtitle  string `json:"subtitle" binding:"max=500"`
	LinkURL   string `json:"link_url" binding:"max=1000"`
	Placement string `json:"placement" binding:"required,oneof=hero eventos"`
	Position  int    `json:"position"`
	Active    *bool  `json:"active"`
}

// AdminBannerPatch is the body for PATCH /admin/banners/:id. All optional.
type AdminBannerPatch struct {
	Title     *string `json:"title" binding:"omitempty,max=255"`
	Subtitle  *string `json:"subtitle" binding:"omitempty,max=500"`
	LinkURL   *string `json:"link_url" binding:"omitempty,max=1000"`
	Placement *string `json:"placement" binding:"omitempty,oneof=hero eventos"`
	Position  *int    `json:"position"`
	Active    *bool   `json:"active"`
}
