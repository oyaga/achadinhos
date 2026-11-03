package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// SecurityHeaders adds defensive response headers to every response.
//
// A Content-Security-Policy is intentionally NOT set here: the Next.js static
// export relies on inline bootstrap scripts, so a CSP needs a nonce/hash
// pipeline first (see docs/SECURITY.md, "Pendências").
func SecurityHeaders(production bool) gin.HandlerFunc {
	return func(c *gin.Context) {
		h := c.Writer.Header()
		h.Set("X-Content-Type-Options", "nosniff")
		h.Set("X-Frame-Options", "SAMEORIGIN")
		h.Set("Referrer-Policy", "strict-origin-when-cross-origin")
		h.Set("Permissions-Policy", "camera=(), microphone=(), geolocation=(self), payment=()")
		h.Set("Cross-Origin-Opener-Policy", "same-origin")
		if production {
			h.Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
		}
		// User-uploaded files must never execute as active content, even if a
		// hostile file slipped past validation: sandbox them and force the
		// browser to treat them as inert resources.
		if strings.HasPrefix(c.Request.URL.Path, "/uploads/") {
			h.Set("Content-Security-Policy", "default-src 'none'; img-src 'self'; media-src 'self'; style-src 'unsafe-inline'; sandbox")
			h.Set("Cross-Origin-Resource-Policy", "same-origin")
		}
		c.Next()
	}
}

// MaxBody caps the request body size. Upload routes get their own, larger cap
// via MaxBodyFor; this default protects every JSON endpoint from memory abuse.
func MaxBody(limit int64) gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Body != nil && c.Request.Body != http.NoBody {
			if c.Request.ContentLength > limit {
				c.AbortWithStatusJSON(http.StatusRequestEntityTooLarge, gin.H{"error": "request_too_large"})
				return
			}
			c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, limit)
		}
		c.Next()
	}
}

// MaxBodyFor picks the limit by request: multipart uploads (video up to 50 MB
// plus overhead) get uploadLimit, everything else jsonLimit.
func MaxBodyFor(jsonLimit, uploadLimit int64) gin.HandlerFunc {
	small := MaxBody(jsonLimit)
	big := MaxBody(uploadLimit)
	return func(c *gin.Context) {
		if strings.HasPrefix(c.GetHeader("Content-Type"), "multipart/form-data") {
			big(c)
			return
		}
		small(c)
	}
}
