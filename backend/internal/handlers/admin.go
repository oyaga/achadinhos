package handlers

import (
	"errors"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/achadinhos/backend/internal/auth"
	"github.com/achadinhos/backend/internal/dto"
	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// AdminHandler exposes the admin panel endpoints. Every route mounted under
// this handler must be protected by RequireAuth + RequireRole("admin").
type AdminHandler struct {
	db *gorm.DB
}

// NewAdminHandler builds an AdminHandler.
func NewAdminHandler(db *gorm.DB) *AdminHandler {
	return &AdminHandler{db: db}
}

const maxPortfolioPhotos = 5

// ── Síndicos (users) ─────────────────────────────────────────────────────────

// ListSindicos handles GET /admin/sindicos. Returns every user with
// role=sindico — name, email, phone, endereço e condomínio — for the admin
// control panel. Read-only.
func (h *AdminHandler) ListSindicos(c *gin.Context) {
	var users []models.User
	if err := h.db.WithContext(c.Request.Context()).
		Where("role = ?", models.RoleSindico).
		Order("created_at DESC").
		Find(&users).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list sindicos")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": users})
}

// ── Empresas (sellers) ───────────────────────────────────────────────────────

// adminSellerResponse expõe ao admin os campos internos de contrato que o
// modelo esconde das rotas públicas (json:"-" em models.Seller).
type adminSellerResponse struct {
	*models.Seller
	ContratoInicio        string `json:"contrato_inicio"`
	ContratoVigenciaMeses string `json:"contrato_vigencia_meses"`
	ValorMensal           string `json:"valor_mensal"`
	ValorAnual            string `json:"valor_anual"`
}

func adminSeller(s *models.Seller) adminSellerResponse {
	return adminSellerResponse{
		Seller:                s,
		ContratoInicio:        s.ContratoInicio,
		ContratoVigenciaMeses: s.ContratoVigenciaMeses,
		ValorMensal:           s.ValorMensal,
		ValorAnual:            s.ValorAnual,
	}
}

// resolveSellerCategories normaliza e valida as categorias da empresa: usa
// `ids` quando presente (a primeira é a principal), senão cai no `primary`
// único — compatibilidade com clientes que ainda mandam só category_id.
// Retorna as categorias carregadas do banco, na ordem enviada. Em erro, já
// escreve a resposta HTTP e retorna ok=false.
func (h *AdminHandler) resolveSellerCategories(c *gin.Context, primary string, ids []string) ([]models.Category, bool) {
	if len(ids) == 0 {
		ids = []string{primary}
	}
	seen := make(map[string]bool, len(ids))
	ordered := make([]string, 0, len(ids))
	for _, id := range ids {
		id = strings.TrimSpace(id)
		if id == "" || seen[id] {
			continue
		}
		seen[id] = true
		ordered = append(ordered, id)
	}
	if len(ordered) == 0 {
		JSONError(c, http.StatusBadRequest, "selecione ao menos uma categoria")
		return nil, false
	}
	var cats []models.Category
	if err := h.db.WithContext(c.Request.Context()).Where("id IN ?", ordered).Find(&cats).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to load categories")
		return nil, false
	}
	byID := make(map[string]models.Category, len(cats))
	for _, cat := range cats {
		byID[cat.ID] = cat
	}
	out := make([]models.Category, 0, len(ordered))
	for _, id := range ordered {
		cat, found := byID[id]
		if !found {
			JSONError(c, http.StatusBadRequest, "category does not exist: "+id)
			return nil, false
		}
		out = append(out, cat)
	}
	return out, true
}

// ListSellers handles GET /admin/sellers.
func (h *AdminHandler) ListSellers(c *gin.Context) {
	var sellers []models.Seller
	if err := h.db.WithContext(c.Request.Context()).
		Preload("Category").
		Preload("Categories").
		Preload("PortfolioPhotos", orderByPosition).
		Order("name ASC").
		Find(&sellers).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list sellers")
		return
	}
	out := make([]adminSellerResponse, 0, len(sellers))
	for i := range sellers {
		out = append(out, adminSeller(&sellers[i]))
	}
	c.JSON(http.StatusOK, gin.H{"data": out})
}

// CreateSeller handles POST /admin/sellers.
func (h *AdminHandler) CreateSeller(c *gin.Context) {
	var req dto.AdminSellerRequest
	if !BindJSON(c, &req) {
		return
	}
	cats, ok := h.resolveSellerCategories(c, req.CategoryID, req.CategoryIDs)
	if !ok {
		return
	}
	doc, ok := validateDocument(c, req.DocumentType, req.Document)
	if !ok {
		return
	}
	name := strings.TrimSpace(req.Name)
	s := &models.Seller{
		Name:         name,
		CategoryID:   cats[0].ID,
		Avatar:       firstRune(name),
		Description:  strings.TrimSpace(req.Description),
		WhatsApp:     strings.TrimSpace(req.WhatsApp),
		Link:         strings.TrimSpace(req.Link),
		Instagram:    strings.TrimSpace(req.Instagram),
		Facebook:     strings.TrimSpace(req.Facebook),
		TikTok:       strings.TrimSpace(req.TikTok),
		YouTube:      strings.TrimSpace(req.YouTube),
		Partner:      req.Partner,
		Highlight:    req.Highlight,
		DocumentType: req.DocumentType,
		Document:     doc,

		ContratoInicio:        strings.TrimSpace(req.ContratoInicio),
		ContratoVigenciaMeses: strings.TrimSpace(req.ContratoVigenciaMeses),
		ValorMensal:           strings.TrimSpace(req.ValorMensal),
		ValorAnual:            strings.TrimSpace(req.ValorAnual),

		Categories: cats,
	}
	if err := h.db.WithContext(c.Request.Context()).Create(s).Error; err != nil {
		JSONError(c, http.StatusConflict, "failed to create seller (name may already exist)")
		return
	}
	c.JSON(http.StatusCreated, adminSeller(s))
}

