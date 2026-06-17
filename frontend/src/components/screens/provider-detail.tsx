"use client";

import { useState, useEffect } from "react";
import { providersApi, getImageUrl, isPdf } from "@/lib/api";
import { adaptReview } from "@/lib/adapters";
import type { Provider, Review } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Icon } from "../icons";
import { PortfolioViewer } from "./portfolio-viewer";

interface ProviderDetailProps {
  provider: Provider;
  isFav: boolean;
  onBack: () => void;
  onToggleFav: (id: string) => void;
  onRate: () => void;
  onWhatsapp: () => void;
}

const RATING_DISTRIBUTION: Array<{ stars: number; pct: number }> = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 3 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];

export function ProviderDetail({
  provider,
  isFav,
  onBack,
  onToggleFav,
  onRate,
  onWhatsapp,
}: ProviderDetailProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [portfolio, setPortfolio] = useState<string[]>(provider.portfolio ?? []);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);

  useEffect(() => {
    void providersApi.listReviews(provider.id).then((res) => {
      setReviews(res.data.map(adaptReview));
    }).catch(() => {});
  }, [provider.id]);

  // Fetch the full provider record — the list endpoint omits portfolio photos.
  useEffect(() => {
    void providersApi.get(provider.id).then((p) => {
      setPortfolio((p.portfolio_photos ?? []).map((ph) => ph.url));
    }).catch(() => {});
  }, [provider.id]);

  return (
    <div className="screen">
      <div className="screen-header gold-tint">
        <button type="button" className="screen-back" onClick={onBack} aria-label="Voltar">
          <Icon.ChevLeft size={16} />
        </button>
        <div className="screen-title">Prestador</div>
        <div className="screen-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => onToggleFav(provider.id)}
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
              {provider.catLabel}
            </div>
          </div>
        </div>

        <div className="pd-card">
          <div className="pd-top">
            <div
              className={cn("pd-avatar", provider.verified && "verified")}
            >
              {provider.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getImageUrl(provider.logoUrl)}
                  alt={provider.name}
                  className="pd-avatar-img"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                provider.avatar
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="pd-name">{provider.name}</div>
              <div className="pd-cat">
                {provider.distance} · responde em {provider.responseTime}
              </div>
              <div className="pd-rating-row">
                <Icon.Star size={12} />
                <strong>{provider.rating.toFixed(1).replace(".", ",")}</strong>
                <span>· {provider.reviews} avaliações</span>
              </div>
            </div>
          </div>
          <div className="pd-stats">
            <div className="pd-stat">
              <div className="pd-stat-num">{provider.yearsActive}</div>
              <div className="pd-stat-label">Anos</div>
            </div>
            <div className="pd-stat">
              <div className="pd-stat-num">{provider.jobsDone}</div>
              <div className="pd-stat-label">Serviços</div>
            </div>
            <div className="pd-stat">
              <div className="pd-stat-num">{provider.responseTime}</div>
              <div className="pd-stat-label">Resposta</div>
            </div>
          </div>
        </div>

        <div className="pd-section">
          <h3>Sobre</h3>
          <div className="pd-desc">{provider.desc}</div>
        </div>

        <div className="pd-section">
          <h3>Serviços</h3>
          <div className="pd-services">
            {provider.services.map((s) => (
              <div key={s} className="pd-service">
                <Icon.Check size={12} /> {s}
              </div>
            ))}
          </div>
        </div>

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
                  {isPdf(url) ? (
                    <span className="upload-doc">
                      <strong>PDF</strong>
                    </span>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={getImageUrl(url)} alt="Portfólio" loading="lazy" decoding="async" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pd-section">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <h3 style={{ margin: 0 }}>
              Avaliações{" "}
              <span
                style={{
                  color: "var(--ink-400)",
                  fontWeight: 400,
                  fontSize: 13,
                }}
              >
                ({reviews.length})
              </span>
            </h3>
            <button type="button" className="btn-mini" onClick={onRate}>
              Avaliar
            </button>
          </div>
          <div className="rating-summary" style={{ marginBottom: 14 }}>
            <div className="rating-big">
              <div className="rating-big-num">
                {provider.rating.toFixed(1).replace(".", ",")}
              </div>
              <div className="rating-big-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon.Star
                    key={i}
                    size={11}
                    filled={i <= Math.round(provider.rating)}
                  />
                ))}
              </div>
              <div className="rating-big-count">
                {provider.reviews} avaliações
              </div>
            </div>
            <div className="rating-bars">
              {RATING_DISTRIBUTION.map((d) => (
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
          {reviews.map((r) => (
            <div key={r.id} className="review">
              <div className="review-head">
                <div className="review-avatar">{r.user.charAt(0)}</div>
                <div className="review-user-info">
                  <div className="review-user">
                    {r.user}
                    {r.verified && <Icon.Check size={11} />}
                  </div>
                  <div className="review-meta">
                    {r.condo} · {new Date(r.date).toLocaleDateString("pt-BR")}
                  </div>
                </div>
                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Icon.Star key={i} size={11} filled={i <= r.rating} />
                  ))}
                </div>
              </div>
              <div className="review-text">{r.text}</div>
              {r.tags && r.tags.length > 0 && (
                <div className="review-tags">
                  {r.tags.map((t) => (
                    <span key={t} className="review-tag">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="review-actions">
                <span className="review-action">👍 Útil ({r.helpful})</span>
                <span className="review-action">Responder</span>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <div
              style={{
                padding: 20,
                textAlign: "center",
                color: "var(--ink-500)",
                fontSize: 13,
              }}
            >
              Seja o primeiro a avaliar este prestador.
            </div>
          )}
        </div>
      </div>

      <div className="sticky-cta">
        <button type="button" className="btn-secondary" onClick={onRate}>
          <Icon.Star size={14} /> Avaliar
        </button>
        <button
          type="button"
          className="btn-whatsapp"
          onClick={onWhatsapp}
        >
          <Icon.Whatsapp size={16} /> Falar no WhatsApp
        </button>
      </div>

      <PortfolioViewer url={viewerUrl} onClose={() => setViewerUrl(null)} />
    </div>
  );
}
