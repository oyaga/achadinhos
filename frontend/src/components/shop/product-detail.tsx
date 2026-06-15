"use client";

import { useEffect, useState } from "react";
import { productsApi, getImageUrl } from "@/lib/api";
import { adaptProduct, ACHADINHOS_SELLER_NAME } from "@/lib/adapters";
import type { Product } from "@/lib/types";
import type { ContactInput } from "@/hooks/use-whatsapp-history";
import { discountPct, formatBRL } from "@/lib/utils";
import { Icon } from "../icons";
import { PortfolioViewer } from "../screens/portfolio-viewer";

interface ProductDetailProps {
  product: Product;
  isFav: boolean;
  onBack: () => void;
  onToggleFav: (id: string) => void;
  onShowToast: (msg: string) => void;
  onRecordContact: (input: ContactInput) => void;
}

export function ProductDetail({
  product,
  isFav,
  onBack,
  onToggleFav,
  onShowToast,
  onRecordContact,
}: ProductDetailProps) {
  const [qty, setQty] = useState(1);
  const [related, setRelated] = useState<Product[]>([]);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const total = formatBRL(product.price * qty);
  const photos = product.photos ?? [];
  const extraPhotos = photos.slice(1);

  useEffect(() => {
    void productsApi.get(product.id).then((res) => {
      setRelated((res.related_products ?? []).map(adaptProduct));
    }).catch(() => {});
  }, [product.id]);

  const hasWhatsapp = product.whatsapp.trim().length > 0;
  const hasLink = product.link.trim().length > 0;
  const isAchadinhos = product.seller === ACHADINHOS_SELLER_NAME;

  const openWhatsapp = () => {
    const msg = encodeURIComponent(
      product.price > 0
        ? `Olá! Tenho interesse no produto: ${product.name} — ${formatBRL(product.price)} (qtd: ${qty}). Total: ${total}.`
        : `Olá! Tenho interesse no produto: ${product.name}. Pode me passar mais informações?`
    );
    const url = `https://wa.me/55${product.whatsapp}?text=${msg}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onRecordContact({
      kind: "product",
      targetId: product.id,
      name: product.name,
      avatar: product.name.charAt(0).toUpperCase(),
      subtitle: product.seller,
      whatsapp: product.whatsapp,
    });
    onShowToast("Abrindo WhatsApp da revenda");
  };
  const openLink = () => {
    window.open(product.link, "_blank", "noopener,noreferrer");
    onShowToast("Abrindo link da revenda");
  };

  return (
    <div className="screen product-detail-screen">
      <div className="screen-header transparent-header">
        <button
          type="button"
          className="screen-back floating"
          onClick={onBack}
          aria-label="Voltar"
        >
          <Icon.ChevLeft size={16} />
        </button>
        <div style={{ flex: 1 }} />
        <button
          type="button"
          className="icon-btn floating"
          onClick={() => onToggleFav(product.id)}
          aria-label="Favoritar"
        >
          <Icon.Heart size={16} filled={isFav} />
        </button>
        <button
          type="button"
          className="icon-btn floating"
          aria-label="Compartilhar"
        >
          <Icon.Share size={16} />
        </button>
      </div>

      <div className="screen-body" style={{ paddingTop: 0, padding: 0 }}>
        <div className="pd-hero" data-cat={product.cat}>
          {photos.length > 0 ? (
            <button
              type="button"
              onClick={() => setViewerUrl(photos[0].url)}
              className="pd-hero-btn"
              aria-label="Ampliar foto"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getImageUrl(photos[0].url)}
                alt={product.name}
                className="pd-hero-img"
                loading="eager"
                decoding="async"
              />
            </button>
          ) : (
            <div className="pd-hero-letter">{product.name.charAt(0)}</div>
          )}
          {product.badge && (
            <div className="pd-hero-badge">{product.badge}</div>
          )}
        </div>

        <div
          className="pd-section product-detail-info"
          style={{ padding: "0 16px" }}
        >
          {product.tag && <div className="product-tag big">{product.tag}</div>}
          <h2 className="pd-name">{product.name}</h2>
          <div className="pd-seller-row">
            <div className="pd-seller-avatar">{product.seller.charAt(0)}</div>
            <div>
              <div className="pd-seller-name">{product.seller}</div>
              <div className="pd-seller-meta">
                {isAchadinhos ? "Achadinhos" : "Revenda parceira"} · {product.stock}
              </div>
            </div>
            <div className="pd-rating-pill">
              <Icon.Star size={11} filled />{" "}
              {product.rating.toFixed(1).replace(".", ",")}
              <span className="pd-rating-count">({product.reviews})</span>
            </div>
          </div>

          {product.price > 0 && (
            <div className="pd-price-block">
              {product.oldPrice && (
                <div className="pd-old-price">{formatBRL(product.oldPrice)}</div>
              )}
              <div className="pd-price">{formatBRL(product.price)}</div>
              {product.oldPrice && (
                <div className="pd-discount">
                  <Icon.Tag size={11} />{" "}
                  {discountPct(product.price, product.oldPrice)}% OFF · economia de{" "}
                  {formatBRL(product.oldPrice - product.price)}
                </div>
              )}
            </div>
          )}

          {product.price > 0 && (
          <div className="pd-qty-row">
            <span className="pd-qty-label">Quantidade</span>
            <div className="pd-qty-stepper">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Diminuir"
              >
                –
              </button>
              <span>{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Aumentar"
              >
                +
              </button>
            </div>
            <span className="pd-total">
              Total <strong>{total}</strong>
            </span>
          </div>
          )}
        </div>

        {extraPhotos.length > 0 && (
          <div className="pd-section" style={{ padding: "22px 16px 0" }}>
            <h3>Mais fotos</h3>
            <div className="pd-portfolio">
              {extraPhotos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setViewerUrl(photo.url)}
                  className="pd-portfolio-item"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getImageUrl(photo.url)}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pd-section" style={{ padding: "22px 16px 0" }}>
          <h3>Sobre o produto</h3>
          {product.desc?.trim() && (
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--ink-700)", whiteSpace: "pre-wrap" }}>
              {product.desc}
            </p>
          )}
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: "var(--ink-700)",
            }}
          >
            {product.name}.{" "}
            {isAchadinhos
              ? "Disponibilizado pelo Achadinhos do Condomínio. Use os botões abaixo para tratar pedido, frete e garantia com a equipe."
              : `Vendido e enviado por ${product.seller}. Pagamento, frete e garantia tratados diretamente com a revenda. Use os botões abaixo para ir ao link do produto ou conversar no WhatsApp com o vendedor.`}
          </p>
          <div className="pd-features">
            <div className="pd-feature">
              <Icon.Check size={12} /> Vendedor verificado
            </div>
            <div className="pd-feature">
              <Icon.Check size={12} /> Nota fiscal emitida
            </div>
            <div className="pd-feature">
              <Icon.Check size={12} /> Frete sob consulta
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="pd-section" style={{ padding: "22px 16px 0" }}>
            <h3>Itens relacionados</h3>
            <div className="related-row">
              {related.map((r) => (
                <button
                  type="button"
                  key={r.id}
                  className="related-card"
                  style={{ textAlign: "left", display: "block" }}
                >
                  <div className="related-thumb" data-cat={r.cat}>
                    {r.name.charAt(0)}
                  </div>
                  <div className="related-name">{r.name}</div>
                  <div className="related-price">{formatBRL(r.price)}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ height: "calc(120px + var(--bottom-nav-h, 0px))" }} />
      </div>

      <div className="sticky-cta product-cta">
        {hasLink && (
          <button
            type="button"
            className="btn-secondary product-btn-link"
            onClick={openLink}
          >
            <Icon.ExternalLink size={14} /> Ver na revenda
          </button>
        )}
        {hasWhatsapp && (
          <button type="button" className="btn-whatsapp" onClick={openWhatsapp}>
            <Icon.Whatsapp size={16} /> Comprar no WhatsApp
          </button>
        )}
        {!hasLink && !hasWhatsapp && (
          <div className="product-cta-empty">
            Pedido pelo aplicativo — fale com a equipe do Achadinhos.
          </div>
        )}
      </div>

      <PortfolioViewer url={viewerUrl} onClose={() => setViewerUrl(null)} />
    </div>
  );
}
