import type { Provider, Review, Product } from "./types";
import type { ApiProvider, ApiReview, ApiProduct } from "./api";

export function adaptProvider(p: ApiProvider): Provider {
  return {
    id: p.id,
    name: p.name,
    cat: p.category_id,
    catLabel: p.category?.label ?? p.category_id,
    avatar: p.avatar,
    rating: p.rating,
    reviews: p.reviews_count,
    badge: p.badge as Provider["badge"],
    verified: p.verified,
    distance: p.distance_label,
    price: p.price_label,
    responseTime: p.response_time_label,
    desc: p.description,
    services: p.services ?? [],
    yearsActive: p.years_active,
    jobsDone: p.jobs_done,
    whatsapp: p.whatsapp,
    highlight: p.highlight,
  };
}

export function adaptReview(r: ApiReview): Review {
  return {
    id: r.id,
    providerId: r.provider_id,
    user: r.user?.name ?? "Usuário",
    condo: "",
    rating: r.rating,
    date: r.created_at,
    text: r.text,
    verified: r.verified,
    helpful: r.helpful_count,
    tags: r.tags ?? [],
  };
}

export function adaptProduct(p: ApiProduct): Product {
  return {
    id: p.id,
    name: p.name,
    cat: p.category as Product["cat"],
    price: p.price,
    oldPrice: p.old_price ?? undefined,
    rating: p.rating,
    reviews: p.reviews_count,
    seller: p.seller?.name ?? "",
    tag: p.tag,
    whatsapp: p.whatsapp_override ?? p.seller?.whatsapp ?? "",
    link: p.link_override ?? p.seller?.link ?? "",
    badge: p.badge as "OFERTA" | undefined,
    stock: p.stock,
    manufacturer: p.manufacturer,
    photos: p.photos,
  };
}
