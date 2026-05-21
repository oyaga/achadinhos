package middleware

import (
	"log/slog"
	"net/http"
	"runtime/debug"

	"github.com/gin-gonic/gin"
)

// Recover catches panics, logs them, and returns 500 with a structured error.
func Recover() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if r := recover(); r != nil {
				slog.Error("panic recovered",
					slog.Any("error", r),
					slog.String("stack", string(debug.Stack())),
					slog.String("path", c.Request.URL.Path),
				)
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
					"error": "internal server error",
					"code":  http.StatusInternalServerError,
				})
			}
		}()
		c.Next()
	}
}