// UpdateSeller handles PATCH /admin/sellers/:id.
func (h *AdminHandler) UpdateSeller(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid seller id")
		return
	}
	var s models.Seller
	if err := h.db.WithContext(c.Request.Context()).First(&s, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "seller not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch seller")
		return
	}
	var req dto.AdminSellerPatch
	if !BindJSON(c, &req) {
		return
	}
	updates := map[string]any{}
	// Categorias: category_ids (lista completa, primeira = principal) tem
	// precedência; category_id sozinho vale como lista de um item. Em ambos os
	// casos a tabela de junção é substituída para refletir a lista.
	var newCats []models.Category
	if req.CategoryIDs != nil || req.CategoryID != nil {
		primary := s.CategoryID
		if req.CategoryID != nil {
			primary = *req.CategoryID
		}
		var ids []string
		if req.CategoryIDs != nil {
			ids = *req.CategoryIDs
		}
		cats, ok := h.resolveSellerCategories(c, primary, ids)
		if !ok {
			return
		}
		newCats = cats
		updates["category_id"] = cats[0].ID
	}
	if req.Name != nil {
		name := strings.TrimSpace(*req.Name)
		updates["name"] = name
		updates["avatar"] = firstRune(name)
	}
	if req.Description != nil {
		updates["description"] = strings.TrimSpace(*req.Description)
	}
	if req.WhatsApp != nil {
		updates["whats_app"] = strings.TrimSpace(*req.WhatsApp)
	}
	if req.Link != nil {
		updates["link"] = strings.TrimSpace(*req.Link)
	}
	if req.Instagram != nil {
		updates["instagram"] = strings.TrimSpace(*req.Instagram)
	}
	if req.Facebook != nil {
		updates["facebook"] = strings.TrimSpace(*req.Facebook)
	}
	if req.TikTok != nil {
		updates["tiktok"] = strings.TrimSpace(*req.TikTok)
	}
	if req.YouTube != nil {
		updates["youtube"] = strings.TrimSpace(*req.YouTube)
	}
	if req.Partner != nil {
		updates["partner"] = *req.Partner
	}
	if req.Highlight != nil {
		updates["highlight"] = *req.Highlight
	}
	if req.Document != nil || req.DocumentType != nil {
		docType := s.DocumentType
		if req.DocumentType != nil {
			docType = *req.DocumentType
		}
		raw := s.Document
		if req.Document != nil {
			raw = *req.Document
		}
		// Negócios cadastrados antes do campo documento existir não têm
		// CPF/CNPJ — permite salvá-los (e enviar fotos) sem um documento.
		if auth.StripDocument(raw) == "" {
			updates["document_type"] = ""
			updates["document"] = ""
		} else {
			doc, ok := validateDocument(c, docType, raw)
			if !ok {
				return
			}
			updates["document_type"] = docType
			updates["document"] = doc
		}
	}
	if req.ContratoInicio != nil {
		updates["contrato_inicio"] = strings.TrimSpace(*req.ContratoInicio)
	}
	if req.ContratoVigenciaMeses != nil {
		updates["contrato_vigencia_meses"] = strings.TrimSpace(*req.ContratoVigenciaMeses)
	}
	if req.ValorMensal != nil {
		updates["valor_mensal"] = strings.TrimSpace(*req.ValorMensal)
	}
	if req.ValorAnual != nil {
		updates["valor_anual"] = strings.TrimSpace(*req.ValorAnual)
	}
	if len(updates) > 0 {
		if err := h.db.WithContext(c.Request.Context()).Model(&s).Updates(updates).Error; err != nil {
			JSONError(c, http.StatusInternalServerError, "failed to update seller")
			return
		}
	}
	if newCats != nil {
		if err := h.db.WithContext(c.Request.Context()).Model(&s).
			Association("Categories").Replace(newCats); err != nil {
			JSONError(c, http.StatusInternalServerError, "failed to update seller categories")
			return
		}
		s.Categories = newCats
	}
	c.JSON(http.StatusOK, adminSeller(&s))
}

// DeleteSeller handles DELETE /admin/sellers/:id.
func (h *AdminHandler) DeleteSeller(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid seller id")
		return
	}
	var count int64
	if err := h.db.WithContext(c.Request.Context()).Model(&models.Product{}).Where("seller_id = ?", id).Count(&count).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to check products")
		return
	}
	if count > 0 {
		JSONError(c, http.StatusConflict, "empresa possui produtos vinculados — remova-os primeiro")
		return
	}
	res := h.db.WithContext(c.Request.Context()).Where("id = ?", id).Delete(&models.Seller{})
	if res.Error != nil {
		JSONError(c, http.StatusInternalServerError, "failed to delete seller")
		return
	}
	if res.RowsAffected == 0 {
		JSONError(c, http.StatusNotFound, "seller not found")
		return
	}
	c.Status(http.StatusNoContent)
}

