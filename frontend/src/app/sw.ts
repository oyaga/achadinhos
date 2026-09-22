// Serwist service worker. Pre-caches build manifest and applies sensible
// runtime caching defaults.
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import {
  CacheFirst,
  ExpirationPlugin,
  RangeRequestsPlugin,
  Serwist,
} from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

// O <video> pede o arquivo por pedaços (header Range). Buscar a origem com
// esse header devolveria um 206, que a Cache API se recusa a guardar — então
// o fetch sai sem ele e o cache fica com o arquivo inteiro, que o
// RangeRequestsPlugin fatia na hora de servir.
const dropRangeHeader = {
  requestWillFetch: async ({ request }: { request: Request }) => {
    if (!request.headers.has("range")) return request;
    const headers = new Headers(request.headers);
    headers.delete("range");
    return new Request(request, { headers });
  },
};

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    // Mídia do splash (vídeo mp4 versionado; antes o .glb do 3D) é imutável
    // e pesada: fica fora do precache (ver globPublicPatterns no
    // next.config.ts) e é baixada só quando o aparelho vai de fato tocá-la —
    // o celular não puxa mais o corte de desktop junto. O RangeRequestsPlugin
    // é obrigatório: sem ele a resposta sai 200 inteira e o Safari/iOS, que
    // exige 206 para mídia, não toca o vídeo.
    {
      matcher: ({ url, sameOrigin }) =>
        sameOrigin &&
        (url.pathname.endsWith(".glb") ||
          url.pathname.startsWith("/splash-video-")),
      handler: new CacheFirst({
        cacheName: "splash-media",
        plugins: [
          dropRangeHeader,
          new RangeRequestsPlugin(),
          new ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          }),
        ],
      }),
    },
    ...defaultCache,
  ],
});

serwist.addEventListeners();
