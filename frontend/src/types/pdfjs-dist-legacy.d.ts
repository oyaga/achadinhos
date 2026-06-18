// The deep "legacy" build path ships no types of its own; reuse the package's
// public types so `next build` type-checks the PdfDocument component.
declare module "pdfjs-dist/legacy/build/pdf.mjs" {
  export * from "pdfjs-dist";
}
