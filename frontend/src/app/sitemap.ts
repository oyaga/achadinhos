import type { MetadataRoute } from "next";
import {
  categoriesApi,
  productsApi,
  providersApi,
  sellersApi,
} from "@/lib/api";
import { isPublicCategory } from "@/lib/utils";

export const dynamic = "force-static";

const BASE_URL = "https://achadinhoscondominio.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/certificacao`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/termos`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacidade`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const safe = async <T,>(fn: () => Promise<T>): Promise<T | null> => {
    try {
      return await fn();
    } catch {
      return null;
    }
  };

  const [cats, sellers, providers, products] = await Promise.all([
    safe(() => categoriesApi.list()),
    safe(() => sellersApi.list()),
    safe(() => providersApi.list({ limit: 1000 })),
    safe(() => productsApi.list({ limit: 1000 })),
  ]);

  if (cats) {
    for (const c of cats.filter(isPublicCategory)) {
      entries.push({
        url: `${BASE_URL}/categoria/${c.id}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }
  if (sellers) {
    for (const s of sellers) {
      entries.push({
        url: `${BASE_URL}/empresa/${s.id}`,
        lastModified: s.created_at ? new Date(s.created_at) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }
  if (providers) {
    for (const p of providers.data) {
      entries.push({
        url: `${BASE_URL}/prestador/${p.id}`,
        lastModified: p.created_at ? new Date(p.created_at) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }
  if (products) {
    for (const p of products.data) {
      entries.push({
        url: `${BASE_URL}/produto/${p.id}`,
        lastModified: p.created_at ? new Date(p.created_at) : now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
