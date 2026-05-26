import type { AdminSeller, ApiProduct } from "@/lib/api";
import type { ApiProvider } from "@/lib/api";

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE = "https://achadinhoscondominio.com.br";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Achadinhos do Condomínio",
  alternateName: "Achadinhos",
  url: SITE,
  logo: `${SITE}/icon-logo-achadinhos-do-condominio.png`,
  description:
    "Marketplace que conecta síndicos a prestadores de serviço e fornecedores de produtos para condomínios.",
  areaServed: { "@type": "Country", name: "Brasil" },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Achadinhos do Condomínio",
  url: SITE,
  inLanguage: "pt-BR",
};

function absoluteImage(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  return `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
}

export function sellerLocalBusinessSchema(seller: AdminSeller): Record<string, unknown> {
  const url = `${SITE}/empresa/${seller.id}`;
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name: seller.name,
    url,
    description: seller.description ?? undefined,
    image: absoluteImage(seller.logo_url),
    telephone: seller.whatsapp ? `+55${seller.whatsapp.replace(/\D+/g, "")}` : undefined,
    sameAs: seller.link ? [seller.link] : undefined,
  };
  if (seller.rating && seller.reviews_count) {
    out.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: seller.rating,
      reviewCount: seller.reviews_count,
    };
  }
  if (seller.category?.label) {
    out.makesOffer = { "@type": "Offer", category: seller.category.label };
  }
  return out;
}

export function providerLocalBusinessSchema(provider: ApiProvider): Record<string, unknown> {
  const url = `${SITE}/prestador/${provider.id}`;
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name: provider.name,
    url,
    description: provider.description,
    image: absoluteImage(provider.logo_url),
    telephone: provider.whatsapp ? `+55${provider.whatsapp.replace(/\D+/g, "")}` : undefined,
  };
  if (provider.rating && provider.reviews_count) {
    out.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: provider.rating,
      reviewCount: provider.reviews_count,
    };
  }
  if (provider.category?.label) {
    out.areaServed = provider.category.label;
  }
  return out;
}

export function productSchema(product: ApiProduct): Record<string, unknown> {
  const url = `${SITE}/produto/${product.id}`;
  const image = absoluteImage(product.photos?.[0]?.url);
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": url,
    name: product.name,
    url,
    image,
    brand: product.manufacturer
      ? { "@type": "Brand", name: product.manufacturer }
      : undefined,
    category: product.category,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "BRL",
      price: product.price,
      availability:
        product.stock === "out-of-stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      seller: product.seller?.name
        ? { "@type": "Organization", name: product.seller.name }
        : undefined,
    },
  };
  if (product.rating && product.reviews_count) {
    out.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews_count,
    };
  }
  return out;
}

export function categoryCollectionSchema(opts: {
  id: string;
  label: string;
  description?: string;
  itemCount?: number;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE}/categoria/${opts.id}`,
    name: opts.label,
    description:
      opts.description ??
      `Fornecedores e prestadores de ${opts.label.toLowerCase()} no Achadinhos do Condomínio.`,
    url: `${SITE}/categoria/${opts.id}`,
    isPartOf: { "@id": SITE },
  };
}