// UploadSellerLogo handles POST /admin/sellers/:id/logo.
func (h *AdminHandler) UploadSellerLogo(c *gin.Context) {
	h.uploadLogo(c, &models.Seller{})
}

// UploadSellerPortfolio handles POST /admin/sellers/:id/portfolio.
func (h *AdminHandler) UploadSellerPortfolio(c *gin.Context) {
	h.uploadPortfolio(c, "seller", &models.Seller{})
}

// AddSellerPortfolioLink handles POST /admin/sellers/:id/portfolio/link.
func (h *AdminHandler) AddSellerPortfolioLink(c *gin.Context) {
	h.addPortfolioLink(c, "seller", &models.Seller{})
}

// DeleteSellerPortfolio handles DELETE /admin/sellers/:id/portfolio/:photo_id.
func (h *AdminHandler) DeleteSellerPortfolio(c *gin.Context) {
	h.deletePortfolio(c, "seller")
}

// ── Prestadores (providers) ──────────────────────────────────────────────────

// ListProviders handles GET /admin/providers.
func (h *AdminHandler) ListProviders(c *gin.Context) {
	var providers []models.Provider
	if err := h.db.WithContext(c.Request.Context()).
		Preload("Category").
		Preload("PortfolioPhotos", orderByPosition).
		Order("name ASC").
		Find(&providers).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list providers")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": providers})
}

// CreateProvider handles POST /admin/providers.
func (h *AdminHandler) CreateProvider(c *gin.Context) {
	var req dto.AdminProviderRequest
	if !BindJSON(c, &req) {
		return
	}
	if !h.categoryExists(c, req.CategoryID) {
		return
	}
	doc, ok := validateDocument(c, req.DocumentType, req.Document)
	if !ok {
		return
	}
	coverage := models.Coverage(req.Coverage)
	if coverage == "" {
		coverage = models.CoverageCidade
	}
	radius := req.RadiusKM
	if radius == 0 {
		radius = 10
	}
	name := strings.TrimSpace(req.Name)
	p := &models.Provider{
		Name:              name,
		CategoryID:        req.CategoryID,
		Avatar:            firstRune(name),
		Description:       strings.TrimSpace(req.Description),
		Services:          models.StringSlice(req.Services),
		WhatsApp:          strings.TrimSpace(req.WhatsApp),
		Instagram:         strings.TrimSpace(req.Instagram),
		Facebook:          strings.TrimSpace(req.Facebook),
		TikTok:            strings.TrimSpace(req.TikTok),
		YouTube:           strings.TrimSpace(req.YouTube),
		Site:              strings.TrimSpace(req.Site),
		YearsActive:       req.YearsActive,
		JobsDone:          req.JobsDone,
		PriceLabel:        strings.TrimSpace(req.PriceLabel),
		ResponseTimeLabel: strings.TrimSpace(req.ResponseTimeLabel),
		DistanceLabel:     strings.TrimSpace(req.DistanceLabel),
		Coverage:          coverage,
		RadiusKM:          radius,
		Verified:          req.Verified,
		Highlight:         req.Highlight,
		Badge:             strings.TrimSpace(req.Badge),
		DocumentType:      req.DocumentType,
		Document:          doc,
	}
	if err := h.db.WithContext(c.Request.Context()).Create(p).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to create provider")
		return
	}
	c.JSON(http.StatusCreated, p)
}

// UpdateProvider handles PATCH /admin/providers/:id.
func (h *AdminHandler) UpdateProvider(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid provider id")
		return
	}
	var p models.Provider
	if err := h.db.WithContext(c.Request.Context()).First(&p, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "provider not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch provider")
		return
	}
	var req dto.AdminProviderPatch
	if !BindJSON(c, &req) {
		return
	}
	updates := map[string]any{}
	if req.Name != nil {
		name := strings.TrimSpace(*req.Name)
		updates["name"] = name
		updates["avatar"] = firstRune(name)
	}
	if req.CategoryID != nil {
		if !h.categoryExists(c, *req.CategoryID) {
			return
		}
		updates["category_id"] = *req.CategoryID
	}
	if req.Description != nil {
		updates["description"] = strings.TrimSpace(*req.Description)
	}
	if req.Services != nil {
		updates["services"] = models.StringSlice(*req.Services)
	}
	if req.WhatsApp != nil {
		updates["whats_app"] = strings.TrimSpace(*req.WhatsApp)
	}
	if req.Instagram != nil {
		updates["instagram"] = strings.TrimSpace(*req.Instagram)
	}
	if req.Facebook != nil {
		updates["facebook"] = strings.TrimSpace(*req.Facebook)
	}
	if req.TikTok != nil {
		updates["tiktok"] = strings.TrimSpace(*req.TikTok)
	}
	if req.YouTube != nil {
		updates["youtube"] = strings.TrimSpace(*req.YouTube)
	}
	if req.Site != nil {
		updates["site"] = strings.TrimSpace(*req.Site)
	}
	if req.YearsActive != nil {
		updates["years_active"] = *req.YearsActive
	}
	if req.JobsDone != nil {
		updates["jobs_done"] = *req.JobsDone
	}
	if req.PriceLabel != nil {
		updates["price_label"] = strings.TrimSpace(*req.PriceLabel)
	}
	if req.ResponseTimeLabel != nil {
		updates["response_time_label"] = strings.TrimSpace(*req.ResponseTimeLabel)
	}
	if req.DistanceLabel != nil {
		updates["distance_label"] = strings.TrimSpace(*req.DistanceLabel)
	}
	if req.Coverage != nil {
		updates["coverage"] = *req.Coverage
	}
	if req.RadiusKM != nil {
		updates["radius_km"] = *req.RadiusKM
	}
	if req.Verified != nil {
		updates["verified"] = *req.Verified
	}
	if req.Highlight != nil {
		updates["highlight"] = *req.Highlight
	}
	if req.Badge != nil {
		updates["badge"] = strings.TrimSpace(*req.Badge)
	}
	if req.Document != nil || req.DocumentType != nil {
		docType := p.DocumentType
		if req.DocumentType != nil {
			docType = *req.DocumentType
		}
		raw := p.Document
		if req.Document != nil {
			raw = *req.Document
		}
		// Negócios cadastrados antes do campo documento existir não têm
		// CPF/CNPJ — permite salvá-los (e enviar fotos) sem um documento.
		if auth.StripDocument(raw) == "" {
			updates["document_type"] = ""
			updates["document"] = ""
		} else {
			doc, ok := validateDocument(c, docType, raw)
			if !ok {
				return
			}
			updates["document_type"] = docType
			updates["document"] = doc
		}
	}
	if len(updates) > 0 {
		if err := h.db.WithContext(c.Request.Context()).Model(&p).Updates(updates).Error; err != nil {
			JSONError(c, http.StatusInternalServerError, "failed to update provider")
			return
		}
	}
	c.JSON(http.StatusOK, &p)
}

