"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { providersApi } from "@/lib/api";
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
import { BottomNav, type NavId } from "./home/bottom-nav";
import { SearchOverlay } from "./home/search-overlay";
import { ProviderDetail } from "./screens/provider-detail";
import { CategoryScreen } from "./screens/category-screen";
import { AllCategoriesScreen } from "./screens/all-categories-screen";
import { HighlightsScreen } from "./screens/highlights-screen";
import { RateScreen } from "./screens/rate-screen";
import { FavoritesScreen } from "./screens/favorites-screen";
import { OrdersScreen } from "./screens/orders-screen";
import { ShoppingScreen } from "./shop/shopping-screen";
import { ProductDetail } from "./shop/product-detail";
import { ProfileScreen } from "./screens/profile-screen";
import { TopNav } from "./web/top-nav";
import { cn } from "@/lib/utils";

export function App() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { toggle: toggleFavRaw, isFav } = useFavorites();
  const { toast, showToast } = useToast();
  const { canInstall, promptInstall } = useInstallPrompt();
  const { history: waHistory, record: recordWa, clear: clearWa } = useWhatsappHistory();

  const [activeCat, setActiveCat] = useState<CategoryId>("destaque");
  const [activeNav, setActiveNav] = useState<NavId>("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [route, setRoute] = useState<Route>({ name: "home" });

  const navigate = (r: Route) => setRoute(r);
  const back = () => setRoute({ name: "home" });

  const toggleProviderFav = (id: string) => {
    const wasAdded = toggleFavRaw(id);
    showToast(wasAdded ? "Salvo nos favoritos ✦" : "Removido dos favoritos");
  };
  const toggleProductFav = (id: string) => {
    const wasAdded = toggleFavRaw(id);
    showToast(wasAdded ? "Produto salvo ✦" : "Removido dos favoritos");
  };

  const goCategory = (catId: CategoryId) => {
    setActiveCat(catId);
    if (catId === "destaque") navigate({ name: "highlights" });
    else if (catId === "shopping") navigate({ name: "shopping" });
    else navigate({ name: "category", categoryId: catId });
  };
  const goProvider = (provider: Provider) =>
    navigate({ name: "provider", provider });
  const goRate = (provider: Provider) => navigate({ name: "rate", provider });

  const openWhatsapp = (provider: Provider) => {
    const msg = encodeURIComponent(
      `Olá! Encontrei vocês no Achadinhos do Condomínio. Posso pedir um orçamento?`
    );
    const url = `https://wa.me/55${provider.whatsapp}?text=${msg}`;
    window.open(url, "_blank", "noopener,noreferrer");
    recordWa(provider);
    showToast("Abrindo WhatsApp do prestador");
  };

  const onNavSelect = (id: NavId) => {
    if (id === "profile" && !isAuthenticated) {
      router.push("/login");
      return;
    }
    setActiveNav(id);
    if (id === "fav") navigate({ name: "favorites" });
    else if (id === "home") navigate({ name: "home" });
    else if (id === "orders") navigate({ name: "orders" });
    else if (id === "profile") navigate({ name: "profile" });
  };

  const [homeProviders, setHomeProviders] = useState<Provider[]>([]);

  useEffect(() => {
    void providersApi.list({ limit: 6, sort: "rating" }).then((res) => {
      setHomeProviders(res.data.map(adaptProvider));
    }).catch(() => { /* silent — empty list */ });
  }, []);

  const onProductOpen = (p: Product) => navigate({ name: "product", product: p });

  return (
    <div className="device-frame">
      <TopNav
        onSearchClick={() => setSearchOpen(true)}
        onProfile={() => {
          setActiveNav("profile");
          navigate({ name: "profile" });
        }}
      />
      <div className="app">
        <div className="app-scroll">
          <Header onSearchClick={() => setSearchOpen(true)} />
          <div className="web-container">
            <LocationBar />
            <HeroSlider onProvider={goProvider} onProduct={onProductOpen} />
            <CategoriesSection
              active={activeCat}
              onSelect={goCategory}
              onSeeAll={() => navigate({ name: "allcats" })}
            />
            <ProvidersSection
              providers={homeProviders}
              isFav={isFav}
              onToggleFav={toggleProviderFav}
              onProvider={goProvider}
            />
            <div className="bottom-spacer" />
          </div>
        </div>

        <BottomNav
          active={activeNav}
          onSelect={onNavSelect}
          onAddClick={() => setSearchOpen(true)}
          canInstall={canInstall}
          onInstall={() => void promptInstall()}
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
        {route.name === "category" && (
          <CategoryScreen
            categoryId={route.categoryId}
            isFav={isFav}
            onBack={back}
            onProvider={goProvider}
            onToggleFav={toggleProviderFav}
          />
        )}
        {route.name === "allcats" && (
          <AllCategoriesScreen onBack={back} onSelect={goCategory} />
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
            onToggleFav={toggleProviderFav}
          />
        )}
        {route.name === "orders" && (
          <OrdersScreen
            history={waHistory}
            onBack={() => {
              setActiveNav("home");
              back();
            }}
            onClear={clearWa}
          />
        )}
        {route.name === "shopping" && (
          <ShoppingScreen
            isFav={isFav}
            onBack={back}
            onProduct={onProductOpen}
            onToggleFav={toggleProductFav}
          />
        )}
        {route.name === "product" && (
          <ProductDetail
            product={route.product}
            isFav={isFav(route.product.id)}
            onBack={() => navigate({ name: "shopping" })}
            onToggleFav={toggleProductFav}
            onShowToast={showToast}
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
