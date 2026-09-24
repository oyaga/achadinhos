import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
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
