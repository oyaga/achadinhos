package handlers

import "testing"

func TestSniffUploadType(t *testing.T) {
	png := []byte("\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR")
	jpg := []byte("\xff\xd8\xff\xe0\x00\x10JFIF")
	pdf := []byte("%PDF-1.7\n")
	html := []byte("<html><script>alert(1)</script></html>")
	svg := []byte(`<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"></svg>`)
	mov := []byte("\x00\x00\x00\x14ftypqt  \x00\x00\x00\x00")
	cases := []struct {
		name string
		in   []byte
		want string
	}{
		{"png", png, "image/png"},
		{"jpg", jpg, "image/jpeg"},
		{"pdf", pdf, "application/pdf"},
		{"mov", mov, "video/quicktime"},
		{"html is not an image", html, "text/html"},
		{"svg is not an image", svg, "text/xml"},
	}
	for _, tc := range cases {
		if got := sniffUploadType(tc.in); got != tc.want {
			t.Errorf("%s: got %q, want %q", tc.name, got, tc.want)
		}
	}
}
