<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Splash de abertura (vídeo)

O splash agora é um vídeo (`public/splash-video-vN.mp4`, ~8s, sem áudio,
h264 yuv420p + faststart), tocado por `src/components/splash/splash-intro.tsx`.
Ao trocar o vídeo, incremente o sufixo `-vN` para invalidar o cache do
service worker (`splash-media`, CacheFirst) e atualize `VIDEO_URL`.
Transcodifique com: `ffmpeg -i bruto.mp4 -an -c:v libx264 -preset slow
-crf 26 -pix_fmt yuv420p -movflags +faststart public/splash-video-vN.mp4`
(alvo ≤2MB). A cena 3D antiga (`scene-3d.tsx` + `public/models/*.glb`)
ficou no repo como legado, fora do bundle.

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
