"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { providersApi, sellersApi, type AdminSeller } from "@/lib/api";
import { adaptProvider } from "@/lib/adapters";
import type { CategoryId, Provider, Product, Route } from "@/lib/types";
import { useFavorites } from "@/hooks/use-favorites";
import { useToast } from "@/hooks/use-toast";
import { useInstallPrompt } from "@/hooks/use-install-prompt";
import { useWhatsappHistory } from "@/hooks/use-whatsapp-history";
import { Icon } from "./icons";
import { Header } from "./home/header";
import { LocationBar } from "./home/location-bar";
import { HeroSlider } from "./home/hero-slider";
import { CategoriesSection } from "./home/categories-section";
import { ProvidersSection } from "./home/providers-section";
import { FeaturedCompanies } from "./home/featured-companies";
import { BottomNav, type NavId } from "./home/bottom-nav";
import { SearchOverlay } from "./home/search-overlay";
import { InstallSheet } from "./home/install-sheet";
import { InstallBanner } from "./home/install-banner";
import { ProviderDetail } from "./screens/provider-detail";
import { SellerDetail } from "./screens/seller-detail";
import { CategoryScreen } from "./screens/category-screen";
import { AllCategoriesScreen } from "./screens/all-categories-screen";
import { HighlightsScreen } from "./screens/highlights-screen";
import { RateScreen } from "./screens/rate-screen";
import { FavoritesScreen } from "./screens/favorites-screen";
import { EventsScreen } from "./screens/events-screen";
import { ShoppingScreen } from "./shop/shopping-screen";
import { ProductDetail } from "./shop/product-detail";
import { ProfileScreen } from "./screens/profile-screen";
import { TopNav } from "./web/top-nav";
import { CategorySidebar, type FilterId } from "./web/category-sidebar";
import { SiteFooter } from "./web/site-footer";
import { cn } from "@/lib/utils";

interface AppProps {
  initialRoute?: Route;
}

