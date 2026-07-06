package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func newAntiBotRouter(cfg AntiBotConfig) *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(AntiBot(cfg))
	r.GET("/health", func(c *gin.Context) { c.Status(http.StatusOK) })
	r.GET("/", func(c *gin.Context) { c.Status(http.StatusOK) })
	return r
}

func doGet(r *gin.Engine, path, ua, bypass string) int {
	req := httptest.NewRequest(http.MethodGet, path, nil)
	if ua != "" {
		req.Header.Set("User-Agent", ua)
	}
	if bypass != "" {
		req.Header.Set("X-Antibot-Bypass", bypass)
	}
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	return w.Code
}

const browserUA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"

func TestAntiBotBlocksScraperUAs(t *testing.T) {
	r := newAntiBotRouter(AntiBotConfig{Enabled: true})
	blocked := []string{
		"GPTBot/1.0 (+https://openai.com/gptbot)",
		"ClaudeBot/1.0",
		"Mozilla/5.0 (compatible; Bytespider; spider-feedback@bytedance.com)",
		"curl/8.4.0",
		"Wget/1.21",
		"python-requests/2.31.0",
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/120.0 Safari/537.36",
		"", // UA vazio
	}
	for _, ua := range blocked {
		if code := doGet(r, "/", ua, ""); code != http.StatusForbidden {
			t.Errorf("UA %q: got %d, want 403", ua, code)
		}
	}
}

func TestAntiBotAllowsBrowsersAndSearchBots(t *testing.T) {
	r := newAntiBotRouter(AntiBotConfig{Enabled: true})
	allowed := []string{
		browserUA,
		"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
		"WhatsApp/2.23.20 A",
		"facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
	}
	for _, ua := range allowed {
		if code := doGet(r, "/", ua, ""); code != http.StatusOK {
			t.Errorf("UA %q: got %d, want 200", ua, code)
		}
	}
}

func TestAntiBotHealthExemptAndBypassToken(t *testing.T) {
	r := newAntiBotRouter(AntiBotConfig{Enabled: true, BypassToken: "s3cret"})
	if code := doGet(r, "/health", "curl/8.4.0", ""); code != http.StatusOK {
		t.Errorf("/health com curl: got %d, want 200", code)
	}
	if code := doGet(r, "/", "HeadlessChrome/120.0", "s3cret"); code != http.StatusOK {
		t.Errorf("bypass correto: got %d, want 200", code)
	}
	if code := doGet(r, "/", "HeadlessChrome/120.0", "errado"); code != http.StatusForbidden {
		t.Errorf("bypass errado: got %d, want 403", code)
	}
}

func TestAntiBotDisabledPassesEverything(t *testing.T) {
	r := newAntiBotRouter(AntiBotConfig{Enabled: false})
	if code := doGet(r, "/", "curl/8.4.0", ""); code != http.StatusOK {
		t.Errorf("desligado deve deixar passar: got %d, want 200", code)
	}
}

func TestAntiBotRateLimits(t *testing.T) {
	r := newAntiBotRouter(AntiBotConfig{Enabled: true})
	got429 := false
	for i := 0; i < rlBurst+20; i++ {
		if doGet(r, "/", browserUA, "") == http.StatusTooManyRequests {
			got429 = true
			break
		}
	}
	if !got429 {
		t.Errorf("esperava 429 apos estourar o burst de %d requisicoes", rlBurst)
	}
}
