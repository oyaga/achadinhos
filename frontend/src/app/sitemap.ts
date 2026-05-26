import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://achadinhoscondominio.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
