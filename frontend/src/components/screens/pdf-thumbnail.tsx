"use client";

import { useEffect, useRef, useState } from "react";
// Mesmo build legacy do pdf-document (worker same-origin, sem CDN externo).
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PdfThumbnailProps {
  url: string;
}

type Status = "loading" | "ready" | "error";

// PdfThumbnail renderiza a 1ª página do PDF (a "capa") num <canvas> recortado em
// cover, para usar como miniatura no portfólio. Enquanto carrega (ou se falhar)
// mostra o selo "PDF" — degradando para o comportamento antigo.
export function PdfThumbnail({ url }: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    const task = pdfjsLib.getDocument({ url });
    task.promise
      .then(async (pdf) => {
        if (cancelled) return;
        const page = await pdf.getPage(1);
        const canvas = canvasRef.current;
        if (!canvas) return;
        // Largura de render fixa; o CSS reduz e recorta (object-fit: cover).
        const targetW = 360;
        const base = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: targetW / base.width });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setStatus("error");
          return;
        }
        await page.render({ canvasContext: ctx, viewport }).promise;
        if (!cancelled) setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      task.destroy();
    };
  }, [url]);

  return (
    <span className="pdf-thumb" data-status={status}>
      <canvas ref={canvasRef} className="pdf-thumb-canvas" />
      {status === "ready" ? (
        <span className="pdf-thumb-tag">PDF</span>
      ) : (
        <span className="pdf-thumb-badge">
          <strong>PDF</strong>
        </span>
      )}
    </span>
  );
}
