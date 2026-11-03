package config

import (
	"fmt"
	"log/slog"
	"os"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

// Config holds all application configuration loaded from environment variables.
type Config struct {
	AppEnv      string
	AppPort     string
	AppLogLevel string
	// Public base URL of the frontend (used to build links sent by e-mail,
	// e.g. the ficha de cadastro fill link). No trailing slash.
	AppBaseURL string

	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string
	DBSSLMode  string

	JWTSecret     string
	JWTAccessTTL  time.Duration
	JWTRefreshTTL time.Duration

	CORSOrigins []string

	// TrustedProxies lists the proxy IPs/CIDRs whose X-Forwarded-For /
	// CF-Connecting-IP headers are believed when resolving the client IP.
	// Anything else connecting directly has its forwarding headers ignored, so
	// a client cannot spoof its IP to dodge the rate limiter. Empty = trust
	// nobody (use the TCP peer address).
	TrustedProxies []string

	// Optional transactional email (Resend). When both are empty the welcome
	// email is silently skipped — the app still works.
	ResendAPIKey string
	MailFrom     string

	// Google OAuth client used by the agenda (booking) feature. When empty the
	// agenda endpoints answer with "google_not_configured". The OAuth redirect
	// URI is {AppBaseURL}/api/v1/agenda/google/callback.
	GoogleOAuthClientID     string
	GoogleOAuthClientSecret string

	// Secret that lets a request skip the anti-bot checks via the header
	// "X-Antibot-Bypass" (used for our own headless inspection of production).
	AntibotBypassToken string
}

// Load reads .env (if present) and environment variables, returning a Config.
// Missing critical values fall back to safe development defaults but a warning is logged.
func Load() (*Config, error) {
	_ = godotenv.Load()

	cfg := &Config{
		AppEnv:      getEnv("APP_ENV", "development"),
		AppPort:     getEnv("APP_PORT", "8080"),
		AppLogLevel: getEnv("APP_LOG_LEVEL", "info"),
		AppBaseURL:  strings.TrimRight(getEnv("APP_BASE_URL", "http://localhost:3000"), "/"),

		DBHost:     getEnv("DB_HOST", "localhost"),
		DBPort:     getEnv("DB_PORT", "5432"),
		DBUser:     getEnv("DB_USER", "achadinhos"),
		DBPassword: getEnv("DB_PASSWORD", "achadinhos_dev"),
		DBName:     getEnv("DB_NAME", "achadinhos"),
		DBSSLMode:  getEnv("DB_SSLMODE", "disable"),

		JWTSecret: getEnv("JWT_SECRET", "dev-insecure-secret-change-me"),

		ResendAPIKey: getEnv("RESEND_API_KEY", ""),
		MailFrom:     getEnv("MAIL_FROM", ""),

		GoogleOAuthClientID:     getEnv("GOOGLE_OAUTH_CLIENT_ID", ""),
		GoogleOAuthClientSecret: getEnv("GOOGLE_OAUTH_CLIENT_SECRET", ""),

		AntibotBypassToken: getEnv("ANTIBOT_BYPASS_TOKEN", ""),
	}

	accessTTL, err := time.ParseDuration(getEnv("JWT_ACCESS_TTL", "15m"))
	if err != nil {
		return nil, fmt.Errorf("invalid JWT_ACCESS_TTL: %w", err)
	}
	cfg.JWTAccessTTL = accessTTL

	refreshTTL, err := time.ParseDuration(getEnv("JWT_REFRESH_TTL", "720h"))
	if err != nil {
		return nil, fmt.Errorf("invalid JWT_REFRESH_TTL: %w", err)
	}
	cfg.JWTRefreshTTL = refreshTTL

	origins := getEnv("CORS_ORIGINS", "http://localhost:3000,http://localhost:3001")
	for _, o := range strings.Split(origins, ",") {
		o = strings.TrimSpace(o)
		if o != "" {
			cfg.CORSOrigins = append(cfg.CORSOrigins, o)
		}
	}

	for _, p := range strings.Split(getEnv("TRUSTED_PROXIES", ""), ",") {
		if p = strings.TrimSpace(p); p != "" {
			cfg.TrustedProxies = append(cfg.TrustedProxies, p)
		}
	}

	if err := cfg.Validate(); err != nil {
		return nil, err
	}
	return cfg, nil
}

// Validate refuses to start in production with weak or placeholder secrets.
// Outside production only a warning is logged so local dev keeps working.
func (c *Config) Validate() error {
	var problems []string
	if len(c.JWTSecret) < 32 || isPlaceholder(c.JWTSecret) {
		problems = append(problems, "JWT_SECRET must be a random string of at least 32 chars (openssl rand -hex 48)")
	}
	if c.DBPassword == "achadinhos_dev" || isPlaceholder(c.DBPassword) {
		problems = append(problems, "DB_PASSWORD is a development/placeholder value")
	}
	if len(problems) == 0 {
		return nil
	}
	if c.AppEnv == "production" {
		return fmt.Errorf("insecure production configuration: %s", strings.Join(problems, "; "))
	}
	for _, p := range problems {
		slog.Warn("insecure configuration (allowed outside production)", "problem", p)
	}
	return nil
}

func isPlaceholder(v string) bool {
	l := strings.ToLower(v)
	return strings.Contains(l, "change-me") || strings.Contains(l, "changeme") ||
		strings.Contains(l, "insecure") || l == "secret" || l == "password"
}

// DSN returns the PostgreSQL connection DSN.
func (c *Config) DSN() string {
	return fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s TimeZone=UTC",
		c.DBHost, c.DBPort, c.DBUser, c.DBPassword, c.DBName, c.DBSSLMode,
	)
}

func getEnv(key, fallback string) string {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}
	return fallback
}