// DeleteProvider handles DELETE /admin/providers/:id.
func (h *AdminHandler) DeleteProvider(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid provider id")
		return
	}
	res := h.db.WithContext(c.Request.Context()).Where("id = ?", id).Delete(&models.Provider{})
	if res.Error != nil {
		JSONError(c, http.StatusInternalServerError, "failed to delete provider")
		return
	}
	if res.RowsAffected == 0 {
		JSONError(c, http.StatusNotFound, "provider not found")
		return
	}
	c.Status(http.StatusNoContent)
}

// UploadProviderLogo handles POST /admin/providers/:id/logo.
func (h *AdminHandler) UploadProviderLogo(c *gin.Context) {
	h.uploadLogo(c, &models.Provider{})
}

// UploadProviderPortfolio handles POST /admin/providers/:id/portfolio.
func (h *AdminHandler) UploadProviderPortfolio(c *gin.Context) {
	h.uploadPortfolio(c, "provider", &models.Provider{})
}

// AddProviderPortfolioLink handles POST /admin/providers/:id/portfolio/link.
func (h *AdminHandler) AddProviderPortfolioLink(c *gin.Context) {
	h.addPortfolioLink(c, "provider", &models.Provider{})
}

// DeleteProviderPortfolio handles DELETE /admin/providers/:id/portfolio/:photo_id.
func (h *AdminHandler) DeleteProviderPortfolio(c *gin.Context) {
	h.deletePortfolio(c, "provider")
}

// ── Conversão empresa ⇄ afiliado ─────────────────────────────────────────────

// ConvertSellerToProvider handles POST /admin/sellers/:id/convert. It transforms
// an empresa (seller) into an afiliado/prestador (provider), preserving the logo
// and portfolio. Ratings and reviews do not carry over (they live in separate
// tables), so the new provider starts with a clean rating.
func (h *AdminHandler) ConvertSellerToProvider(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid seller id")
		return
	}
	var req dto.AdminProviderRequest
	if !BindJSON(c, &req) {
		return
	}
	if !h.categoryExists(c, req.CategoryID) {
		return
	}
	doc, ok := validateDocument(c, req.DocumentType, req.Document)
	if !ok {
		return
	}

	var seller models.Seller
	if err := h.db.WithContext(c.Request.Context()).First(&seller, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "seller not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch seller")
		return
	}

	// Empresas com produtos vinculados não podem ser convertidas — os produtos
	// dependem da empresa. O admin deve reatribuí-los ou removê-los antes.
	var productCount int64
	if err := h.db.WithContext(c.Request.Context()).Model(&models.Product{}).
		Where("seller_id = ?", id).Count(&productCount).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to check products")
		return
	}
	if productCount > 0 {
		JSONError(c, http.StatusConflict, "empresa possui produtos vinculados — remova-os antes de converter em afiliado")
		return
	}

	coverage := models.Coverage(req.Coverage)
	if coverage == "" {
		coverage = models.CoverageCidade
	}
	radius := req.RadiusKM
	if radius == 0 {
		radius = 10
	}
	name := strings.TrimSpace(req.Name)
	p := &models.Provider{
		Name:              name,
		CategoryID:        req.CategoryID,
		Avatar:            firstRune(name),
		LogoURL:           seller.LogoURL,
		Description:       strings.TrimSpace(req.Description),
		Services:          models.StringSlice(req.Services),
		WhatsApp:          strings.TrimSpace(req.WhatsApp),
		Instagram:         strings.TrimSpace(req.Instagram),
		Facebook:          strings.TrimSpace(req.Facebook),
		TikTok:            strings.TrimSpace(req.TikTok),
		YouTube:           strings.TrimSpace(req.YouTube),
		Site:              strings.TrimSpace(req.Site),
		YearsActive:       req.YearsActive,
		JobsDone:          req.JobsDone,
		PriceLabel:        strings.TrimSpace(req.PriceLabel),
		ResponseTimeLabel: strings.TrimSpace(req.ResponseTimeLabel),
		DistanceLabel:     strings.TrimSpace(req.DistanceLabel),
		Coverage:          coverage,
		RadiusKM:          radius,
		Verified:          req.Verified,
		Highlight:         req.Highlight,
		Badge:             strings.TrimSpace(req.Badge),
		DocumentType:      req.DocumentType,
		Document:          doc,
	}

	if err := h.convert(c, p, "seller", "provider", id); err != nil {
		return
	}
	c.JSON(http.StatusOK, p)
}

