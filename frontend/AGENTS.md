<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Splash de abertura (vídeo)

O splash é um vídeo sem áudio (h264 yuv420p + faststart) que vive **fora do
React**, em `src/components/splash/splash-script.ts`, montado na home por
`splash-host.tsx` (`app/page.tsx`). O `<video>` vem pronto no HTML estático
(`SPLASH_HTML`), então o download começa no parse — antes do CSS e dos chunks
do React. O `<source media>` escolhe o corte: `public/splash-video-mobile-vN.mp4`
(9:16, <768px) ou `public/splash-video-vN.mp4` (16:9). O poster é o 1º quadro
de cada corte (`public/splash-poster[-mobile]-vN.jpg`), aplicado via CSS em
`.splash-overlay` (globals.css).

No celular o splash segura a API: `lib/splash-gate.ts` faz o `request()` de
`lib/api.ts` esperar o vídeo terminar de baixar (ou o splash sair, ou 15s)
antes de buscar os dados/imagens da home.

Ao trocar um vídeo: incremente o `-vN` do mp4 **e** do poster, e atualize
`SPLASH_HTML` (uma string literal só — o minificador do build corrompia a
versão concatenada) e os `url()` do `.splash-overlay`. O servidor Go serve
`splash-*` como `immutable`, e o service worker não intercepta `/splash-*`
(listener antes do Serwist em `sw.ts`: mídia com Range pelo worker quebra o
Safari/iOS). Os mp4 ficam fora do precache (`globPublicPatterns` no
`next.config.ts` lista só `png/ico/svg/webmanifest`) — ao adicionar mídia
pesada em `public/`, mantenha a extensão fora dessa lista.

Transcodifique com: `ffmpeg -i bruto.mp4 -an -c:v libx264 -preset slow
-crf 26 -pix_fmt yuv420p -movflags +faststart public/splash-video-vN.mp4`
(alvo ≤2MB) e o poster com `ffmpeg -i public/splash-video-vN.mp4 -vframes 1
-q:v 8 public/splash-poster-vN.jpg`. A cena 3D antiga (`scene-3d.tsx` +
`public/models/*.glb`) ficou no repo como legado, fora do bundle.

# [LEGADO] Modelo 3D do splash (public/models/mascote-v*.glb)

O mascote do splash 3D antigo vem de um .glb bruto (fora do repo). Ao regenerar,
otimize com meshopt + WebP e incremente o sufixo de versão para invalidar o
cache do service worker (`3d-models`, CacheFirst):

```bash
npx @gltf-transform/cli optimize <bruto>.glb frontend/public/models/mascote-vN.glb \
  --compress meshopt --texture-compress webp --texture-size 1024 --simplify-error 0.001
npx @gltf-transform/cli inspect frontend/public/models/mascote-vN.glb
```

Alvo ≤500KB (teto 1MB) — se passar, reduza `--texture-size` para 512 e/ou
aumente `--simplify-error`. Atualize `MODEL_URL` em
`src/components/splash/scene-3d.tsx`.
