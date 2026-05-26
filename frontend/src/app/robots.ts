import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/login", "/cadastro"],
      },
    ],
    sitemap: "https://achadinhoscondominio.com.br/sitemap.xml",
    host: "https://achadinhoscondominio.com.br",
  };
}