// ConvertProviderToSeller handles POST /admin/providers/:id/convert. It transforms
// an afiliado/prestador (provider) into an empresa (seller), preserving the logo
// and portfolio. Ratings and reviews do not carry over.
func (h *AdminHandler) ConvertProviderToSeller(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid provider id")
		return
	}
	var req dto.AdminSellerRequest
	if !BindJSON(c, &req) {
		return
	}
	cats, ok := h.resolveSellerCategories(c, req.CategoryID, req.CategoryIDs)
	if !ok {
		return
	}
	doc, ok := validateDocument(c, req.DocumentType, req.Document)
	if !ok {
		return
	}

	var provider models.Provider
	if err := h.db.WithContext(c.Request.Context()).First(&provider, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "provider not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch provider")
		return
	}

	name := strings.TrimSpace(req.Name)
	s := &models.Seller{
		Name:         name,
		CategoryID:   cats[0].ID,
		Avatar:       firstRune(name),
		LogoURL:      provider.LogoURL,
		Description:  strings.TrimSpace(req.Description),
		WhatsApp:     strings.TrimSpace(req.WhatsApp),
		Link:         strings.TrimSpace(req.Link),
		Instagram:    strings.TrimSpace(req.Instagram),
		Facebook:     strings.TrimSpace(req.Facebook),
		TikTok:       strings.TrimSpace(req.TikTok),
		YouTube:      strings.TrimSpace(req.YouTube),
		Partner:      req.Partner,
		Highlight:    req.Highlight,
		DocumentType: req.DocumentType,
		Document:     doc,

		ContratoInicio:        strings.TrimSpace(req.ContratoInicio),
		ContratoVigenciaMeses: strings.TrimSpace(req.ContratoVigenciaMeses),
		ValorMensal:           strings.TrimSpace(req.ValorMensal),
		ValorAnual:            strings.TrimSpace(req.ValorAnual),

		Categories: cats,
	}

	if err := h.convert(c, s, "provider", "seller", id); err != nil {
		return
	}
	c.JSON(http.StatusOK, adminSeller(s))
}

// convert persists the new record, re-points the portfolio photos from the old
// owner to it and hard-deletes the original — all in one transaction. The hard
// delete frees the original's (unique) name and leaves no stale row behind. On
// error it writes the HTTP response and returns the error so the caller stops.
func (h *AdminHandler) convert(c *gin.Context, newRecord any, fromType, toType string, oldID uuid.UUID) error {
	err := h.db.WithContext(c.Request.Context()).Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(newRecord).Error; err != nil {
			return err
		}
		newID := idOf(newRecord)
		if err := tx.Model(&models.PortfolioPhoto{}).
			Where("owner_type = ? AND owner_id = ?", fromType, oldID).
			Updates(map[string]any{"owner_type": toType, "owner_id": newID}).Error; err != nil {
			return err
		}
		if fromType == "seller" {
			return tx.Unscoped().Delete(&models.Seller{}, "id = ?", oldID).Error
		}
		return tx.Unscoped().Delete(&models.Provider{}, "id = ?", oldID).Error
	})
	if err != nil {
		// O nome da empresa é único — uma colisão é o erro mais provável aqui.
		JSONError(c, http.StatusConflict, "não foi possível converter o cadastro (o nome pode já existir)")
		return err
	}
	return nil
}

// idOf returns the primary key of a *Seller or *Provider after creation.
func idOf(record any) uuid.UUID {
	switch r := record.(type) {
	case *models.Seller:
		return r.ID
	case *models.Provider:
		return r.ID
	default:
		return uuid.Nil
	}
}

// ── Produtos ─────────────────────────────────────────────────────────────────

// ListProducts handles GET /admin/products.
func (h *AdminHandler) ListProducts(c *gin.Context) {
	var products []models.Product
	if err := h.db.WithContext(c.Request.Context()).
		Preload("Seller").
		Preload("Photos", orderByPosition).
		Order("created_at DESC").
		Find(&products).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list products")
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": products})
}

