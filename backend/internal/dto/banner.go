package dto

// ── Anúncios (banners do slide principal e do widget de eventos) ─────────────

// AdminBannerRequest is the body for POST /admin/banners. A imagem sobe num
// segundo passo via POST /admin/banners/:id/image (padrão dos eventos).
// StartsAt/EndsAt são "YYYY-MM-DD"; vazio = sem limite.
type AdminBannerRequest struct {
	Title     string `json:"title" binding:"max=255"`
	Subtitle  string `json:"subtitle" binding:"max=500"`
	LinkURL   string `json:"link_url" binding:"max=1000"`
	Placement string `json:"placement" binding:"required,oneof=hero eventos"`
	Position  int    `json:"position"`
	Active    *bool  `json:"active"`
	StartsAt  string `json:"starts_at" binding:"max=10"`
	EndsAt    string `json:"ends_at" binding:"max=10"`
}

// AdminBannerPatch is the body for PATCH /admin/banners/:id. All optional.
// StartsAt/EndsAt: ponteiro nil = não mexe; string vazia = limpa a data.
type AdminBannerPatch struct {
	Title     *string `json:"title" binding:"omitempty,max=255"`
	Subtitle  *string `json:"subtitle" binding:"omitempty,max=500"`
	LinkURL   *string `json:"link_url" binding:"omitempty,max=1000"`
	Placement *string `json:"placement" binding:"omitempty,oneof=hero eventos"`
	Position  *int    `json:"position"`
	Active    *bool   `json:"active"`
	StartsAt  *string `json:"starts_at" binding:"omitempty,max=10"`
	EndsAt    *string `json:"ends_at" binding:"omitempty,max=10"`
}

// AdminBannerReorder is the body for PUT /admin/banners/reorder: a nova ordem
// (ids na sequência desejada). Positions são regravadas pelo índice.
type AdminBannerReorder struct {
	IDs []string `json:"ids" binding:"required,min=1"`
}
