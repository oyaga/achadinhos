package middleware

import (
	"crypto/subtle"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

// AntiBotConfig controls the anti-scraping middleware.
type AntiBotConfig struct {
	// Enabled turns the checks on. Keep off in development/tests so local
	// tooling (httptest, curl) keeps working.
	Enabled bool
	// BypassToken, when non-empty, lets a request skip all checks by sending
	// the header "X-Antibot-Bypass: <token>". Used for our own headless
	// inspection of production (Edge/Chrome headless would be blocked by UA).
	BypassToken string
}

// blockedUAFragments are matched case-insensitively as substrings of the
// User-Agent. Three families: AI crawlers/agents, site-mirroring & HTTP
// libraries, and headless browsers. Search engines (Googlebot, Bingbot) and
// link-preview bots (WhatsApp/facebookexternalhit) are intentionally NOT here.
var blockedUAFragments = []string{
	// Agentes e crawlers de IA (treinamento e navegação por agente).
	"gptbot", "chatgpt", "oai-searchbot", "claudebot", "claude-web",
	"anthropic", "perplexity", "bytespider", "ccbot", "cohere",
	"meta-externalagent", "ai2bot", "diffbot", "omgilibot", "youbot",
	"amazonbot", "applebot-extended", "mistralai", "devin", "firecrawl",

	// Ferramentas de clonagem/espelhamento e bibliotecas HTTP.
	"httrack", "wget", "curl", "python-requests", "python-urllib",
	"httpx", "aiohttp", "scrapy", "go-http-client", "libwww",
	"okhttp", "node-fetch", "axios", "undici", "java/",

	// Navegadores headless usados por agentes/scrapers.
	"headlesschrome", "phantomjs", "puppeteer", "playwright", "selenium",
}

// rate limit: token bucket per client IP. Generous enough for a real user
// loading asset-heavy pages, restrictive for a crawler mirroring the site.
const (
	rlBurst      = 150
	rlPerSecond  = 3
	rlJanitorGap = 5 * time.Minute
)

type bucket struct {
	tokens   float64
	lastSeen time.Time
}

// AntiBot blocks known AI-agent/scraper user agents and rate-limits by IP.
// /health is exempt (Docker healthcheck uses curl).
func AntiBot(cfg AntiBotConfig) gin.HandlerFunc {
	if !cfg.Enabled {
		return func(c *gin.Context) { c.Next() }
	}

	var (
		mu      sync.Mutex
		buckets = map[string]*bucket{}
		lastGC  = time.Now()
	)

	return func(c *gin.Context) {
		if c.Request.URL.Path == "/health" {
			c.Next()
			return
		}
		if cfg.BypassToken != "" &&
			subtle.ConstantTimeCompare([]byte(c.GetHeader("X-Antibot-Bypass")), []byte(cfg.BypassToken)) == 1 {
			c.Next()
			return
		}

		ua := strings.ToLower(c.Request.UserAgent())
		if ua == "" {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "forbidden"})
			return
		}
		for _, frag := range blockedUAFragments {
			if strings.Contains(ua, frag) {
				c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "forbidden"})
				return
			}
		}

		now := time.Now()
		ip := c.ClientIP()
		mu.Lock()
		b, ok := buckets[ip]
		if !ok {
			b = &bucket{tokens: rlBurst}
			buckets[ip] = b
		}
		b.tokens += now.Sub(b.lastSeen).Seconds() * rlPerSecond
		if b.tokens > rlBurst {
			b.tokens = rlBurst
		}
		b.lastSeen = now
		allowed := b.tokens >= 1
		if allowed {
			b.tokens--
		}
		if now.Sub(lastGC) > rlJanitorGap {
			for k, v := range buckets {
				if now.Sub(v.lastSeen) > rlJanitorGap {
					delete(buckets, k)
				}
			}
			lastGC = now
		}
		mu.Unlock()

		if !allowed {
			c.Header("Retry-After", "30")
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{"error": "too_many_requests"})
			return
		}
		c.Next()
	}
}