// CreateProduct handles POST /admin/products.
func (h *AdminHandler) CreateProduct(c *gin.Context) {
	var req dto.AdminProductRequest
	if !BindJSON(c, &req) {
		return
	}
	stock := strings.TrimSpace(req.Stock)
	if stock == "" {
		stock = "Em estoque"
	}
	p := &models.Product{
		ID:           uuid.New().String(),
		Name:         strings.TrimSpace(req.Name),
		Category:     strings.ToLower(strings.TrimSpace(req.Category)),
		Price:        req.Price,
		OldPrice:     req.OldPrice,
		Tag:          strings.TrimSpace(req.Tag),
		Badge:        strings.TrimSpace(req.Badge),
		Stock:        stock,
		LinkOverride: strings.TrimSpace(req.Link),
		Manufacturer: strings.TrimSpace(req.Manufacturer),
		Description:  strings.TrimSpace(req.Description),
		Highlight:    req.Highlight,
	}
	// Seller is optional. When provided, validate it exists and copy the
	// WhatsApp as the default contact for the product.
	if req.SellerID != "" {
		sellerID, err := uuid.Parse(req.SellerID)
		if err != nil {
			JSONError(c, http.StatusBadRequest, "invalid seller_id")
			return
		}
		var seller models.Seller
		if err := h.db.WithContext(c.Request.Context()).First(&seller, "id = ?", sellerID).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				JSONError(c, http.StatusBadRequest, "unknown seller_id")
				return
			}
			JSONError(c, http.StatusInternalServerError, "failed to validate seller")
			return
		}
		p.SellerID = &sellerID
		p.WhatsAppOverride = seller.WhatsApp
	}
	if err := h.db.WithContext(c.Request.Context()).Create(p).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to create product")
		return
	}
	c.JSON(http.StatusCreated, p)
}

// UpdateProduct handles PATCH /admin/products/:id.
func (h *AdminHandler) UpdateProduct(c *gin.Context) {
	id := c.Param("id")
	var p models.Product
	if err := h.db.WithContext(c.Request.Context()).First(&p, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "product not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch product")
		return
	}
	var req dto.AdminProductPatch
	if !BindJSON(c, &req) {
		return
	}
	updates := map[string]any{}
	if req.Name != nil {
		updates["name"] = strings.TrimSpace(*req.Name)
	}
	if req.Category != nil {
		updates["category"] = strings.ToLower(strings.TrimSpace(*req.Category))
	}
	if req.Price != nil {
		updates["price"] = *req.Price
	}
	if req.OldPrice != nil {
		updates["old_price"] = req.OldPrice
	}
	if req.SellerID != nil {
		trimmed := strings.TrimSpace(*req.SellerID)
		if trimmed == "" {
			// Clearing the seller link — published as "Achadinhos do Condomínio".
			updates["seller_id"] = nil
			updates["whats_app_override"] = ""
		} else {
			sellerID, err := uuid.Parse(trimmed)
			if err != nil {
				JSONError(c, http.StatusBadRequest, "invalid seller_id")
				return
			}
			var seller models.Seller
			if err := h.db.WithContext(c.Request.Context()).First(&seller, "id = ?", sellerID).Error; err != nil {
				JSONError(c, http.StatusBadRequest, "unknown seller_id")
				return
			}
			updates["seller_id"] = sellerID
			updates["whats_app_override"] = seller.WhatsApp
		}
	}
	if req.Tag != nil {
		updates["tag"] = strings.TrimSpace(*req.Tag)
	}
	if req.Badge != nil {
		updates["badge"] = strings.TrimSpace(*req.Badge)
	}
	if req.Stock != nil {
		updates["stock"] = strings.TrimSpace(*req.Stock)
	}
	if req.Link != nil {
		updates["link_override"] = strings.TrimSpace(*req.Link)
	}
	if req.Manufacturer != nil {
		updates["manufacturer"] = strings.TrimSpace(*req.Manufacturer)
	}
	if req.Description != nil {
		updates["description"] = strings.TrimSpace(*req.Description)
	}
	if req.Highlight != nil {
		updates["highlight"] = *req.Highlight
	}
	if len(updates) > 0 {
		if err := h.db.WithContext(c.Request.Context()).Model(&p).Updates(updates).Error; err != nil {
			JSONError(c, http.StatusInternalServerError, "failed to update product")
			return
		}
	}
	c.JSON(http.StatusOK, &p)
}

// DeleteProduct handles DELETE /admin/products/:id.
func (h *AdminHandler) DeleteProduct(c *gin.Context) {
	id := c.Param("id")
	res := h.db.WithContext(c.Request.Context()).Where("id = ?", id).Delete(&models.Product{})
	if res.Error != nil {
		JSONError(c, http.StatusInternalServerError, "failed to delete product")
		return
	}
	if res.RowsAffected == 0 {
		JSONError(c, http.StatusNotFound, "product not found")
		return
	}
	c.Status(http.StatusNoContent)
}

// UploadProductPhoto handles POST /admin/products/:id/photos.
func (h *AdminHandler) UploadProductPhoto(c *gin.Context) {
	pid := c.Param("id")
	var p models.Product
	if err := h.db.WithContext(c.Request.Context()).First(&p, "id = ?", pid).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "product not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch product")
		return
	}
	var count int64
	if err := h.db.WithContext(c.Request.Context()).
		Model(&models.ProductPhoto{}).
		Where("product_id = ?", pid).
		Count(&count).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to count photos")
		return
	}
	if count >= maxPortfolioPhotos {
		JSONError(c, http.StatusBadRequest, "máximo de 5 fotos por produto")
		return
	}
	url, ok := saveUploadedFile(c, "products", false, false)
	if !ok {
		return
	}
	photo := &models.ProductPhoto{ProductID: pid, URL: url, Position: int(count)}
	if err := h.db.WithContext(c.Request.Context()).Create(photo).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to save photo record")
		return
	}
	c.JSON(http.StatusCreated, photo)
}

