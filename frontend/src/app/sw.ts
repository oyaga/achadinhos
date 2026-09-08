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

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    // Mídia do splash (vídeo mp4 versionado; antes o .glb do 3D) é imutável
    // e pesada; sem esta regra cairia no catch-all NetworkFirst do preset.
    {
      matcher: ({ url, sameOrigin }) =>
        sameOrigin &&
        (url.pathname.endsWith(".glb") ||
          url.pathname.startsWith("/splash-video-")),
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
