// Abertura 3D: o mascote-moeda entra com um pulinho e acena. Roda FORA do
// React e do bundle do Next — é empacotado à parte (`npm run build:splash`)
// em public/splash-3d-vN.js, que o SPLASH_SCRIPT (splash-script.ts) injeta só
// quando a abertura vai tocar. Assim a cena não espera a hidratação do app,
// que no celular levava 5s+ e matava a abertura 3D antiga (scene-3d.tsx).
//
// Contrato com o script inline (window.__achSplash3d):
//   glb     — Promise<ArrayBuffer> do modelo, cujo download o inline já
//             começou antes deste arquivo chegar;
//   stage   — elemento quadrado onde o <canvas> entra, por cima do poster
//             (1º quadro desta mesma cena, então a troca é invisível);
//   ready() — chamado com o 1º quadro já desenhado; devolve false se a
//             abertura já saiu (toque/timeout) e aí a cena se desmonta;
//   end()   — a animação terminou: o inline faz a saída do overlay;
//   cleanup — preenchido aqui; o inline chama depois do fade de saída.
import {
  ACESFilmicToneMapping,
  AnimationMixer,
  CanvasTexture,
  DirectionalLight,
  HemisphereLight,
  LoopOnce,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  type Material,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Ctl = {
  glb: Promise<ArrayBuffer>;
  stage: HTMLElement;
  ready: () => boolean;
  end: () => void;
  cleanup?: () => void;
};

const CLIP = "BoasVindas";
// O braço volta ao repouso ~0,4s antes do fim do clipe: sai daí.
const END_EARLY_S = 0.4;
// Enquadramento fixo para um palco quadrado: o poster é um print deste mesmo
// quadro, então os dois batem em qualquer tamanho de tela. Folga no topo
// para a mão do aceno não sair do canvas (era cortada com z=7.4).
const CAM_POS = new Vector3(0, 2.05, 8.3);
const CAM_TARGET = new Vector3(0, 1.95, 0);
const OUTLINE_COLOR = 0x4a2a06;

async function run(ctl: Ctl) {
  const buf = await ctl.glb;
  const gltf = await new GLTFLoader()
    .setMeshoptDecoder(MeshoptDecoder)
    .parseAsync(buf, "/");

  const stage = ctl.stage;
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = "splash-canvas";

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room, 0.04).texture;
  room.dispose();
  pmrem.dispose();
  scene.environment = env;
  scene.environmentIntensity = 0.45;

  scene.add(new HemisphereLight(0xfff1d0, 0x1c2a4d, 0.7));
  const key = new DirectionalLight(0xffe7c2, 2.4);
  key.position.set(-3.5, 6, 6);
  scene.add(key);
  const rim = new DirectionalLight(0xcfe0ff, 2.2);
  rim.position.set(4, 4, -5);
  scene.add(rim);

  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.copy(CAM_POS);
  camera.lookAt(CAM_TARGET);

  // Contorno de desenho: no Blender é uma casca com normais invertidas
  // (modificador Solidify) — aqui só trocamos o material por uma cor chapada;
  // o culling de face de trás faz o resto.
  const outline = new MeshBasicMaterial({ color: OUTLINE_COLOR, toneMapped: false });
  const model = gltf.scene;
  model.traverse((o) => {
    const m = o as Mesh;
    if (!m.isMesh) return;
    m.frustumCulled = false;
    const mats = Array.isArray(m.material) ? m.material : [m.material];
    const next = mats.map((mat: Material) => {
      if (mat.name === "Contorno") return outline;
      // A arte da face é uma ilustração: com o metal do resto da moeda ela
      // refletia o ambiente e ficava acinzentada.
      if (mat.name === "Face_Moeda" || mat.name === "Verso_Moeda") {
        const std = mat as MeshStandardMaterial;
        std.metalness = 0.05;
        std.roughness = 0.6;
      }
      return mat;
    });
    m.material = Array.isArray(m.material) ? next : next[0];
  });
  scene.add(model);

  // Sombra de contato: um disco suave no chão que encolhe no pulinho.
  const sc = document.createElement("canvas");
  sc.width = sc.height = 128;
  const g = sc.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(0,0,0,0.55)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const shadowTex = new CanvasTexture(sc);
  const shadowMat = new MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  });
  const shadow = new Mesh(new PlaneGeometry(2.6, 1.3), shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.005;
  scene.add(shadow);
  const root: Object3D | undefined = model.getObjectByName("root");
  const rootPos = new Vector3();

  const mixer = new AnimationMixer(model);
  const clip = gltf.animations.find((a) => a.name === CLIP) ?? gltf.animations[0];
  const action = mixer.clipAction(clip);
  action.setLoop(LoopOnce, 1);
  action.clampWhenFinished = true;
  action.play();
  mixer.update(0);

  const resize = () => {
    const s = Math.max(1, Math.round(stage.clientWidth));
    renderer.setSize(s, s, false);
  };
  resize();
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
  ro?.observe(stage);

  const draw = () => {
    if (root) {
      root.getWorldPosition(rootPos);
      const h = Math.max(0, rootPos.y);
      const k = Math.max(0.35, 1 - h * 1.4);
      shadow.scale.setScalar(k);
      shadowMat.opacity = k;
    }
    renderer.render(scene, camera);
  };

  let disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    renderer.setAnimationLoop(null);
    ro?.disconnect();
    mixer.stopAllAction();
    scene.traverse((o) => {
      const m = o as Mesh;
      if (!m.isMesh) return;
      m.geometry.dispose();
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      mats.forEach((mat) => {
        for (const v of Object.values(mat)) {
          if (v && typeof v === "object" && "isTexture" in v) (v as { dispose(): void }).dispose();
        }
        mat.dispose();
      });
    });
    env.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  };
  ctl.cleanup = dispose;

  // Shaders compilados e 1º quadro desenhado ANTES de aparecer: a troca
  // poster → canvas não pisca nem trava no 1º frame.
  stage.appendChild(canvas);
  renderer.compile(scene, camera);
  draw();
  if (!ctl.ready()) {
    dispose();
    return;
  }

  const stopAt = Math.max(0.5, clip.duration - END_EARLY_S);
  let last = -1;
  let ended = false;
  renderer.setAnimationLoop((t) => {
    const dt = last < 0 ? 0 : (t - last) / 1000;
    last = t;
    // Aba em segundo plano/quadro travado: não pula a animação inteira. O
    // teto é folgado (10 fps) para aparelho lento não tocar em câmera lenta.
    mixer.update(Math.min(Math.max(dt, 0), 1 / 10));
    draw();
    if (!ended && action.time >= stopAt) {
      ended = true;
      ctl.end();
    }
  });
}

const ctl = (window as Window & { __achSplash3d?: Ctl }).__achSplash3d;
if (ctl) {
  // Falha (WebGL indisponível, glb corrompido…): o poster fica e o prazo do
  // script inline encerra a abertura normalmente.
  run(ctl).catch(() => {});
}
