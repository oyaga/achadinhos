// Serwist service worker. Pre-caches build manifest and applies sensible
// runtime caching defaults.
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

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
  // Desligado: com preload ligado o Safari/iOS às vezes aborta a navegação
  // (o PWA mostrava "This page couldn't load" ao voltar do /login para a
  // home). As páginas vêm do mesmo servidor Go; o ganho do preload é nulo
  // perto do custo de navegação quebrada.
  navigationPreload: false,
  // Navegação que falhou (rede engasgou, worker sem resposta) cai na home
  // pré-cacheada em vez do erro nativo do iOS — o app nunca "não carrega".
  fallbacks: {
    entries: [
      {
        url: "/",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
  runtimeCaching: [
    ...defaultCache,
  ],
});

serwist.addEventListeners();
