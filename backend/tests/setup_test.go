package tests

import (
	"context"
	"fmt"
	"os"
	"sync"
	"testing"
	"time"

	"github.com/achadinhos/backend/internal/config"
	"github.com/achadinhos/backend/internal/db"
	"github.com/achadinhos/backend/internal/router"
	"github.com/gin-gonic/gin"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/modules/postgres"
	"github.com/testcontainers/testcontainers-go/wait"
	"gorm.io/gorm"
)

var (
	once    sync.Once
	sharedR *gin.Engine
	sharedG *gorm.DB
	sharedC *config.Config
)

// testEnv holds the shared resources for tests in this package.
type testEnv struct {
	Router *gin.Engine
	DB     *gorm.DB
	Config *config.Config
}

// SetupTestEnv spins up postgres in a container (once per test binary), runs
// auto-migrate, and returns a *gin.Engine plus DB for tests to share.
//
// Each test must reset the data via TruncateAll(t).
func SetupTestEnv(t *testing.T) *testEnv {
	t.Helper()
	once.Do(func() {
		ctx, cancel := context.WithTimeout(context.Background(), 120*time.Second)
		defer cancel()

		container, err := postgres.Run(ctx,
			"postgres:18-alpine",
			postgres.WithDatabase("achadinhos_test"),
			postgres.WithUsername("test"),
			postgres.WithPassword("test"),
			testcontainers.WithWaitStrategy(
				wait.ForLog("database system is ready to accept connections").
					WithOccurrence(2).
					WithStartupTimeout(60*time.Second),
			),
		)
		if err != nil {
			t.Fatalf("failed to start postgres container: %v", err)
		}
		host, _ := container.Host(ctx)
		port, _ := container.MappedPort(ctx, "5432/tcp")

		gin.SetMode(gin.TestMode)

		cfg := &config.Config{
			AppEnv:        "test",
			AppPort:       "0",
			AppLogLevel:   "warn",
			DBHost:        host,
			DBPort:        port.Port(),
			DBUser:        "test",
			DBPassword:    "test",
			DBName:        "achadinhos_test",
			DBSSLMode:     "disable",
			JWTSecret:     "test-secret-please-do-not-use-elsewhere",
			JWTAccessTTL:  15 * time.Minute,
			JWTRefreshTTL: 720 * time.Hour,
			CORSOrigins:   []string{"http://localhost:3000"},
		}

		gdb, err := db.New(cfg)
		if err != nil {
			t.Fatalf("failed to connect db: %v", err)
		}
		if err := db.AutoMigrate(gdb); err != nil {
			t.Fatalf("auto-migrate: %v", err)
		}
		sharedG = gdb
		sharedC = cfg
		sharedR = router.New(cfg, gdb)

		// Cleanup hook (best-effort) on process exit.
		// Note: testcontainers-go also auto-cleans via Reaper.
		_ = os.Setenv("TESTCONTAINERS_CONTAINER", container.GetContainerID())
	})
	return &testEnv{Router: sharedR, DB: sharedG, Config: sharedC}
}

// TruncateAll resets all data so each test starts clean.
func TruncateAll(t *testing.T, gdb *gorm.DB) {
	t.Helper()
	tables := []string{
		"review_helpfuls", "reviews", "favorites",
		"refresh_tokens", "products", "sellers",
		"providers", "users", "condominios", "categories",
	}
	for _, tbl := range tables {
		if err := gdb.Exec(fmt.Sprintf("TRUNCATE TABLE %s RESTART IDENTITY CASCADE", tbl)).Error; err != nil {
			t.Fatalf("truncate %s: %v", tbl, err)
		}
	}
}
