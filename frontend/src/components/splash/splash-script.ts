// Splash de abertura 3D (mascote-moeda acenando), fora do React.
//
// O overlay e o poster vêm prontos no HTML estático da home (SPLASH_HTML): o
// mascote aparece no instante em que o parser chega nele — antes do React
// hidratar, que no celular levava 5s+ e fazia a abertura 3D antiga (feita em
// React Three Fiber, scene-3d.tsx) desistir sobrando só a logo. O poster é o
// 1º quadro da própria cena 3D, no mesmo enquadramento.
//
// SPLASH_SCRIPT roda logo depois, ainda antes do resto da página: decide se a
// abertura fica (1ª vez na sessão, sem prefers-reduced-motion, aparelho com
// memória) ou sai. Se fica, começa a baixar o modelo (splash-mascote-vN.glb)
// e injeta o módulo da cena (splash-3d-vN.js, gerado de splash-3d.ts por
// `npm run build:splash`). Quando a cena tem o 1º quadro pronto ela chama
// ready(): o canvas aparece por cima do poster e o mascote dá um pulinho e
// acena; ao fim, end() faz a saída. Se a cena não ficar pronta em loadMaxMs
// (rede lenta, sem WebGL), a abertura sai só com o poster — nunca trava.
//
// No celular ela também SEGURA a API: expõe window.__achSplash = { hold, done }
// e o cliente da API (lib/splash-gate) espera `done` antes de qualquer
// requisição, para os dados/imagens da home não disputarem banda com o modelo.
// `done` resolve quando a cena fica pronta, quando a abertura sai, ou no teto
// holdMaxMs, o que vier primeiro.
//
// Versione os arquivos (-vN) ao trocá-los — o servidor Go serve splash-* como
// immutable — e atualize os nomes aqui (config + SPLASH_HTML) e no package.json.
//
// O host é renderizado com dangerouslySetInnerHTML: o React não reconcilia os
// filhos desse nó, então o que o script faz com eles sobrevive à hidratação.

// Uma string literal só, sem concatenação nem interpolação: o minificador do
// build juntava os pedaços e corrompia atributos. Ao trocar o poster,
// atualize o -vN aqui.
export const SPLASH_HTML =
  '<div class="splash-overlay" role="button" aria-label="Pular abertura"><div class="splash-stage"><img class="splash-poster" src="/splash-poster-3d-v1.webp" alt="" width="720" height="720" decoding="async" draggable="false"></div><span class="splash-hint">toque para pular</span></div>';

const config = {
  key: "achadinhos:splash-seen",
  glbUrl: "/splash-mascote-v2.glb",
  jsUrl: "/splash-3d-v1.js",
  // Teto para a cena 3D ficar pronta; passado isso sai só com o poster.
  loadMaxMs: 5000,
  // Teto da animação depois que a cena aparece (o aceno dura ~3,6s).
  playMaxMs: 6000,
  // Teto para segurar a API no celular, aconteça o que acontecer.
  holdMaxMs: 7000,
  exitMs: 550,
};

function splash(c: typeof config) {
  var host = document.getElementById("splash-host");
  var overlay = host && (host.firstElementChild as HTMLElement | null);
  var stage = overlay && (overlay.querySelector(".splash-stage") as HTMLElement | null);
  if (!overlay || !stage) return;
  var el = overlay;

  var show = true;
  try {
    if (sessionStorage.getItem(c.key)) show = false;
    // Marca já na decisão de mostrar: refresh no meio do splash não replica.
    else sessionStorage.setItem(c.key, "1");
  } catch (e) {
    // Safari em modo privado lança ao acessar sessionStorage.
    show = false;
  }
  if (show && matchMedia("(prefers-reduced-motion: reduce)").matches) {
    show = false;
  }
  var mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (show && mem !== undefined && mem <= 2) show = false;
  if (!show) {
    el.remove();
    return;
  }

  var release: () => void = function () {};
  var done = new Promise<void>(function (r) {
    release = r;
  });
  (window as Window & { __achSplash?: unknown }).__achSplash = {
    hold: matchMedia("(max-width: 767px)").matches,
    done: done,
  };

  var started = false;
  var finished = false;
  var loadId = window.setTimeout(function () {
    if (!started) finish();
  }, c.loadMaxMs);
  var holdId = window.setTimeout(release, c.holdMaxMs);

  var finish = function () {
    if (finished) return;
    finished = true;
    clearTimeout(loadId);
    clearTimeout(holdId);
    release();
    el.classList.add("splash-exit");
    setTimeout(function () {
      el.remove();
      delete (window as Window & { __achSplash3d?: unknown }).__achSplash3d;
      try {
        if (ctl.cleanup) ctl.cleanup();
      } catch (e) {}
    }, c.exitMs);
  };

  var ctl: {
    glb: Promise<ArrayBuffer>;
    stage: HTMLElement;
    ready: () => boolean;
    end: () => void;
    cleanup?: () => void;
  } = {
    glb: fetch(c.glbUrl).then(function (r) {
      if (!r.ok) throw new Error("glb " + r.status);
      return r.arrayBuffer();
    }),
    stage: stage,
    ready: function () {
      if (finished) return false;
      started = true;
      clearTimeout(loadId);
      // Modelo e código já baixados: a home pode carregar por baixo.
      release();
      el.classList.add("splash-3d-on");
      // Rede de segurança: aparelho que não dá conta de animar não prende
      // a pessoa na abertura.
      setTimeout(finish, c.playMaxMs);
      return true;
    },
    end: finish,
  };
  // Sem o catch, uma falha de rede vira "unhandled rejection" no console;
  // quem decide a saída é o prazo loadMaxMs.
  ctl.glb.catch(function () {});
  (window as Window & { __achSplash3d?: unknown }).__achSplash3d = ctl;

  var s = document.createElement("script");
  s.type = "module";
  s.src = c.jsUrl;
  s.onerror = finish;
  document.head.appendChild(s);

  el.addEventListener("pointerdown", finish);
}

export const SPLASH_SCRIPT = `(${splash.toString()})(${JSON.stringify(config)});`;
