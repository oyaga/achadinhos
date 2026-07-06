import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Crawlers de IA (treinamento e agentes) proibidos de acessar o site inteiro.
// É só um sinal para bots educados — os mal-comportados são barrados pelo
// middleware AntiBot do backend e pelo Cloudflare.
const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Bytespider",
  "cohere-ai",
  "meta-externalagent",
  "FacebookBot",
  "Amazonbot",
  "AI2Bot",
  "Diffbot",
  "omgilibot",
  "YouBot",
  "MistralAI-User",
  "FirecrawlAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: aiCrawlers,
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/login", "/cadastro", "/api/"],
      },
    ],
    sitemap: "https://achadinhoscondominio.com.br/sitemap.xml",
    host: "https://achadinhoscondominio.com.br",
  };
}
