"use client";

import { useEffect, useState } from "react";
import { sellersApi, getImageUrl, isPdf, type AdminSeller } from "@/lib/api";
import { Icon } from "../icons";

interface SellerDetailProps {
  seller: AdminSeller;
  onBack: () => void;
}

// SellerDetail is the public profile screen for an empresa (seller). It mirrors
// the prestador detail, minus the prestador-only bits (rating, serviços).
export function SellerDetail({ seller, onBack }: SellerDetailProps) {
  const [full, setFull] = useState<AdminSeller>(seller);
  const [portfolio, setPortfolio] = useState<string[]>(
    (seller.portfolio_photos ?? []).map((p) => p.url),
  );

  // The list/slide payloads omit category and portfolio — fetch the full record.
  useEffect(() => {
    void sellersApi
      .get(seller.id)
      .then((res) => {
        setFull(res.seller);
        setPortfolio((res.seller.portfolio_photos ?? []).map((p) => p.url));
      })
      .catch(() => {});
  }, [seller.id]);

  const categoryLabel = full.category?.label ?? "Empresa";

  function openWhatsapp() {
    const wa = (full.whatsapp ?? "").replace(/\D+/g, "");
    if (!wa) return;
    const msg = encodeURIComponent(
      "Olá! Encontrei vocês no Achadinhos do Condomínio.",
    );
    window.open(
      `https://wa.me/55${wa}?text=${msg}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function openSite() {
    if (full.link) {
      window.open(full.link, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="screen">
      <div className="screen-header gold-tint">
        <button
          type="button"
          className="screen-back"
          onClick={onBack}
          aria-label="Voltar"
        >
          <Icon.ChevLeft size={16} />
        </button>
        <div className="screen-title">Empresa</div>
      </div>

      <div className="screen-body" style={{ paddingBottom: 100 }}>
        <div className="pd-hero">
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "var(--gold-300)",
                textTransform: "uppercase",
              }}
            >
              {categoryLabel}
            </div>
          </div>
        </div>

        <div className="pd-card">
          <div className="pd-top">
            <div className="pd-avatar">
              {full.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getImageUrl(full.logo_url)}
                  alt={full.name}
                  className="pd-avatar-img"
                />
              ) : (
                full.name.charAt(0).toUpperCase()
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="pd-name">{full.name}</div>
              <div className="pd-cat">
                {categoryLabel}
                {full.partner && " · Parceira homologada"}
              </div>
            </div>
          </div>
        </div>

        {full.description?.trim() && (
          <div className="pd-section">
            <h3>Sobre</h3>
            <div className="pd-desc">{full.description}</div>
          </div>
        )}

        {full.document && (
          <div className="pd-section">
            <h3>{full.document_type === "cpf" ? "CPF" : "CNPJ"}</h3>
            <div className="pd-desc">{full.document}</div>
          </div>
        )}

        {portfolio.length > 0 && (
          <div className="pd-section">
            <h3>Portfólio</h3>
            <div className="pd-portfolio">
              {portfolio.map((url) => (
                <a
                  key={url}
                  href={getImageUrl(url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pd-portfolio-item"
                >
                  {isPdf(url) ? (
                    <span className="upload-doc">
                      <strong>PDF</strong>
                    </span>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={getImageUrl(url)} alt="Portfólio" />
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="sticky-cta">
        {full.link && (
          <button type="button" className="btn-secondary" onClick={openSite}>
            <Icon.ExternalLink size={14} /> Site
          </button>
        )}
        <button type="button" className="btn-whatsapp" onClick={openWhatsapp}>
          <Icon.Whatsapp size={16} /> Falar no WhatsApp
        </button>
      </div>
    </div>
  );
}
