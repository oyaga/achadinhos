package handlers

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

// ErrorResponse is the canonical structured error body.
type ErrorResponse struct {
	Error   string            `json:"error"`
	Code    int               `json:"code"`
	Details map[string]string `json:"details,omitempty"`
}

// JSONError writes a structured JSON error.
func JSONError(c *gin.Context, status int, msg string) {
	c.AbortWithStatusJSON(status, ErrorResponse{Error: msg, Code: status})
}

// BindAndValidate binds JSON or query params and writes a 400 on failure.
// Returns true if binding succeeded.
func BindJSON(c *gin.Context, dst any) bool {
	if err := c.ShouldBindJSON(dst); err != nil {
		var ve validator.ValidationErrors
		if errors.As(err, &ve) {
			details := make(map[string]string, len(ve))
			for _, fe := range ve {
				details[fe.Field()] = fe.Tag()
			}
			c.AbortWithStatusJSON(http.StatusBadRequest, ErrorResponse{
				Error:   "validation failed",
				Code:    http.StatusBadRequest,
				Details: details,
			})
			return false
		}
		JSONError(c, http.StatusBadRequest, "invalid request body: "+err.Error())
		return false
	}
	return true
}

// PaginationParams parses limit & offset query params with sane defaults.
type PaginationParams struct {
	Limit  int
	Offset int
}

// ParsePagination reads ?limit=&offset= with defaults limit=20 (max 100), offset=0.
func ParsePagination(c *gin.Context) PaginationParams {
	limit, _ := strconv.Atoi(c.Query("limit"))
	if limit <= 0 {
		limit = 20
	}
	if limit > 100 {
		limit = 100
	}
	offset, _ := strconv.Atoi(c.Query("offset"))
	if offset < 0 {
		offset = 0
	}
	return PaginationParams{Limit: limit, Offset: offset}
}
