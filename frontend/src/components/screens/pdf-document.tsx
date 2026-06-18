"use client";

import { useEffect, useRef, useState } from "react";

// Legacy build = widest mobile-browser support (iOS/Android WebViews). The
// worker URL is resolved by the bundler so it ships as a same-origin asset —
// no third-party CDN call. Mobile browsers can't render a PDF inside an
// <iframe>, so we draw each page onto a <canvas> instead.
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PdfDocumentProps {
  url: string;
}

type Status = "loading" | "ready" | "error";

export function PdfDocument({ url }: PdfDocumentProps) {
  const pagesRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const mount = pagesRef.current;
    if (!mount) return;

    let cancelled = false;
    mount.replaceChildren();
    setStatus("loading");

    const task = pdfjsLib.getDocument({ url });
    task.promise
      .then(async (pdf) => {
        // Render at the container's CSS width, multiplied by the device pixel
        // ratio so the pages stay crisp on high-density phone screens.
        const cssWidth = mount.clientWidth || 320;
        const dpr = window.devicePixelRatio || 1;
        for (let n = 1; n <= pdf.numPages; n++) {
          if (cancelled) return;
          const page = await pdf.getPage(n);
          const base = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({ scale: (cssWidth * dpr) / base.width });
          const canvas = document.createElement("canvas");
          canvas.className = "pv-pdf-page";
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          await page.render({ canvasContext: ctx, viewport }).promise;
          if (cancelled) return;
          mount.appendChild(canvas);
        }
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
    <div className="pv-pdf" data-status={status}>
      {status === "loading" && <p className="pv-pdf-msg">Carregando documento…</p>}
      {status === "error" && (
        <p className="pv-pdf-msg">
          Não foi possível exibir o documento.{" "}
          <a href={url} target="_blank" rel="noopener noreferrer">
            Abrir em nova aba
          </a>
        </p>
      )}
      <div className="pv-pdf-pages" ref={pagesRef} />
    </div>
  );
}
