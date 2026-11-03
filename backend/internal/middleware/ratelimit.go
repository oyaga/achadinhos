package middleware

import (
	"net/http"
	"strconv"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

// RateLimit returns a per-client-IP token-bucket limiter meant for sensitive
// endpoints (login, sign-up, refresh, booking, public form submits). Each call
// creates an independent bucket set, so a limiter attached to /auth/login does
// not share budget with the one on /agenda/:slug/book.
//
// burst is the number of requests allowed back-to-back; perMinute is the
// sustained refill rate. When enabled is false it is a no-op (dev/tests).
//
// The client IP comes from c.ClientIP(), which only honours forwarding headers
// from the proxies configured via TRUSTED_PROXIES — spoofing X-Forwarded-For
// does not grant a fresh bucket.
//
// State is in-process memory: it resets on restart and is not shared between
// replicas. Fine for the current single-container deploy; move to Redis or the
// edge (Cloudflare rules) before scaling out.
func RateLimit(enabled bool, burst int, perMinute float64) gin.HandlerFunc {
	if !enabled {
		return func(c *gin.Context) { c.Next() }
	}
	type bucket struct {
		tokens float64
		last   time.Time
	}
	var (
		mu     sync.Mutex
		bs     = map[string]*bucket{}
		lastGC = time.Now()
	)
	perSec := perMinute / 60
	// Time for a full refill is the worst-case Retry-After.
	retry := int(float64(burst)/perSec) + 1
	if retry < 1 {
		retry = 1
	}

	return func(c *gin.Context) {
		ip := c.ClientIP()
		now := time.Now()

		mu.Lock()
		b, ok := bs[ip]
		if !ok {
			b = &bucket{tokens: float64(burst), last: now}
			bs[ip] = b
		}
		b.tokens += now.Sub(b.last).Seconds() * perSec
		if b.tokens > float64(burst) {
			b.tokens = float64(burst)
		}
		b.last = now
		allowed := b.tokens >= 1
		if allowed {
			b.tokens--
		}
		if now.Sub(lastGC) > 5*time.Minute {
			for k, v := range bs {
				if now.Sub(v.last) > 15*time.Minute {
					delete(bs, k)
				}
			}
			lastGC = now
		}
		mu.Unlock()

		if !allowed {
			c.Header("Retry-After", strconv.Itoa(retry))
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{"error": "too_many_requests"})
			return
		}
		c.Next()
	}
}