// DeleteProductPhoto handles DELETE /admin/products/:id/photos/:photo_id.
func (h *AdminHandler) DeleteProductPhoto(c *gin.Context) {
	pid := c.Param("id")
	photoID := c.Param("photo_id")
	var photo models.ProductPhoto
	if err := h.db.WithContext(c.Request.Context()).
		Where("id = ? AND product_id = ?", photoID, pid).
		First(&photo).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "photo not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch photo")
		return
	}
	if err := h.db.WithContext(c.Request.Context()).Delete(&photo).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to delete photo")
		return
	}
	removeUploadedFile(photo.URL)
	c.Status(http.StatusNoContent)
}

// ── Shared logo / portfolio handlers ─────────────────────────────────────────

// uploadLogo saves an uploaded image and sets logo_url on the given record
// (model must be a *models.Seller or *models.Provider).
func (h *AdminHandler) uploadLogo(c *gin.Context, model any) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	res := h.db.WithContext(c.Request.Context()).Model(model).Where("id = ?", id)
	var count int64
	if err := res.Count(&count).Error; err != nil || count == 0 {
		JSONError(c, http.StatusNotFound, "registro não encontrado")
		return
	}
	url, ok := saveUploadedFile(c, "logos", false, false)
	if !ok {
		return
	}
	if err := h.db.WithContext(c.Request.Context()).Model(model).Where("id = ?", id).
		Update("logo_url", url).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to save logo")
		return
	}
	c.JSON(http.StatusOK, gin.H{"logo_url": url})
}

// uploadPortfolio saves an uploaded image as a portfolio photo for the owner.
func (h *AdminHandler) uploadPortfolio(c *gin.Context, ownerType string, model any) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	var count int64
	if err := h.db.WithContext(c.Request.Context()).Model(model).Where("id = ?", id).
		Count(&count).Error; err != nil || count == 0 {
		JSONError(c, http.StatusNotFound, "registro não encontrado")
		return
	}
	var photoCount int64
	if err := h.db.WithContext(c.Request.Context()).Model(&models.PortfolioPhoto{}).
		Where("owner_type = ? AND owner_id = ?", ownerType, id).
		Count(&photoCount).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to count photos")
		return
	}
	if photoCount >= maxPortfolioPhotos {
		JSONError(c, http.StatusBadRequest, "máximo de 5 itens no portfólio")
		return
	}
	url, ok := saveUploadedFile(c, "portfolio", true, true)
	if !ok {
		return
	}
	photo := &models.PortfolioPhoto{
		OwnerType: ownerType,
		OwnerID:   id,
		URL:       url,
		Position:  int(photoCount),
	}
	if err := h.db.WithContext(c.Request.Context()).Create(photo).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to save photo record")
		return
	}
	c.JSON(http.StatusCreated, photo)
}

// addPortfolioLink attaches a video link (YouTube/Vimeo) to the owner's
// portfolio as a PortfolioPhoto whose URL is the external link. The frontend
// detects the media type from the URL, so no extra column is needed.
func (h *AdminHandler) addPortfolioLink(c *gin.Context, ownerType string, model any) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	var req dto.PortfolioLinkRequest
	if !BindJSON(c, &req) {
		return
	}
	link := strings.TrimSpace(req.URL)
	if !isVideoLinkURL(link) {
		JSONError(c, http.StatusBadRequest, "informe um link de vídeo do YouTube ou Vimeo")
		return
	}
	var count int64
	if err := h.db.WithContext(c.Request.Context()).Model(model).Where("id = ?", id).
		Count(&count).Error; err != nil || count == 0 {
		JSONError(c, http.StatusNotFound, "registro não encontrado")
		return
	}
	var photoCount int64
	if err := h.db.WithContext(c.Request.Context()).Model(&models.PortfolioPhoto{}).
		Where("owner_type = ? AND owner_id = ?", ownerType, id).
		Count(&photoCount).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to count photos")
		return
	}
	if photoCount >= maxPortfolioPhotos {
		JSONError(c, http.StatusBadRequest, "máximo de 5 itens no portfólio")
		return
	}
	photo := &models.PortfolioPhoto{
		OwnerType: ownerType,
		OwnerID:   id,
		URL:       link,
		Position:  int(photoCount),
	}
	if err := h.db.WithContext(c.Request.Context()).Create(photo).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to save link")
		return
	}
	c.JSON(http.StatusCreated, photo)
}

// isVideoLinkURL reports whether url points to a supported video host.
func isVideoLinkURL(url string) bool {
	u := strings.ToLower(url)
	return strings.Contains(u, "youtube.com/") ||
		strings.Contains(u, "youtu.be/") ||
		strings.Contains(u, "vimeo.com/")
}

// deletePortfolio removes a portfolio photo.
func (h *AdminHandler) deletePortfolio(c *gin.Context, ownerType string) {
	ownerID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid id")
		return
	}
	photoID, err := uuid.Parse(c.Param("photo_id"))
	if err != nil {
		JSONError(c, http.StatusBadRequest, "invalid photo id")
		return
	}
	var photo models.PortfolioPhoto
	if err := h.db.WithContext(c.Request.Context()).
		Where("id = ? AND owner_type = ? AND owner_id = ?", photoID, ownerType, ownerID).
		First(&photo).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "photo not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch photo")
		return
	}
	if err := h.db.WithContext(c.Request.Context()).Delete(&photo).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to delete photo")
		return
	}
	removeUploadedFile(photo.URL)
	c.Status(http.StatusNoContent)
}

