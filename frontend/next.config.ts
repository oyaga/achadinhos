import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

// Muda a cada build: invalida a cópia pré-cacheada da home no update do SW.
const buildRevision = Date.now().toString(36);

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  // O HTML da home no precache: navegação para "/" (inclusive o "voltar" do
  // PWA no iOS) sai do cache na hora, sem depender da rede — e é o alvo do
  // fallback de navegação do sw.ts quando outra página falha ao carregar.
  additionalPrecacheEntries: [{ url: "/", revision: buildRevision }],
  // O default do Serwist ("**/*") joga TODO o public/ no precache do service
  // worker — incluindo os arquivos da abertura 3D (módulo + .glb, ~600KB) e
  // o .glb legado, baixados de uma vez até por quem nunca verá a abertura. Na
  // época do vídeo era pior: o que sai do precache vem como 200 inteiro, e o
  // Safari/iOS exige 206 para mídia. Arquivo pesado fica fora daqui e é
  // baixado direto do servidor (o sw.ts não intercepta /splash-*).
  // O glob não aceita negação, então a lista é por extensão; sw.js e
  // swe-worker-*.js já são ignorados pelo próprio Serwist.
  globPublicPatterns: ["**/*.{png,ico,svg,webmanifest}"],
});

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default withSerwist(nextConfig);
