"use client";

import { createPortal } from "react-dom";
import { getImageUrl, isPdf, isVideoFile, isVideoLink, videoEmbedUrl } from "@/lib/api";
import { Icon } from "../icons";
import { PdfDocument } from "./pdf-document";

interface PortfolioViewerProps {
  url: string | null;
  onClose: () => void;
}

// PortfolioViewer shows a portfolio item (image or PDF) in a full-screen
// overlay with a "Voltar" button — so tapping a portfolio item keeps the user
// inside the app instead of navigating away to the raw file.
export function PortfolioViewer({ url, onClose }: PortfolioViewerProps) {
  if (!url || typeof document === "undefined") return null;
  const full = getImageUrl(url);
  // Portal to <body> so the overlay escapes the provider screen's stacking
  // context — otherwise the bottom nav renders in front of the document.
  return createPortal(
    <div className="pv-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <button
        type="button"
        className="pv-close"
        onClick={onClose}
        aria-label="Voltar"
      >
        <Icon.ChevLeft size={16} /> Voltar
      </button>
      <div className="pv-stage" onClick={(e) => e.stopPropagation()}>
        {isVideoLink(url) ? (
          <div className="pv-video-wrap">
            <iframe
              className="pv-video"
              src={videoEmbedUrl(url)}
              title="Vídeo do portfólio"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : isVideoFile(url) ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video className="pv-img" src={full} controls autoPlay playsInline />
        ) : isPdf(url) ? (
          <PdfDocument url={full} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={full} alt="Portfólio" className="pv-img" />
        )}
      </div>
    </div>,
    document.body,
  );
}
