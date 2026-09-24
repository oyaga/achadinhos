<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Splash de abertura (mascote 3D)

A abertura é o mascote-moeda em 3D dando um pulinho e acenando (~4s, só na
1ª visita da sessão). Vive **fora do React**, em três peças:

- `src/components/splash/splash-script.ts` — `SPLASH_HTML` (overlay + poster,
  no HTML estático da home via `splash-host.tsx`) e `SPLASH_SCRIPT` (inline,
  decide se a abertura toca, começa o download do `.glb`, injeta o módulo 3D,
  controla saída/prazos e segura a API no celular via `lib/splash-gate.ts`).
- `src/components/splash/splash-3d.ts` — a cena em three.js puro (sem R3F),
  empacotada à parte em `public/splash-3d-vN.js` por `npm run build:splash`
  (usa `bun build`). **Não é importada pelo Next**: rode o build:splash e
  commite o `.js` gerado sempre que mexer nela.
- `public/splash-mascote-vN.glb` (modelo + animações) e
  `public/splash-poster-3d-vN.webp` (1º quadro da cena, transparente, 720px).

O poster aparece no parse do HTML; quando a cena tem o 1º quadro desenhado,
o canvas entra por cima no mesmo enquadramento (palco quadrado, câmera fixa)
e a animação `BoasVindas` toca. Prazos em `config`: `loadMaxMs` (cena não
ficou pronta → sai só com o poster), `playMaxMs` (teto da animação) e
`holdMaxMs` (teto para segurar a API). A abertura é pulada com
`prefers-reduced-motion`, `deviceMemory <= 2` ou se já tocou na sessão.

Tudo com prefixo `splash-` é servido pelo Go como `immutable` e o service
worker não intercepta `/splash-*` (listener antes do Serwist em `sw.ts`) —
**ao trocar qualquer arquivo, incremente o `-vN`** e atualize `config`,
`SPLASH_HTML` (uma string literal só — o minificador corrompia a versão
concatenada) e o script `build:splash`. Mantenha `.glb/.js/.webp` fora de
`globPublicPatterns` no `next.config.ts` (precache).

## Regerar o modelo (Blender → web)

O arquivo-fonte é `Achadinhos_Pulo.blend` (fora do repo), com o rig e as ações
`BoasVindas` (aceno) e `Pulo` (pulo com giro, reservado para interações). No
Blender, selecione a coleção `Personagem` e exporte glTF binário com
"Apply Modifiers", animações em modo "Actions", "Always Sample" e imagens em
**WebP** (qualidade ~82). O contorno de desenho é a casca do modificador
Solidify com material `Contorno` — a cena troca esse material por uma cor
chapada, então mantenha o nome. Depois comprima com o gltfpack
(meshoptimizer), mantendo nomes de nós e materiais:

```bash
gltfpack -i mascote_bruto.glb -o public/splash-mascote-vN.glb -cc -kn -km
```

Alvo ≤500KB. Para o poster, renderize o 1º quadro da cena num palco de
720px com fundo transparente (headless Chromium com o rAF congelado serve) e
salve em WebP.

# [LEGADO] Splash 3D em R3F (scene-3d.tsx + public/models/mascote-v*.glb)

Primeira tentativa de abertura 3D, em React Three Fiber. Saiu porque dependia
da hidratação do React (5s+ no celular) e a abertura desistia antes de
aparecer. Ficou no repo, fora do bundle. O modelo antigo era otimizado com:

```bash
npx @gltf-transform/cli optimize <bruto>.glb frontend/public/models/mascote-vN.glb \
  --compress meshopt --texture-compress webp --texture-size 1024 --simplify-error 0.001
```
