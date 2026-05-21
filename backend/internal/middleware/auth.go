package middleware

import (
	"net/http"
	"strings"

	"github.com/achadinhos/backend/internal/auth"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// Context keys.
const (
	CtxUserID = "user_id"
	CtxRole   = "user_role"
	CtxEmail  = "user_email"
)

// RequireAuth validates the Authorization: Bearer <token> header.
func RequireAuth(secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		header := c.GetHeader("Authorization")
		if header == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "missing authorization header",
				"code":  http.StatusUnauthorized,
			})
			return
		}
		parts := strings.SplitN(header, " ", 2)
		if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "malformed authorization header",
				"code":  http.StatusUnauthorized,
			})
			return
		}
		claims, err := auth.ParseAccessToken(secret, parts[1])
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "invalid or expired token",
				"code":  http.StatusUnauthorized,
			})
			return
		}
		c.Set(CtxUserID, claims.UserID)
		c.Set(CtxRole, claims.Role)
		c.Set(CtxEmail, claims.Email)
		c.Next()
	}
}

// RequireRole asserts the authenticated user has one of the allowed roles.
// Must run AFTER RequireAuth.
func RequireRole(roles ...string) gin.HandlerFunc {
	allowed := make(map[string]struct{}, len(roles))
	for _, r := range roles {
		allowed[r] = struct{}{}
	}
	return func(c *gin.Context) {
		role, _ := c.Get(CtxRole)
		roleStr, _ := role.(string)
		if _, ok := allowed[roleStr]; !ok {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"error": "forbidden: insufficient role",
				"code":  http.StatusForbidden,
			})
			return
		}
		c.Next()
	}
}

// MustUserID extracts the user ID from the context (or returns Nil if absent).
func MustUserID(c *gin.Context) uuid.UUID {
	v, ok := c.Get(CtxUserID)
	if !ok {
		return uuid.Nil
	}
	id, _ := v.(uuid.UUID)
	return id
}
