package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func newLimited(t *testing.T, burst int) *gin.Engine {
	t.Helper()
	gin.SetMode(gin.TestMode)
	r := gin.New()
	_ = r.SetTrustedProxies(nil) // trust nobody: forwarding headers are ignored
	r.GET("/x", RateLimit(true, burst, 1), func(c *gin.Context) { c.Status(http.StatusOK) })
	return r
}

func hit(r *gin.Engine, remote, xff string) int {
	req := httptest.NewRequest(http.MethodGet, "/x", nil)
	req.RemoteAddr = remote
	if xff != "" {
		req.Header.Set("X-Forwarded-For", xff)
	}
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	return w.Code
}

func TestRateLimitBlocksAfterBurst(t *testing.T) {
	r := newLimited(t, 3)
	for i := 0; i < 3; i++ {
		if c := hit(r, "1.2.3.4:1000", ""); c != 200 {
			t.Fatalf("req %d: got %d, want 200", i, c)
		}
	}
	if c := hit(r, "1.2.3.4:1000", ""); c != http.StatusTooManyRequests {
		t.Fatalf("got %d, want 429", c)
	}
	// Another IP has its own bucket.
	if c := hit(r, "5.6.7.8:1000", ""); c != 200 {
		t.Fatalf("other ip got %d, want 200", c)
	}
}

func TestRateLimitIgnoresSpoofedForwardedFor(t *testing.T) {
	r := newLimited(t, 2)
	for i := 0; i < 2; i++ {
		hit(r, "1.2.3.4:1000", "9.9.9.1")
	}
	// Rotating X-Forwarded-For must not yield a fresh bucket.
	if c := hit(r, "1.2.3.4:1000", "9.9.9.2"); c != http.StatusTooManyRequests {
		t.Fatalf("spoofed XFF bypassed the limiter: got %d", c)
	}
}

func TestRateLimitDisabled(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.GET("/x", RateLimit(false, 1, 1), func(c *gin.Context) { c.Status(200) })
	for i := 0; i < 10; i++ {
		if c := hit(r, "1.2.3.4:1", ""); c != 200 {
			t.Fatalf("disabled limiter blocked: %d", c)
		}
	}
}
