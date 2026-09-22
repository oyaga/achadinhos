import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  // O default do Serwist ("**/*") joga TODO o public/ no precache do service
  // worker — incluindo os dois mp4 do splash (~3MB baixados de uma vez, no
  // celular também) e o .glb legado do splash 3D. Pior: o que sai do
  // precache vem como 200 inteiro, e o Safari/iOS exige 206 para mídia, então
  // o vídeo simplesmente não tocava no PWA. Mídia pesada fica fora daqui e é
  // cacheada sob demanda pela regra "splash-media" do sw.ts (com Range).
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
