"use client";
import { useEffect, useRef, useState } from "react";
import { getImageUrl } from "@/lib/api";

export function PdfSlides({ url }: { url: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [doc, setDoc] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  useEffect(() => {
    let dead = false;
    import("pdfjs-dist").then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
      return pdfjs.getDocument(getImageUrl(url)).promise;
    }).then((d) => !dead && setDoc(d)).catch(() => setError("Não foi possível abrir a apresentação."));
    return () => { dead = true; };
  }, [url]);
  useEffect(() => {
    if (!doc || !canvas.current) return;
    let cancelled = false;
    doc.getPage(page).then((p: any) => {
      if (cancelled || !canvas.current) return;
      const base = p.getViewport({ scale: 1 });
      const width = Math.min(1100, canvas.current.parentElement?.clientWidth || 900);
      const viewport = p.getViewport({ scale: width / base.width });
      const c = canvas.current; c.width = viewport.width; c.height = viewport.height;
      p.render({ canvasContext: c.getContext("2d")!, viewport });
    });
    return () => { cancelled = true; };
  }, [doc, page]);
  if (error) return <p>{error}</p>;
  if (!doc) return <div className="admin-loading"><span className="auth-spinner" /> Carregando slides…</div>;
  return <section style={{textAlign:"center"}}>
    <canvas ref={canvas} style={{maxWidth:"100%",height:"auto",background:"white",boxShadow:"0 12px 35px #0002"}} />
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:16,marginTop:18}}>
      <button className="cert-btn ghost" disabled={page===1} onClick={()=>setPage(p=>p-1)}>Anterior</button>
      <strong>{page} / {doc.numPages}</strong>
      <button className="cert-btn" disabled={page===doc.numPages} onClick={()=>setPage(p=>p+1)}>Próximo</button>
    </div>
  </section>;
}
