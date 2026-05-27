"use client";

import { useEffect, useRef, useState } from "react";
import { providersApi, productsApi, sellersApi, getImageUrl, type AdminSeller } from "@/lib/api";
import { adaptProvider, adaptProduct } from "@/lib/adapters";
import type { Provider, Product } from "@/lib/types";
import { Icon } from "../icons";

type SlideProvider = { kind: "provider"; data: Provider };
type SlideSeller   = { kind: "seller";   data: AdminSeller };
type SlideProduct  = { kind: "product";  data: Product  };
type Slide = SlideProvider | SlideSeller | SlideProduct;

interface HeroSliderProps {
  onProvider: (p: Provider) => void;
  onProduct:  (p: Product)  => void;
  onSeller:   (s: AdminSeller) => void;
}

export function HeroSlider({ onProvider, onProduct, onSeller }: HeroSliderProps) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch data
  useEffect(() => {
    void Promise.allSettled([
      providersApi.list({ highlight: true, sort: "rating", limit: 3 }),
      sellersApi.list({ highlight: true }),
      productsApi.list({ highlight: true, limit: 3 }),
    ]).then(([provRes, sellRes, prodRes]) => {
      const provSlides: SlideProvider[] =
        provRes.status === "fulfilled"
          ? provRes.value.data.map((p) => ({ kind: "provider", data: adaptProvider(p) }))
          : [];
      const sellSlides: SlideSeller[] =
        sellRes.status === "fulfilled"
          ? sellRes.value.map((s) => ({ kind: "seller", data: s }))
          : [];
      const prodSlides: SlideProduct[] =
        prodRes.status === "fulfilled"
          ? prodRes.value.data.map((p) => ({ kind: "product", data: adaptProduct(p) }))
          : [];
      setSlides([...sellSlides, ...provSlides, ...prodSlides]);
    });
  }, []);

  // Auto-advance
  function startTimer() {
    stopTimer();
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % Math.max(slides.length, 1));
    }, 4000);
  }
  function stopTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
  }

  useEffect(() => {
    if (slides.length > 1) startTimer();
    return stopTimer;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  // Sync scroll position when active changes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[active] as HTMLElement | undefined;
    if (child) {
      track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    }
  }, [active]);

  // Detect scroll-driven slide change
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const idx = Math.round(track.scrollLeft / track.offsetWidth);
        setActive(idx);
      }, 80);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); clearTimeout(timeout); };
  }, []);

  if (slides.length === 0) return <div className="hero-slider-skeleton" />;

  return (
    <div
      className="section"
      onMouseEnter={stopTimer}
      onMouseLeave={() => slides.length > 1 && startTimer()}
    >
      <div className="hero-slider">
        {/* Track */}
        <div className="hero-slider-track" ref={trackRef}>
          {slides.map((slide, i) =>
            slide.kind === "provider" ? (
              <ProviderSlide
                key={slide.data.id}
                provider={slide.data}
                index={i}
                onClick={() => onProvider(slide.data)}
              />
            ) : slide.kind === "seller" ? (
              <SellerSlide
                key={slide.data.id}
                seller={slide.data}
                index={i}
                onClick={() => onSeller(slide.data)}
              />
            ) : (
              <ProductSlide
                key={slide.data.id}
                product={slide.data}
                index={i}
                onClick={() => onProduct(slide.data)}
              />
            )
          )}
        </div>

        {/* Dots */}
        {slides.length > 1 && (
          <div className="hero-slider-dots" aria-label="Slides">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`hero-dot${i === active ? " active" : ""}`}
                onClick={() => { stopTimer(); setActive(i); }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Provider slide ────────────────────────────────────────────────────────────

function ProviderSlide({ provider: p, onClick }: { provider: Provider; index: number; onClick: () => void }) {
  return (
    <div className="hero hero-slide" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}>
      <div className="hero-slide-content">
        <div className="hero-tag">
          <Icon.Crown size={11} /> Destaque do dia
        </div>
        <div className="hero-title">{p.name}</div>
        <div className="hero-meta">
          <div className="hero-rating"><Icon.Star size={11} /> {p.rating.toFixed(1).replace(".", ",")}</div>
          <span className="hero-divider" />
          <span>{p.reviews} avaliações</span>
          <span className="hero-divider" />
          <span>{p.distance}</span>
        </div>
        {p.badge && <div className="hero-badge">{p.badge}</div>}
      </div>
      <div className="hero-slide-media">
        <div className="hero-avatar-ring">
          <span className="hero-avatar-letter">{p.avatar}</span>
        </div>
        <div className="hero-slide-cat">{p.catLabel}</div>
      </div>
    </div>
  );
}

// ── Seller slide ──────────────────────────────────────────────────────────────

function SellerSlide({ seller: s, onClick }: { seller: AdminSeller; index: number; onClick: () => void }) {
  return (
    <div className="hero hero-slide" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}>
      <div className="hero-slide-content">
        <div className="hero-tag">
          <Icon.Crown size={11} /> Empresa em destaque
        </div>
        <div className="hero-title">{s.name}</div>
        <div className="hero-meta">
          <span>{s.description?.trim() || "Empresa parceira"}</span>
        </div>
        {s.partner && <div className="hero-badge">Parceira</div>}
      </div>
      <div className="hero-slide-media">
        {s.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={getImageUrl(s.logo_url)} alt={s.name} className="hero-product-img" loading="lazy" decoding="async" />
        ) : (
          <div className="hero-avatar-ring">
            <span className="hero-avatar-letter">{s.name.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Product slide ─────────────────────────────────────────────────────────────

function ProductSlide({ product: p, onClick }: { product: Product; index: number; onClick: () => void }) {
  const photo = p.photos?.[0];
  return (
    <div className="hero hero-slide hero-slide--product" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}>
      <div className="hero-slide-content">
        <div className="hero-tag hero-tag--product">
          <Icon.Box size={11} /> Shopping em destaque
        </div>
        <div className="hero-title hero-title--product">{p.name}</div>
        <div className="hero-price-row">
          {p.oldPrice && (
            <span className="hero-old-price">
              R$ {p.oldPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
          <span className="hero-price">
            R$ {p.price.toFixed(2).replace(".", ",")}
          </span>
        </div>
        <div className="hero-meta">
          <div className="hero-rating"><Icon.Star size={11} /> {p.rating.toFixed(1).replace(".", ",")}</div>
          <span className="hero-divider" />
          <span>{p.reviews} avaliações</span>
          {p.badge && <><span className="hero-divider" /><span className="hero-oferta">{p.badge}</span></>}
        </div>
      </div>
      <div className="hero-slide-media">
        {photo ? (
          <img
            src={getImageUrl(photo.url)}
            alt={p.name}
            className="hero-product-img"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="hero-product-placeholder">
            <Icon.Box size={28} />
          </div>
        )}
      </div>
    </div>
  );
}
