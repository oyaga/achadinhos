package handlers

import (
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/achadinhos/backend/internal/dto"
	"github.com/achadinhos/backend/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type BlogHandler struct{ db *gorm.DB }

func NewBlogHandler(db *gorm.DB) *BlogHandler { return &BlogHandler{db: db} }

var blogSlugRE = regexp.MustCompile(`^[a-z0-9]+(?:-[a-z0-9]+)*$`)

func validBlogSlug(c *gin.Context, slug string) bool {
	if !blogSlugRE.MatchString(slug) {
		JSONError(c, http.StatusBadRequest, "slug inválido; use letras minúsculas, números e hífens")
		return false
	}
	return true
}

func (h *BlogHandler) List(c *gin.Context) {
	var posts []models.BlogPost
	if err := h.db.WithContext(c.Request.Context()).Where("published = ?", true).
		Order("published_at DESC, created_at DESC").Find(&posts).Error; err != nil {
		JSONError(c, 500, "failed to list blog posts")
		return
	}
	c.JSON(200, gin.H{"data": posts})
}

func (h *BlogHandler) Get(c *gin.Context) {
	var post models.BlogPost
	if err := h.db.WithContext(c.Request.Context()).Where("slug = ? AND published = ?", c.Param("slug"), true).First(&post).Error; err != nil {
		JSONError(c, 404, "post não encontrado")
		return
	}
	c.JSON(200, post)
}

func (h *BlogHandler) AdminList(c *gin.Context) {
	var posts []models.BlogPost
	if err := h.db.WithContext(c.Request.Context()).Order("created_at DESC").Find(&posts).Error; err != nil {
		JSONError(c, 500, "failed to list blog posts")
		return
	}
	c.JSON(200, gin.H{"data": posts})
}

func (h *BlogHandler) Create(c *gin.Context) {
	var req dto.AdminBlogPostRequest
	if !BindJSON(c, &req) {
		return
	}
	slug := strings.TrimSpace(req.Slug)
	if !validBlogSlug(c, slug) {
		return
	}
	post := models.BlogPost{Title: strings.TrimSpace(req.Title), Slug: slug, Excerpt: strings.TrimSpace(req.Excerpt), Format: req.Format, ContentHTML: req.ContentHTML, Published: req.Published}
	if req.Published {
		now := time.Now()
		post.PublishedAt = &now
	}
	if err := h.db.WithContext(c.Request.Context()).Create(&post).Error; err != nil {
		JSONError(c, 409, "não foi possível criar; verifique se o slug já existe")
		return
	}
	c.JSON(201, post)
}

func (h *BlogHandler) Update(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, 400, "invalid id")
		return
	}
	var post models.BlogPost
	if h.db.WithContext(c.Request.Context()).First(&post, "id = ?", id).Error != nil {
		JSONError(c, 404, "post não encontrado")
		return
	}
	var req dto.AdminBlogPostPatch
	if !BindJSON(c, &req) {
		return
	}
	u := map[string]any{}
	if req.Title != nil {
		u["title"] = strings.TrimSpace(*req.Title)
	}
	if req.Slug != nil {
		s := strings.TrimSpace(*req.Slug)
		if !validBlogSlug(c, s) {
			return
		}
		u["slug"] = s
	}
	if req.Excerpt != nil {
		u["excerpt"] = strings.TrimSpace(*req.Excerpt)
	}
	if req.Format != nil {
		u["format"] = *req.Format
	}
	if req.ContentHTML != nil {
		u["content_html"] = *req.ContentHTML
	}
	if req.Published != nil {
		u["published"] = *req.Published
		if *req.Published && post.PublishedAt == nil {
			u["published_at"] = time.Now()
		}
	}
	if err := h.db.WithContext(c.Request.Context()).Model(&post).Updates(u).Error; err != nil {
		JSONError(c, 409, "não foi possível atualizar; verifique o slug")
		return
	}
	h.db.WithContext(c.Request.Context()).First(&post, "id = ?", id)
	c.JSON(200, post)
}

func (h *BlogHandler) Delete(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, 400, "invalid id")
		return
	}
	var post models.BlogPost
	if h.db.WithContext(c.Request.Context()).First(&post, "id = ?", id).Error != nil {
		JSONError(c, 404, "post não encontrado")
		return
	}
	if err := h.db.WithContext(c.Request.Context()).Delete(&post).Error; err != nil {
		JSONError(c, 500, "failed to delete post")
		return
	}
	removeUploadedFile(post.CoverURL)
	removeUploadedFile(post.PDFURL)
	c.Status(204)
}

func (h *BlogHandler) upload(c *gin.Context, field, dir string, pdf bool) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		JSONError(c, 400, "invalid id")
		return
	}
	var post models.BlogPost
	if h.db.WithContext(c.Request.Context()).First(&post, "id = ?", id).Error != nil {
		JSONError(c, 404, "post não encontrado")
		return
	}
	url, ok := saveUploadedFile(c, dir, pdf, false)
	if !ok {
		return
	}
	old := post.CoverURL
	if field == "pdf_url" {
		old = post.PDFURL
	}
	if err := h.db.WithContext(c.Request.Context()).Model(&post).Update(field, url).Error; err != nil {
		removeUploadedFile(url)
		JSONError(c, 500, "failed to save file")
		return
	}
	removeUploadedFile(old)
	c.JSON(200, gin.H{field: url})
}
func (h *BlogHandler) UploadCover(c *gin.Context) { h.upload(c, "cover_url", "blog-covers", false) }
func (h *BlogHandler) UploadPDF(c *gin.Context)   { h.upload(c, "pdf_url", "blog-pdfs", true) }

func (h *BlogHandler) UploadContentImage(c *gin.Context) {
	url, ok := saveUploadedFile(c, "blog-content", false, false)
	if !ok {
		return
	}
	c.JSON(200, gin.H{"url": url})
}
