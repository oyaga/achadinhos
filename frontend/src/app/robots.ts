import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Robôs de IA que coletam conteúdo para TREINAR modelos: proibidos. É só um
// sinal para bots educados — os mal-comportados são barrados pelo
// middleware AntiBot do backend.
const aiTrainingCrawlers = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
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
  "FirecrawlAgent",
];

// Assistentes de IA que buscam a página para RESPONDER a uma pessoa (busca e
// navegação a pedido): liberados, para o Achadinhos ser encontrado e
// identificado quando alguém pergunta sobre ele. Google-Extended e
// Applebot-Extended não são robôs, e sim a permissão para o Gemini e a Apple
// Intelligence usarem o que o Google/Apple já indexam. Liberados também no
// AntiBot (allowedAIAgentFragments).
const aiAnswerAgents = [
  "ChatGPT-User",
  "OAI-SearchBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "MistralAI-User",
  "DuckAssistBot",
  "Google-Extended",
  "Applebot-Extended",
];

const privatePaths = ["/admin", "/admin/", "/login", "/cadastro", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: aiTrainingCrawlers,
        disallow: "/",
      },
      {
        userAgent: aiAnswerAgents,
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
    ],
    sitemap: "https://achadinhoscondominio.com.br/sitemap.xml",
    host: "https://achadinhoscondominio.com.br",
  };
}
