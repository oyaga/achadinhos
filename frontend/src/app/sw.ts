// Serwist service worker. Pre-caches build manifest and applies sensible
// runtime caching defaults.
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, ExpirationPlugin, NetworkOnly, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    // Vídeo do splash: o service worker NÃO se mete. Mídia é o caso em que
    // servir do Cache Storage dá mais problema que ganho — a resposta sai 200
    // inteira, e o <video> pede por pedaços (header Range). O Safari/iOS
    // recusa reproduzir sem um 206, e emular Range no worker (fatiar a
    // resposta cacheada) trocou um bug por outro. Deixando passar, cada
    // navegador usa seu caminho nativo de mídia contra o servidor Go, que já
    // faz 206 via http.ServeContent; as revisitas vêm do cache HTTP
    // (max-age=3600). A regra precisa existir mesmo assim, senão a requisição
    // cai no catch-all NetworkFirst do defaultCache e volta ao problema.
    {
      matcher: ({ url, sameOrigin }) =>
        sameOrigin && url.pathname.startsWith("/splash-video-"),
      handler: new NetworkOnly(),
    },
    // O .glb do splash 3D legado continua no CacheFirst: é imutável, pesado e
    // não é mídia com Range.
    {
      matcher: ({ url, sameOrigin }) =>
        sameOrigin && url.pathname.endsWith(".glb"),
      handler: new CacheFirst({
        cacheName: "splash-media",
        plugins: [
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
