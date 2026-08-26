"use client";

import { useState } from "react";
import {
  getImageUrl,
  isPdf,
  isVideo,
  type AdminSeller,
  type ApiProduct,
} from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { CertSeal } from "../cert-seal";
import type { ContactInput } from "@/hooks/use-whatsapp-history";
import { Icon } from "../icons";
import { PortfolioViewer } from "./portfolio-viewer";
import { PdfThumbnail } from "./pdf-thumbnail";
import { VideoThumbnail } from "./video-thumbnail";
import { SocialLinks } from "./social-links";
import { useSellerData } from "./use-seller-data";

interface SellerDetailProps {
  seller: AdminSeller;
  onBack: () => void;
  isFav: boolean;
  onToggleFav: (id: string) => void;
  onRecordContact: (input: ContactInput) => void;
  /** Abre a tela do produto (mesma usada no Shopping). */
  onProduct?: (p: ApiProduct) => void;
}

// SellerDetail is the public profile screen for an empresa (seller). It mirrors
// the prestador detail, minus the prestador-only bits (rating, serviços).
export function SellerDetail({
  seller,
  onBack,
  isFav,
  onToggleFav,
  onRecordContact,
  onProduct,
}: SellerDetailProps) {
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const {
    full,
    products,
    portfolio,
    reviews,
    avgRating,
    ratingDist,
    myRating,
    setMyRating,
    reviewText,
    setReviewText,
    sending,
    reviewMsg,
    submitReview,
    categoryLabel,
    openWhatsapp,
    openSite,
  } = useSellerData(seller, onRecordContact);

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
        <div className="screen-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => onToggleFav(seller.id)}
            aria-label="Favoritar"
          >
            <Icon.Heart size={18} filled={isFav} />
          </button>
        </div>
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
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                full.name.charAt(0).toUpperCase()
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="pd-name">
                {full.name}
                <CertSeal tier={full.cert_tier} style={{ marginLeft: 6 }} />
              </div>
              <div className="pd-cat">
                {categoryLabel}
                {full.partner && " · Parceira homologada"}
              </div>
              <div className="pd-rating-row">
                <Icon.Star size={12} />
                <strong>{avgRating.toFixed(1).replace(".", ",")}</strong>
                <span>· {reviews.length} avaliações</span>
              </div>
            </div>
          </div>
          <div className="pd-stats">
            <div className="pd-stat">
              <div className="pd-stat-num">
                {avgRating > 0 ? avgRating.toFixed(1).replace(".", ",") : "—"}
              </div>
              <div className="pd-stat-label">Avaliação</div>
            </div>
            <div className="pd-stat">
              <div className="pd-stat-num">{reviews.length}</div>
              <div className="pd-stat-label">Avaliações</div>
            </div>
            <div className="pd-stat">
              <div className="pd-stat-num">{products.length}</div>
              <div className="pd-stat-label">Produtos</div>
            </div>
          </div>
        </div>

        {full.description?.trim() && (
          <div className="pd-section">
            <h3>Sobre</h3>
            <div className="pd-desc">{full.description}</div>
          </div>
        )}

        {products.length > 0 && (
          <div className="pd-section">
            <h3>Produtos &amp; serviços</h3>
            <div className="pd-products">
              {products.map((p) => {
                // Clique abre a tela do produto; sem handler (fallback), abre
                // o link externo do produto/da loja quando existir.
                const externalLink = p.link_override || full.link || "";
                const open = onProduct
                  ? () => onProduct(p)
                  : externalLink
                    ? () => window.open(externalLink, "_blank", "noopener,noreferrer")
                    : undefined;
                return (
                  <div
                    key={p.id}
                    className={cn("pd-product", open && "pd-product--clickable")}
                    onClick={open}
                    role={open ? "button" : undefined}
                    tabIndex={open ? 0 : undefined}
                    onKeyDown={
                      open
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              open();
                            }
                          }
                        : undefined
                    }
                  >
                    <div className="pd-product-thumb">
                      {p.photos && p.photos.length > 0 ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={getImageUrl(p.photos[0].url)}
                          alt={p.name}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span className="pd-product-letter">
                          {p.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="pd-product-name">{p.name}</div>
                    <div className="pd-product-price">
                      {p.price > 0
                        ? p.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : "Sob consulta"}
                    </div>
                  </div>
                );
              })}
            </div>
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
                <button
                  key={url}
                  type="button"
                  onClick={() => setViewerUrl(url)}
                  className="pd-portfolio-item"
                >
                  {isVideo(url) ? (
                    <VideoThumbnail url={url} />
                  ) : isPdf(url) ? (
                    <PdfThumbnail url={getImageUrl(url)} />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={getImageUrl(url)} alt="Portfólio" loading="lazy" decoding="async" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <SocialLinks
          data={{
            instagram: full.instagram,
            facebook: full.facebook,
            tiktok: full.tiktok,
            youtube: full.youtube,
            site: full.link,
          }}
        />

        {/* Avaliações */}
        <div className="pd-section">
          <h3>
            Avaliações{" "}
            <span
              style={{ color: "var(--ink-400)", fontWeight: 400, fontSize: 13 }}
            >
              ({reviews.length})
            </span>
          </h3>

          {reviews.length > 0 && (
            <div className="rating-summary" style={{ marginBottom: 14 }}>
              <div className="rating-big">
                <div className="rating-big-num">
                  {avgRating.toFixed(1).replace(".", ",")}
                </div>
                <div className="rating-big-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Icon.Star
                      key={i}
                      size={11}
                      filled={i <= Math.round(avgRating)}
                    />
                  ))}
                </div>
                <div className="rating-big-count">
                  {reviews.length} avaliações
                </div>
              </div>
              <div className="rating-bars">
                {ratingDist.map((d) => (
                  <div key={d.stars} className="rating-bar-row">
                    <span>{d.stars}</span>
                    <div className="rating-bar">
                      <div
                        className="rating-bar-fill"
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                    <span style={{ width: 22, textAlign: "right" }}>
                      {d.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isAuthenticated ? (
            <div className="sr-form">
              <div className="sr-stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setMyRating(n)}
                    aria-label={`${n} estrela(s)`}
                  >
                    <Icon.Star size={26} filled={n <= myRating} />
                  </button>
                ))}
              </div>
              <textarea
                className="prof-textarea"
                rows={3}
                placeholder="Comentário (opcional)"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <button
                type="button"
                className="sr-submit"
                onClick={submitReview}
                disabled={myRating < 1 || sending}
              >
                {sending ? "Enviando…" : "Enviar avaliação"}
              </button>
              {reviewMsg && <div className="sr-msg" role="status">{reviewMsg}</div>}
            </div>
          ) : (
            <div className="sr-login">
              Entre como síndico para avaliar esta empresa.
            </div>
          )}

          {reviews.map((r) => (
            <div key={r.id} className="review">
              <div className="review-head">
                <div className="review-avatar">
                  {(r.user?.name ?? "?").charAt(0).toUpperCase()}
                </div>
                <div className="review-user-info">
                  <div className="review-user">{r.user?.name ?? "Usuário"}</div>
                  <div className="review-meta">
                    {new Date(r.created_at).toLocaleDateString("pt-BR")}
                  </div>
                </div>
                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Icon.Star key={i} size={11} filled={i <= r.rating} />
                  ))}
                </div>
              </div>
              {r.text && <div className="review-text">{r.text}</div>}
            </div>
          ))}
          {reviews.length === 0 && (
            <div className="sr-empty">
              Seja o primeiro a avaliar esta empresa.
            </div>
          )}
        </div>
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

      <PortfolioViewer url={viewerUrl} onClose={() => setViewerUrl(null)} />
    </div>
  );
}
