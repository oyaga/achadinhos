// Serwist service worker. Pre-caches build manifest and applies sensible
// runtime caching defaults.
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, ExpirationPlugin, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

// Vídeo e poster do splash: o service worker NÃO se mete. Mídia é o caso em
// que passar pelo worker dá mais problema que ganho — o <video> pede por
// pedaços (header Range) e o Safari/iOS é exigente com as respostas 206 que
// saem de um worker. Mesmo um NetworkOnly ainda chama respondWith(); este
// listener, registrado ANTES do Serwist, encerra o evento sem responder, e o
// navegador busca direto do servidor Go (206 via http.ServeContent), com as
// revisitas vindo do cache HTTP (immutable).
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin === self.location.origin && url.pathname.startsWith("/splash-")) {
    event.stopImmediatePropagation();
  }
});

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
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
