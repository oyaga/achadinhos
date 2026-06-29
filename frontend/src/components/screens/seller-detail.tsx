"use client";

import { useEffect, useState } from "react";
import {
  sellersApi,
  getImageUrl,
  isPdf,
  isVideo,
  type AdminSeller,
  type ApiProduct,
  type SellerReview,
} from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import type { ContactInput } from "@/hooks/use-whatsapp-history";
import { Icon } from "../icons";
import { PortfolioViewer } from "./portfolio-viewer";
import { PdfThumbnail } from "./pdf-thumbnail";
import { SocialLinks } from "./social-links";

interface SellerDetailProps {
  seller: AdminSeller;
  onBack: () => void;
  isFav: boolean;
  onToggleFav: (id: string) => void;
  onRecordContact: (input: ContactInput) => void;
}

// SellerDetail is the public profile screen for an empresa (seller). It mirrors
// the prestador detail, minus the prestador-only bits (rating, serviços).
export function SellerDetail({
  seller,
  onBack,
  isFav,
  onToggleFav,
  onRecordContact,
}: SellerDetailProps) {
  const [full, setFull] = useState<AdminSeller>(seller);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [portfolio, setPortfolio] = useState<string[]>(
    (seller.portfolio_photos ?? []).map((p) => p.url),
  );
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [reviews, setReviews] = useState<SellerReview[]>([]);
  const [myRating, setMyRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [sending, setSending] = useState(false);
  const [reviewMsg, setReviewMsg] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // The list/slide payloads omit category and portfolio — fetch the full record.
  useEffect(() => {
    void sellersApi
      .get(seller.id)
      .then((res) => {
        setFull(res.seller);
        setProducts(res.products ?? []);
        setPortfolio((res.seller.portfolio_photos ?? []).map((p) => p.url));
      })
      .catch(() => {});
  }, [seller.id]);

  useEffect(() => {
    void sellersApi.listReviews(seller.id).then(setReviews).catch(() => {});
  }, [seller.id]);

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const ratingDist = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    return {
      stars,
      pct: reviews.length ? Math.round((count / reviews.length) * 100) : 0,
    };
  });

  async function submitReview() {
    if (myRating < 1 || sending) return;
    setSending(true);
    setReviewMsg(null);
    try {
      await sellersApi.createReview(seller.id, {
        rating: myRating,
        text: reviewText.trim(),
      });
      setReviewText("");
      setMyRating(0);
      setReviewMsg("Avaliação enviada. Obrigado!");
      setReviews(await sellersApi.listReviews(seller.id));
    } catch {
      setReviewMsg("Não foi possível enviar a avaliação. Tente novamente.");
    } finally {
      setSending(false);
    }
  }

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
    onRecordContact({
      kind: "seller",
      targetId: full.id,
      name: full.name,
      avatar: full.name.charAt(0).toUpperCase(),
      logoUrl: full.logo_url,
      subtitle: full.category?.label ?? "Empresa",
      whatsapp: wa,
    });
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
              <div className="pd-name">{full.name}</div>
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
                    <span className="upload-doc pd-video-thumb">
                      <Icon.Play size={22} />
                    </span>
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
              {reviewMsg && <div className="sr-msg">{reviewMsg}</div>}
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