export function App({ initialRoute }: AppProps = {}) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { toggle: toggleFavRaw, isFav } = useFavorites();
  const { toast, showToast } = useToast();
  const { canInstall, isIOS, isStandalone, promptInstall } = useInstallPrompt();
  const { record: recordWa } = useWhatsappHistory();

  const [activeCat, setActiveCat] = useState<CategoryId>("destaque");
  const [activeNav, setActiveNav] = useState<NavId>("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [installHelpOpen, setInstallHelpOpen] = useState(false);
  const [route, setRoute] = useState<Route>(initialRoute ?? { name: "home" });

  // The "+" button installs the PWA. Browsers with a native install prompt
  // (Android/Chrome) trigger it directly; iOS Safari has none, so we show the
  // "Add to Home Screen" instructions instead.
  const handleInstall = () => {
    if (canInstall) {
      void promptInstall();
    } else {
      setInstallHelpOpen(true);
    }
  };

  const navigate = (r: Route) => setRoute(r);
  // When the App was mounted on a deep-link page (e.g. /empresa/[id]) the
  // overlay's Back button should send the user back to the home URL instead
  // of just closing the overlay and leaving them on the entity URL.
  const back = () => {
    if (initialRoute && initialRoute.name !== "home") {
      router.push("/");
      return;
    }
    setRoute({ name: "home" });
  };

  const toggleProviderFav = (id: string) => {
    const wasAdded = toggleFavRaw(id, "provider");
    showToast(wasAdded ? "Salvo nos favoritos ✦" : "Removido dos favoritos");
  };
  const toggleProductFav = (id: string) => {
    const wasAdded = toggleFavRaw(id, "product");
    showToast(wasAdded ? "Produto salvo ✦" : "Removido dos favoritos");
  };
  const toggleSellerFav = (id: string) => {
    const wasAdded = toggleFavRaw(id, "seller");
    showToast(wasAdded ? "Empresa salva ✦" : "Removido dos favoritos");
  };

  const goCategory = (catId: CategoryId) => {
    setActiveCat(catId);
    if (catId === "destaque") navigate({ name: "highlights" });
    else if (catId === "shopping") navigate({ name: "shopping" });
    else navigate({ name: "category", categoryId: catId });
  };
  const goProvider = (provider: Provider) =>
    navigate({ name: "provider", provider });
  const goSeller = (seller: AdminSeller) =>
    navigate({ name: "seller", seller });
  const goRate = (provider: Provider) => navigate({ name: "rate", provider });

  const openWhatsapp = (provider: Provider) => {
    const msg = encodeURIComponent(
      `Olá! Encontrei vocês no Achadinhos do Condomínio. Posso pedir um orçamento?`
    );
    const url = `https://wa.me/55${provider.whatsapp}?text=${msg}`;
    window.open(url, "_blank", "noopener,noreferrer");
    recordWa({
      kind: "provider",
      targetId: provider.id,
      name: provider.name,
      avatar: provider.avatar,
      logoUrl: provider.logoUrl,
      subtitle: provider.catLabel,
      whatsapp: provider.whatsapp,
    });
    showToast("Abrindo WhatsApp do afiliado");
  };

  const onNavSelect = (id: NavId) => {
    if (id === "profile" && !isAuthenticated) {
      router.push("/login");
      return;
    }
    setActiveNav(id);
    if (id === "fav") navigate({ name: "favorites" });
    else if (id === "home") navigate({ name: "home" });
    else if (id === "events") navigate({ name: "events" });
    else if (id === "profile") navigate({ name: "profile" });
  };

  const [homeProviders, setHomeProviders] = useState<Provider[]>([]);
  const [homeSellers, setHomeSellers] = useState<AdminSeller[]>([]);
  const [activeFilters, setActiveFilters] = useState<Set<FilterId>>(new Set());

  const toggleFilter = (id: FilterId) =>
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Filtros da sidebar desktop, aplicados client-side sobre os recomendados.
  const filteredProviders = homeProviders.filter((p) => {
    if (activeFilters.has("verified") && !p.verified) return false;
    if (activeFilters.has("rating45") && p.rating < 4.5) return false;
    if (activeFilters.has("now") && !/min|agora|hora/i.test(p.responseTime || "")) return false;
    if (activeFilters.has("homologado") && !p.badge) return false;
    return true;
  });

  useEffect(() => {
    void providersApi.list({ limit: 6, sort: "rating" }).then((res) => {
      setHomeProviders(res.data.map(adaptProvider));
    }).catch(() => { /* silent — empty list */ });
    void sellersApi.list().then((s) => {
      setHomeSellers(s.slice(0, 6));
    }).catch(() => { /* silent — empty list */ });
  }, []);

  const onProductOpen = (p: Product) => navigate({ name: "product", product: p });

  return (
    <div className="device-frame">
      <TopNav
        onSearchClick={() => setSearchOpen(true)}
        // No desktop o perfil agora é página real (/perfil), com URL própria
        // e refresh/voltar do navegador funcionando.
        onProfile={() => router.push("/perfil")}
      />
      <div className="app">
        <div className="app-scroll">
          <Header onSearchClick={() => setSearchOpen(true)} />
          <div className="web-container">
            <div className="web-shell">
              <aside className="web-sidebar">
                <CategorySidebar
                  activeCat={activeCat}
                  onSelectCat={goCategory}
                  filters={activeFilters}
                  onToggleFilter={toggleFilter}
                />
              </aside>
              <div className="web-main">
                <LocationBar />
                <HeroSlider
                  onProvider={goProvider}
                  onProduct={onProductOpen}
                  onSeller={goSeller}
                  onWhatsapp={openWhatsapp}
                  onEvent={() => navigate({ name: "events" })}
                />
                <CategoriesSection
                  active={activeCat}
                  onSelect={goCategory}
                  onSeeAll={() => navigate({ name: "allcats" })}
                />
                <InstallBanner onInstall={handleInstall} />
                <ProvidersSection
                  providers={filteredProviders}
                  isFav={isFav}
                  onToggleFav={toggleProviderFav}
                  onProvider={goProvider}
                  onQuote={openWhatsapp}
                  sellers={homeSellers}
                  onSeller={goSeller}
                  onToggleSellerFav={toggleSellerFav}
                />
                <FeaturedCompanies
                  onSeller={goSeller}
                  isFav={isFav}
                  onToggleFav={toggleSellerFav}
                />
                <Link href="/certificacao" className="home-cert-link">
                  <Icon.Award size={16} />
                  <span>
                    Selo verificado? Conheça a <strong>Certificação Achadinhos</strong>
                  </span>
                  <Icon.ChevRight size={15} />
                </Link>
                <div className="bottom-spacer" />
              </div>
            </div>
          </div>
          <SiteFooter
            authed={isAuthenticated}
            onShopping={() => navigate({ name: "shopping" })}
            onHighlights={() => navigate({ name: "highlights" })}
          />
        </div>

        <BottomNav
          active={activeNav}
          onSelect={onNavSelect}
          onInstall={handleInstall}
          authed={isAuthenticated}
        />

        <SearchOverlay
          open={searchOpen}
          query={searchQ}
          onQueryChange={setSearchQ}
          onClose={() => {
            setSearchOpen(false);
            setSearchQ("");
          }}
        />

        <InstallSheet
          open={installHelpOpen}
          onClose={() => setInstallHelpOpen(false)}
          isIOS={isIOS}
          isStandalone={isStandalone}
        />

        {/* Routed overlays */}
        {route.name === "provider" && (
          <ProviderDetail
            provider={route.provider}
            isFav={isFav(route.provider.id)}
            onBack={back}
            onToggleFav={toggleProviderFav}
            onRate={() => goRate(route.provider)}
            onWhatsapp={() => openWhatsapp(route.provider)}
          />
        )}
        {route.name === "seller" && (
          <SellerDetail
            seller={route.seller}
            onBack={back}
            isFav={isFav(route.seller.id)}
            onToggleFav={toggleSellerFav}
            onRecordContact={recordWa}
          />
        )}
        {route.name === "category" && (
          <CategoryScreen
            categoryId={route.categoryId}
            isFav={isFav}
            onBack={back}
            onProvider={goProvider}
            onSeller={goSeller}
            onToggleFav={toggleProviderFav}
            onToggleSellerFav={toggleSellerFav}
            onQuote={openWhatsapp}
          />
        )}
        {route.name === "allcats" && (
          <AllCategoriesScreen
            onBack={back}
            onSelect={goCategory}
            onSeller={goSeller}
          />
        )}
        {route.name === "highlights" && (
          <HighlightsScreen onBack={back} onProvider={goProvider} />
        )}
        {route.name === "rate" && (
          <RateScreen
            provider={route.provider}
            onBack={() =>
              navigate({ name: "provider", provider: route.provider })
            }
            onSent={() => {
              navigate({ name: "provider", provider: route.provider });
              showToast("Avaliação publicada ✦");
            }}
          />
        )}
        {route.name === "favorites" && (
          <FavoritesScreen
            isFav={isFav}
            onBack={() => {
              setActiveNav("home");
              back();
            }}
            onProvider={goProvider}
            onSeller={goSeller}
            onToggleFav={toggleProviderFav}
            onToggleSellerFav={toggleSellerFav}
          />
        )}
        {route.name === "events" && (
          <EventsScreen
            onBack={() => {
              setActiveNav("home");
              back();
            }}
          />
        )}
        {route.name === "shopping" && (
          <ShoppingScreen
            isFav={isFav}
            onBack={back}
            onProduct={onProductOpen}
            onToggleFav={toggleProductFav}
            onSeller={goSeller}
            onToggleSellerFav={toggleSellerFav}
          />
        )}
        {route.name === "product" && (
          <ProductDetail
            product={route.product}
            isFav={isFav(route.product.id)}
            onBack={() => navigate({ name: "shopping" })}
            onToggleFav={toggleProductFav}
            onShowToast={showToast}
            onRecordContact={recordWa}
          />
        )}
        {route.name === "profile" && (
          <ProfileScreen
            onBack={() => {
              setActiveNav("home");
              back();
            }}
          />
        )}

        <div className={cn("toast", toast && "show")}>
          <Icon.Sparkle />
          {toast}
        </div>
      </div>
    </div>
  );
}
