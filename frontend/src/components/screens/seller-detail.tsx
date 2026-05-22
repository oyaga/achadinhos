"use client";

import { useEffect, useState } from "react";
import {
  sellersApi,
  getImageUrl,
  isPdf,
  type AdminSeller,
  type SellerReview,
} from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { Icon } from "../icons";
import { PortfolioViewer } from "./portfolio-viewer";

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
                    <img src={getImageUrl(url)} alt="Portfólio" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

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
            <div className="sr-avg">
              <Icon.Star size={15} />
              <strong>{avgRating.toFixed(1).replace(".", ",")}</strong>
              <span>· {reviews.length} avaliação(ões)</span>
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
