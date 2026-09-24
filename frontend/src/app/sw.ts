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

// Arquivos da abertura (/splash-*: módulo 3D, modelo e poster): o service
// worker NÃO se mete. São versionados no nome e o servidor Go os serve como
// immutable, então o cache HTTP já resolve as revisitas; passar pelo worker
// só atrasaria o 1º acesso, que é justamente quando a abertura toca. (Na
// época do vídeo havia outro motivo: mídia com Range pelo worker quebrava o
// Safari/iOS.) Mesmo um NetworkOnly ainda chama respondWith(); este listener,
// registrado ANTES do Serwist, encerra o evento sem responder.
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
