// ============== Domain types ==============

export type CategoryId =
  | "destaque"
  | "shopping"
  | "parceiros"
  | "seguranca"
  | "terceirizacao"
  | "portaria"
  | "facilities"
  | "manutencao"
  | "dedetizacao"
  | "armarios"
  | "limpeza"
  | "hidraulica"
  | "eletrica";

export type IconName =
  | "CatHighlight"
  | "CatShopping"
  | "CatPartners"
  | "CatSecurity"
  | "CatOutsource"
  | "CatPortaria"
  | "CatFacilities"
  | "CatMaintenance"
  | "CatPest"
  | "CatLocker"
  | "CatCleaning"
  | "CatPlumbing"
  | "CatElectric";

export interface Category {
  id: CategoryId;
  label: string;
  short: string;
  icon: IconName;
  badge?: "TOP" | "NOVO";
  count: number;
  desc?: string;
}

export interface Provider {
  id: string;
  name: string;
  cat: string;
  catLabel: string;
  avatar: string;
  logoUrl?: string;
  rating: number;
  reviews: number;
  badge?: "Ouro" | "Verificado" | "Top";
  verified: boolean;
  distance: string;
  price: string;
  responseTime: string;
  desc: string;
  services: string[];
  yearsActive: number;
  jobsDone: number;
  whatsapp: string;
  highlight?: boolean;
  portfolio?: string[];
}

export interface Review {
  id: string;
  providerId: string;
  user: string;
  condo: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  helpful: number;
  tags?: string[];
}

export type ShopCategoryId =
  | "all"
  | "limpeza"
  | "manutencao"
  | "epi"
  | "jardim"
  | "piscina"
  | "eletrica"
  | "escritorio";

export interface ShopCategory {
  id: ShopCategoryId;
  label: string;
  count: number;
}

export interface Product {
  id: string;
  name: string;
  cat: ShopCategoryId;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  seller: string;
  tag?: string;
  whatsapp: string;
  link: string;
  badge?: "OFERTA";
  stock: string;
  manufacturer?: string;
  photos?: import("./api").ProductPhoto[];
}

// ============== Routing (state-driven stack) ==============

export type Route =
  | { name: "home" }
  | { name: "provider"; provider: Provider }
  | { name: "category"; categoryId: CategoryId }
  | { name: "allcats" }
  | { name: "highlights" }
  | { name: "rate"; provider: Provider }
  | { name: "favorites" }
  | { name: "orders" }
  | { name: "shopping" }
  | { name: "product"; product: Product }
  | { name: "profile" };

export type RouteName = Route["name"];
