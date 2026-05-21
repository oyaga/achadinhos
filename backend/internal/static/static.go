package static

import (
	"embed"
	"io"
	"io/fs"
	"mime"
	"net/http"
	"path"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

//go:embed all:web
var webFS embed.FS

// Mount registers a NoRoute fallback that serves the embedded Next.js static
// export. Must be called after all API routes are registered.
func Mount(r *gin.Engine) error {
	sub, err := fs.Sub(webFS, "web")
	if err != nil {
		return err
	}

	r.NoRoute(func(c *gin.Context) {
		p := c.Request.URL.Path

		if strings.HasPrefix(p, "/api/") || strings.HasPrefix(p, "/uploads/") {
			c.Status(http.StatusNotFound)
			return
		}
		if c.Request.Method != http.MethodGet && c.Request.Method != http.MethodHead {
			c.Status(http.StatusMethodNotAllowed)
			return
		}

		clean := strings.TrimPrefix(path.Clean(p), "/")

		if clean != "" && clean != "." && isFile(sub, clean) {
			serveFile(c, sub, clean)
			return
		}
		if clean != "" && isFile(sub, clean+"/index.html") {
			serveFile(c, sub, clean+"/index.html")
			return
		}
		if clean != "" && isFile(sub, clean+".html") {
			serveFile(c, sub, clean+".html")
			return
		}
		serveFile(c, sub, "index.html")
	})

	return nil
}

func isFile(sub fs.FS, p string) bool {
	f, err := sub.Open(p)
	if err != nil {
		return false
	}
	defer f.Close()
	info, err := f.Stat()
	if err != nil {
		return false
	}
	return !info.IsDir()
}

// serveFile reads a file from the embedded FS and writes it directly to the
// response. We avoid http.FileServer to skip its canonical-redirect behavior
// (which would 301 /index.html -> /, creating loops with our SPA fallback).
func serveFile(c *gin.Context, sub fs.FS, p string) {
	f, err := sub.Open(p)
	if err != nil {
		c.Status(http.StatusNotFound)
		return
	}
	defer f.Close()
	info, err := f.Stat()
	if err != nil || info.IsDir() {
		c.Status(http.StatusNotFound)
		return
	}

	applyCacheHeaders(c, p)
	if ct := contentTypeFor(p); ct != "" {
		c.Writer.Header().Set("Content-Type", ct)
	}

	if rs, ok := f.(io.ReadSeeker); ok {
		http.ServeContent(c.Writer, c.Request, p, info.ModTime(), rs)
		return
	}
	c.Status(http.StatusOK)
	_, _ = io.Copy(c.Writer, f)
}

func contentTypeFor(p string) string {
	switch filepath.Ext(p) {
	case ".html":
		return "text/html; charset=utf-8"
	case ".js", ".mjs":
		return "text/javascript; charset=utf-8"
	case ".css":
		return "text/css; charset=utf-8"
	case ".json":
		return "application/json; charset=utf-8"
	case ".webmanifest":
		return "application/manifest+json; charset=utf-8"
	case ".svg":
		return "image/svg+xml"
	case ".woff2":
		return "font/woff2"
	case ".woff":
		return "font/woff"
	case ".ico":
		return "image/x-icon"
	}
	return mime.TypeByExtension(filepath.Ext(p))
}

func applyCacheHeaders(c *gin.Context, p string) {
	switch {
	case strings.HasPrefix(p, "_next/static/"):
		c.Writer.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
	case strings.HasSuffix(p, ".html"),
		strings.HasSuffix(p, "sw.js"),
		strings.HasSuffix(p, "manifest.webmanifest"):
		c.Writer.Header().Set("Cache-Control", "no-cache")
	default:
		c.Writer.Header().Set("Cache-Control", "public, max-age=3600")
	}
}
