"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../icons";
import { PdfDocument } from "../screens/pdf-document";
import { saveOrShareCertificate } from "./generate";

interface CertificateViewerProps {
  blob: Blob;
  fileName: string;
  onClose: () => void;
}

// Mostra o PDF do certificado DENTRO do app, renderizado em <canvas> via pdf.js
// (o único jeito que funciona no PWA iOS — <iframe>/download de blob ficam em
// branco). O botão "Baixar / compartilhar" usa a Web Share API (folha do iOS,
// "Salvar em Arquivos") com fallback para download no desktop.
export function CertificateViewer({ blob, fileName, onClose }: CertificateViewerProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    const u = URL.createObjectURL(blob);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [blob]);

  if (typeof document === "undefined") return null;

  // Portal para o <body> para escapar do contexto de empilhamento do painel
  // (senão a BottomNav fica na frente do documento).
  return createPortal(
    <div className="pv-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <button type="button" className="pv-close" onClick={onClose} aria-label="Voltar">
        <Icon.ChevLeft size={16} /> Voltar
      </button>
      <button
        type="button"
        className="cert-share-btn"
        disabled={sharing}
        onClick={async (e) => {
          e.stopPropagation();
          setSharing(true);
          try {
            await saveOrShareCertificate(blob, fileName);
          } finally {
            setSharing(false);
          }
        }}
      >
        <Icon.Share size={16} /> {sharing ? "Abrindo…" : "Baixar / compartilhar"}
      </button>
      <div className="pv-stage" onClick={(e) => e.stopPropagation()}>
        {url && <PdfDocument url={url} />}
      </div>
    </div>,
    document.body,
  );
}
