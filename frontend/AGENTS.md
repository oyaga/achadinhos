<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Modelo 3D do splash (public/models/mascote-v*.glb)

O mascote do splash de abertura vem de um .glb bruto (fora do repo). Ao regenerar,
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
