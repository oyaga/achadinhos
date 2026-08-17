package handlers

import (
	"errors"
	"net/http"

	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// CategoriesHandler exposes category endpoints.
type CategoriesHandler struct {
	db *gorm.DB
}

// NewCategoriesHandler builds a CategoriesHandler.
func NewCategoriesHandler(db *gorm.DB) *CategoriesHandler {
	return &CategoriesHandler{db: db}
}

type categoryWithCount struct {
	models.Category
	// Count é o total de negócios da categoria: afiliados (providers) +
	// empresas (sellers, contando também as categorias secundárias).
	ProviderCount int64 `json:"count"`
}

// List handles GET /categories.
func (h *CategoriesHandler) List(c *gin.Context) {
	var cats []models.Category
	if err := h.db.WithContext(c.Request.Context()).Order("sort_order ASC, label ASC").Find(&cats).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to list categories")
		return
	}

	// Count providers per category in a single grouped query.
	type catCount struct {
		CategoryID string
		Count      int64
	}
	var counts []catCount
	if err := h.db.WithContext(c.Request.Context()).
		Model(&models.Provider{}).
		Select("category_id, count(*) as count").
		Group("category_id").
		Scan(&counts).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to count providers")
		return
	}
	countMap := make(map[string]int64, len(counts))
	for _, c := range counts {
		countMap[c.CategoryID] = c.Count
	}

	// Empresas por categoria, via tabela de junção (cobre principal +
	// secundárias); exclui empresas soft-deletadas.
	var sellerCounts []catCount
	if err := h.db.WithContext(c.Request.Context()).
		Table("seller_categories sc").
		Joins("JOIN sellers s ON s.id = sc.seller_id AND s.deleted_at IS NULL").
		Select("sc.category_id, count(DISTINCT sc.seller_id) as count").
		Group("sc.category_id").
		Scan(&sellerCounts).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to count sellers")
		return
	}
	for _, sc := range sellerCounts {
		countMap[sc.CategoryID] += sc.Count
	}

	out := make([]categoryWithCount, 0, len(cats))
	for _, cat := range cats {
		out = append(out, categoryWithCount{Category: cat, ProviderCount: countMap[cat.ID]})
	}
	c.JSON(http.StatusOK, out)
}

// Get handles GET /categories/:id.
func (h *CategoriesHandler) Get(c *gin.Context) {
	id := c.Param("id")
	var cat models.Category
	if err := h.db.WithContext(c.Request.Context()).First(&cat, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			JSONError(c, http.StatusNotFound, "category not found")
			return
		}
		JSONError(c, http.StatusInternalServerError, "failed to fetch category")
		return
	}
	var count int64
	if err := h.db.WithContext(c.Request.Context()).
		Model(&models.Provider{}).
		Where("category_id = ?", id).
		Count(&count).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to count providers")
		return
	}
	var sellerCount int64
	if err := h.db.WithContext(c.Request.Context()).
		Table("seller_categories sc").
		Joins("JOIN sellers s ON s.id = sc.seller_id AND s.deleted_at IS NULL").
		Where("sc.category_id = ?", id).
		Select("count(DISTINCT sc.seller_id)").
		Scan(&sellerCount).Error; err != nil {
		JSONError(c, http.StatusInternalServerError, "failed to count sellers")
		return
	}
	c.JSON(http.StatusOK, categoryWithCount{Category: cat, ProviderCount: count + sellerCount})
}