// ── helpers ──────────────────────────────────────────────────────────────────

// orderByPosition is a GORM preload scope that orders photos by position.
func orderByPosition(db *gorm.DB) *gorm.DB {
	return db.Order("position ASC")
}

// validateDocument strips and validates a CPF/CNPJ. On failure it writes a 422
// response and returns ok=false.
func validateDocument(c *gin.Context, docType, raw string) (string, bool) {
	doc := auth.StripDocument(raw)
	if err := auth.ValidateDocument(strings.ToLower(strings.TrimSpace(docType)), doc); err != nil {
		c.AbortWithStatusJSON(http.StatusUnprocessableEntity, ErrorResponse{
			Error:   "validation_error",
			Code:    http.StatusUnprocessableEntity,
			Details: map[string]string{"document": "invalid"},
		})
		return "", false
	}
	return doc, true
}

// saveUploadedFile reads the "file" multipart field, validates it and stores it
// under ./uploads/<subdir>/. Images (jpg/png/webp/gif) are always accepted, up
// to 5 MB. When allowPDF is true, PDF files are accepted too, up to 20 MB —
// used by the portfolio so businesses can upload presentation decks. When
// allowVideo is true, mp4/webm/mov are accepted up to 50 MB.
// Returns the public URL path. On failure it writes the error and returns false.
func saveUploadedFile(c *gin.Context, subdir string, allowPDF, allowVideo bool) (string, bool) {
	fileHeader, err := c.FormFile("file")
	if err != nil {
		JSONError(c, http.StatusBadRequest, "campo 'file' ausente ou inválido")
		return "", false
	}
	allowed := map[string]string{
		"image/jpeg": ".jpg",
		"image/png":  ".png",
		"image/webp": ".webp",
		"image/gif":  ".gif",
	}
	if allowPDF {
		allowed["application/pdf"] = ".pdf"
	}
	videoTypes := map[string]bool{}
	if allowVideo {
		allowed["video/mp4"] = ".mp4"
		allowed["video/webm"] = ".webm"
		allowed["video/quicktime"] = ".mov"
		videoTypes["video/mp4"] = true
		videoTypes["video/webm"] = true
		videoTypes["video/quicktime"] = true
	}
	contentType := fileHeader.Header.Get("Content-Type")
	ext, ok := allowed[contentType]
	if !ok {
		msg := "tipo de arquivo não permitido (use jpg, png, webp)"
		switch {
		case allowPDF && allowVideo:
			msg = "tipo de arquivo não permitido (use jpg, png, webp, pdf ou vídeo mp4/webm/mov)"
		case allowPDF:
			msg = "tipo de arquivo não permitido (use jpg, png, webp ou pdf)"
		case allowVideo:
			msg = "tipo de arquivo não permitido (use jpg, png, webp ou vídeo mp4/webm/mov)"
		}
		JSONError(c, http.StatusBadRequest, msg)
		return "", false
	}
	maxSize := int64(5 << 20) // 5 MB para imagens
	sizeMsg := "arquivo muito grande (máx 5 MB)"
	switch {
	case contentType == "application/pdf":
		maxSize = 20 << 20 // 20 MB para PDFs (apresentações)
		sizeMsg = "arquivo muito grande (máx 20 MB)"
	case videoTypes[contentType]:
		maxSize = 50 << 20 // 50 MB para vídeos curtos
		sizeMsg = "vídeo muito grande (máx 50 MB)"
	}
	if fileHeader.Size > maxSize {
		JSONError(c, http.StatusBadRequest, sizeMsg)
		return "", false
	}
	if origExt := filepath.Ext(fileHeader.Filename); origExt != "" {
		ext = strings.ToLower(origExt)
	}

	filename := uuid.New().String() + ext
	dir := filepath.Join(".", "uploads", subdir)
	if err := os.MkdirAll(dir, 0o755); err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to create upload directory")
		return "", false
	}
	destPath := filepath.Join(dir, filename)

	src, err := fileHeader.Open()
	if err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to open uploaded file")
		return "", false
	}
	defer src.Close()

	dst, err := os.Create(destPath)
	if err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to save file")
		return "", false
	}
	defer dst.Close()

	if _, err := io.Copy(dst, src); err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to write file")
		return "", false
	}
	return "/uploads/" + subdir + "/" + filename, true
}

// removeUploadedFile best-effort deletes a file referenced by its URL path.
func removeUploadedFile(url string) {
	if strings.HasPrefix(url, "/uploads/") {
		_ = os.Remove(filepath.Join(".", url))
	}
}

// categoryExists verifies the category exists; on failure it writes the error
// response and returns false.
func (h *AdminHandler) categoryExists(c *gin.Context, id string) bool {
	var cat models.Category
	if err := h.db.WithContext(c.Request.Context()).First(&cat, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusBadRequest, "unknown category_id")
			return false
		}
		JSONError(c, http.StatusInternalServerError, "failed to validate category")
		return false
	}
	return true
}

// firstRune returns the first rune of s, used as a fallback avatar initial.
func firstRune(s string) string {
	for _, r := range s {
		return string(r)
	}
	return ""
}
