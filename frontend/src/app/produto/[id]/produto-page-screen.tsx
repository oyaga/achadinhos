"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { productsApi, getImageUrl } from "@/lib/api";
import { adaptProduct, ACHADINHOS_SELLER_NAME } from "@/lib/adapters";
import type { Product } from "@/lib/types";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";
import { useWhatsappHistory } from "@/hooks/use-whatsapp-history";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn, discountPct, formatBRL } from "@/lib/utils";
import { Icon } from "@/components/icons";
import { ProductDetail } from "@/components/shop/product-detail";
import { PortfolioViewer } from "@/components/screens/portfolio-viewer";
import { EntityPageShell, SectionHead, Stars } from "@/components/web/entity-page";

// /produto/[id] — página de verdade no desktop (Claude Design "Paginas
// Empresa e Produto", 2b): galeria + painel de compra fixo, "Sobre o
// produto" em 2 colunas, relacionados, rodapé. No mobile (<768px) continua o
// overlay ProductDetail.
export function ProdutoPageScreen({
  product,
  sellerId,
}: {
  product: Product;
  sellerId?: string;
}) {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { toggle: toggleFavRaw, isFav } = useFavorites();
  const { toast, showToast } = useToast();
  const { record } = useWhatsappHistory();

  const [qty, setQty] = useState(1);
  const [related, setRelated] = useState<Product[]>([]);
  const [activePhoto, setActivePhoto] = useState(0);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);

  useEffect(() => {
    void productsApi
      .get(product.id)
      .then((res) => setRelated((res.related_products ?? []).map(adaptProduct)))
      .catch(() => {});
  }, [product.id]);

  const photos = product.photos ?? [];
  const photo = photos[activePhoto] ?? photos[0];
  const total = formatBRL(product.price * qty);
  const hasWhatsapp = product.whatsapp.trim().length > 0;
  const hasLink = product.link.trim().length > 0;
  const isAchadinhos = product.seller === ACHADINHOS_SELLER_NAME;
  const sellerHref = sellerId ? `/empresa/${sellerId}` : null;

  const fav = isFav(product.id);
  const toggleFav = () => {
    const added = toggleFavRaw(product.id, "product");
    showToast(added ? "Produto salvo ✦" : "Removido dos favoritos");
  };

  const openWhatsapp = () => {
    const msg = encodeURIComponent(
      product.price > 0
        ? `Olá! Tenho interesse no produto: ${product.name} — ${formatBRL(product.price)} (qtd: ${qty}). Total: ${total}.`
        : `Olá! Tenho interesse no produto: ${product.name}. Pode me passar mais informações?`,
    );
    window.open(`https://wa.me/55${product.whatsapp}?text=${msg}`, "_blank", "noopener,noreferrer");
    record({
      kind: "product",
      targetId: product.id,
      name: product.name,
      avatar: product.name.charAt(0).toUpperCase(),
      subtitle: product.seller,
      whatsapp: product.whatsapp,
    });
    showToast("Abrindo WhatsApp da revenda");
  };
  const openLink = () => {
    window.open(product.link, "_blank", "noopener,noreferrer");
    showToast("Abrindo link da revenda");
  };
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      showToast("Link copiado ✦");
    } catch {
      /* cancelado pelo usuário */
    }
  };

  return (
    <main className="route-page entity-page">
      <EntityPageShell
        crumbs={[
          { label: "Início", href: "/" },
          { label: "Shopping", href: "/" },
          { label: product.seller, href: sellerHref ?? undefined },
          { label: product.name },
        ]}
      >
        <div className="entity-stack">
          <div className="entity-grid entity-grid--product">
            {/* ── Galeria ── */}
            <div className="eprod-gallery">
              <div className="eprod-main">
                {photo ? (
                  <button
                    type="button"
                    className="eprod-main-btn"
                    onClick={() => setViewerUrl(photo.url)}
                    aria-label="Ampliar foto"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={getImageUrl(photo.url)} alt={product.name} loading="eager" decoding="async" />
                  </button>
                ) : (
                  <div className="eprod-main-letter">{product.name.charAt(0)}</div>
                )}
                {product.badge && <span className="eprod-badge">{product.badge}</span>}
              </div>
              {photos.length > 1 && (
                <div className="eprod-thumbs">
                  {photos.map((ph, i) => (
                    <button
                      key={ph.id ?? ph.url}
                      type="button"
                      className={cn("eprod-thumb", i === activePhoto && "active")}
                      onClick={() => setActivePhoto(i)}
                      aria-label={`Foto ${i + 1}`}
                      aria-pressed={i === activePhoto}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={getImageUrl(ph.url)} alt="" loading="lazy" decoding="async" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Painel de compra ── */}
            <aside className="entity-panel">
              <div className="entity-card entity-card--lg">
                <div className="eprod-seller">
                  <span className="eprod-seller-mark">{product.seller.charAt(0).toUpperCase()}</span>
                  {sellerHref ? (
                    <Link href={sellerHref} className="eprod-seller-name">{product.seller}</Link>
                  ) : (
                    <span className="eprod-seller-name">{product.seller}</span>
                  )}
                  <span className="entity-diamond" aria-hidden />
                  <span className="eprod-seller-meta">
                    {isAchadinhos ? "Achadinhos" : "Revenda parceira"}
                  </span>
                </div>

                <h1 className="eprod-h1">{product.name}</h1>

                <div className="eprod-rating-row">
                  <Stars value={product.reviews > 0 ? product.rating : 0} />
                  <span className="eprod-rating-text">
                    {product.reviews > 0
                      ? `${product.rating.toFixed(1).replace(".", ",")} · ${product.reviews} ${product.reviews === 1 ? "avaliação" : "avaliações"}`
                      : "Sem avaliações ainda"}
                  </span>
                  {product.stock && (
                    <span className="eprod-stock">
                      <Icon.Check size={13} /> {product.stock}
                    </span>
                  )}
                </div>

                {product.price > 0 && (
                  <div className="eprod-price">
                    {product.oldPrice && (
                      <div className="eprod-old-price">{formatBRL(product.oldPrice)}</div>
                    )}
                    <div className="eprod-price-row">
                      <div className="eprod-price-value">{formatBRL(product.price)}</div>
                      {product.oldPrice && (
                        <span className="eprod-discount">
                          <Icon.Tag size={11} /> {discountPct(product.price, product.oldPrice)}% OFF · economia de{" "}
                          {formatBRL(product.oldPrice - product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {product.price > 0 && (
                  <div className="eprod-qty">
                    <span className="entity-eyebrow-muted">Quantidade</span>
                    <div className="eprod-stepper">
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        disabled={qty <= 1}
                        aria-label="Diminuir"
                      >
                        –
                      </button>
                      <span>{qty}</span>
                      <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Aumentar">
                        +
                      </button>
                    </div>
                    <span className="eprod-total">
                      <span className="entity-eyebrow-muted">Total</span>
                      <strong>{total}</strong>
                    </span>
                  </div>
                )}

                <div className="eprod-cta">
                  {hasLink ? (
                    <>
                      <button type="button" className="ebtn ebtn-primary" onClick={openLink}>
                        <Icon.ExternalLink size={14} /> Compre aqui
                      </button>
                      <div className="eprod-cta-note">
                        Produto de revenda com link — a compra acontece no site do vendedor.
                      </div>
                    </>
                  ) : hasWhatsapp ? (
                    <button type="button" className="ebtn ebtn-wa" onClick={openWhatsapp}>
                      <Icon.Whatsapp size={16} /> Comprar no WhatsApp
                    </button>
                  ) : (
                    <div className="eprod-cta-note">
                      Pedido pelo aplicativo — fale com a equipe do Achadinhos.
                    </div>
                  )}
                  <div className="eprod-cta-row">
                    <button
                      type="button"
                      className="ebtn ebtn-neutral"
                      onClick={toggleFav}
                      aria-pressed={fav}
                    >
                      <Icon.Heart size={15} filled={fav} className="entity-heart" />
                      {fav ? "Nos favoritos" : "Salvar nos favoritos"}
                    </button>
                    <button type="button" className="ebtn ebtn-neutral" onClick={share}>
                      <Icon.Share size={15} /> Compartilhar
                    </button>
                  </div>
                </div>
              </div>

              <div className="entity-card entity-card--soft eprod-guarantees">
                <span><Icon.Check size={14} /> Vendedor verificado pela Certificação Achadinhos</span>
                <span><Icon.Check size={14} /> Nota fiscal emitida pela revenda</span>
                <span><Icon.Check size={14} /> Frete sob consulta</span>
              </div>
            </aside>
          </div>

          <section>
            <SectionHead title="Sobre o produto" />
            <div className="entity-prose">
              {product.desc?.trim() && <p style={{ whiteSpace: "pre-wrap" }}>{product.desc}</p>}
              <p>
                {product.name}.{" "}
                {isAchadinhos
                  ? "Disponibilizado pelo Achadinhos do Condomínio. Use os botões ao lado para tratar pedido, frete e garantia com a equipe."
                  : `Vendido e enviado por ${product.seller}. Pagamento, frete e garantia tratados diretamente com a revenda. ${
                      hasLink
                        ? "Toque em “Compre aqui” para ir à página do produto."
                        : "Use o botão ao lado para conversar no WhatsApp com o vendedor."
                    }`}
              </p>
            </div>
          </section>

          {related.length > 0 && (
            <section>
              <SectionHead
                title="Itens relacionados"
                aside={sellerHref ? <Link href={sellerHref} className="entity-link">Ver a loja</Link> : undefined}
              />
              <div className="eprod-related">
                {related.map((r) => (
                  <Link key={r.id} href={`/produto/${r.id}`} className="entity-product-card">
                    <div className="entity-product-thumb">
                      {r.photos && r.photos.length > 0 ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={getImageUrl(r.photos[0].url)} alt={r.name} loading="lazy" decoding="async" />
                      ) : (
                        <span>{r.name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="entity-product-name">{r.name}</div>
                    <div className="entity-product-price">
                      {r.price > 0 ? formatBRL(r.price) : "Sob consulta"}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </EntityPageShell>

      {mounted && !isDesktop && (
        <ProductDetail
          product={product}
          isFav={fav}
          onBack={() => router.push("/")}
          onToggleFav={toggleFav}
          onShowToast={showToast}
          onRecordContact={record}
        />
      )}

      <PortfolioViewer url={viewerUrl} onClose={() => setViewerUrl(null)} />

      <div className={cn("toast", toast && "show")}>
        <Icon.Sparkle />
        {toast}
      </div>
    </main>
  );
}
