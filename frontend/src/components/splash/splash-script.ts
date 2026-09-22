// Splash de abertura em vídeo (mascote-moeda 3D renderizado), fora do React.
//
// O overlay e o <video> vêm prontos no HTML estático da home (SPLASH_HTML): o
// navegador começa a baixar o vídeo no instante em que o parser chega nele —
// antes do React hidratar, que no celular levava 5s+ e fazia o splash desistir
// sobrando só a logo. Não dá para fazer isso por script: todo script inline
// espera as folhas de estilo carregarem para rodar, e o Next as põe no topo do
// <head>. O <source media> escolhe o corte: vertical 9:16 no celular (<768px),
// widescreen 16:9 no desktop. O poster (1º quadro do vídeo, via CSS por
// breakpoint) aparece na hora e o vídeo segue a partir dele.
//
// SPLASH_SCRIPT roda logo depois, ainda antes do resto da página: decide se o
// splash fica (1ª vez na sessão, sem prefers-reduced-motion) ou sai, e cuida
// do play/saída. No celular ele também SEGURA o conteúdo: expõe
// window.__achSplash = { hold, done } e o cliente da API (lib/splash-gate)
// espera `done` antes de qualquer requisição — os dados e as imagens da home
// não disputam banda com o vídeo. `done` resolve quando o vídeo está inteiro
// no buffer (a home carrega por baixo enquanto ele termina de tocar), quando
// o splash sai, ou no teto holdMaxMs, o que vier primeiro.
//
// Versione os arquivos (-vN) ao trocar o vídeo — o servidor Go serve splash-*
// como immutable — e atualize os posters em globals.css (.splash-overlay).
//
// O host é renderizado com dangerouslySetInnerHTML: o React não reconcilia os
// filhos desse nó, então o que o script faz com eles sobrevive à hidratação.

// Sem autoplay: o script dá o play só depois de decidir que o splash fica.
// Uma string literal só, sem concatenação nem interpolação: o minificador do
// build juntava os pedaços e engolia o `media` do 1º <source>, e o desktop
// acabava pedindo uma URL quebrada. Ao trocar o vídeo, atualize os -vN aqui.
export const SPLASH_HTML =
  '<div class="splash-overlay" role="button" aria-label="Pular abertura"><video class="splash-video" muted playsinline webkit-playsinline disablepictureinpicture preload="auto"><source src="/splash-video-mobile-v1.mp4" type="video/mp4" media="(max-width: 767px)"><source src="/splash-video-v1.mp4" type="video/mp4"></video><span class="splash-hint">toque para pular</span></div>';

const config = {
  key: "achadinhos:splash-seen",
  // Rede lenta: o contador reinicia a cada pedaço que chega, então só desiste
  // quando o download de fato estanca. loadMaxMs é o teto para começar a tocar.
  stallMs: 3000,
  loadMaxMs: 9000,
  // Teto para segurar o conteúdo, aconteça o que acontecer com o vídeo.
  holdMaxMs: 15000,
  exitMs: 550,
  // Com o splash fora do caminho, deixa o vídeo no cache HTTP para a próxima
  // abertura (só o corte deste aparelho; respeita o Save-Data).
  prefetchDelayMs: 5000,
};

function splash(c: typeof config) {
  var host = document.getElementById("splash-host");
  var overlay = host && (host.firstElementChild as HTMLElement | null);
  var v = overlay && overlay.querySelector("video");
  if (!overlay || !v) return;
  var video = v;
  var el = overlay;

  var prefetch = function (src: string) {
    var conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if ((conn && conn.saveData) || !src) return;
    setTimeout(function () {
      fetch(src, { cache: "force-cache" }).catch(function () {});
    }, c.prefetchDelayMs);
  };

  // Tira o vídeo do caminho: aborta o download e some com o overlay. Devolve
  // o corte que o <source media> escolheu, para o prefetch.
  var dispose = function () {
    var src = video.currentSrc;
    video.pause();
    while (video.firstChild) video.removeChild(video.firstChild);
    video.removeAttribute("src");
    video.load();
    el.remove();
    return src;
  };

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
  if (!show) {
    prefetch(dispose());
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

  var playing = false;
  var finished = false;
  var deadline = Date.now() + c.loadMaxMs;
  var stallId = 0;
  var holdId = window.setTimeout(release, c.holdMaxMs);

  var finish = function () {
    if (finished) return;
    finished = true;
    clearTimeout(stallId);
    clearTimeout(holdId);
    release();
    el.classList.add("splash-exit");
    setTimeout(function () {
      prefetch(dispose());
    }, c.exitMs);
  };

  // Até chegar o 1º pedaço só vale o teto: no começo o CSS e os chunks do
  // React levam a banda toda e o vídeo fica parado sem que a rede tenha caído.
  // Depois disso, desiste se o download estancar por stallMs.
  var arm = function (gotData: boolean) {
    if (playing || finished) return;
    clearTimeout(stallId);
    var left = deadline - Date.now();
    stallId = window.setTimeout(
      finish,
      Math.max(0, gotData ? Math.min(c.stallMs, left) : left),
    );
  };

  // Vídeo inteiro no buffer: o resto da abertura sai da memória, então a
  // home já pode começar a carregar por baixo.
  var checkBuffered = function () {
    var b = video.buffered;
    if (b.length && video.duration && b.end(b.length - 1) >= video.duration - 0.1) {
      release();
    }
  };
  var onPlaying = function () {
    playing = true;
    clearTimeout(stallId);
  };
  // Autoplay pode ser negado mesmo com muted (Modo Pouca Energia do iOS etc.)
  // — nesse caso sai direto em vez de ficar parado no poster.
  var play = function () {
    if (playing || finished) return;
    var p = video.play();
    if (p) p.then(onPlaying, finish);
  };

  // `muted` na propriedade também: sem ele o iOS recusa o play sem gesto.
  video.muted = true;
  video.addEventListener("progress", function () {
    arm(true);
    checkBuffered();
  });
  video.addEventListener("playing", onPlaying);
  video.addEventListener("canplay", play);
  video.addEventListener("ended", finish);
  // Com <source>, a falha de carga dispara no próprio <source> — inclusive no
  // que foi pulado por não bater o `media`. Só o último falhar significa que
  // nenhum serviu; erro de decodificação chega no <video>.
  video.addEventListener("error", finish);
  var sources = video.querySelectorAll("source");
  if (sources.length) sources[sources.length - 1].addEventListener("error", finish);
  el.addEventListener("pointerdown", finish);

  // O download começou antes deste script: o vídeo pode já estar pronto.
  arm(video.buffered.length > 0);
  checkBuffered();
  if (video.readyState >= 3) play();
}

export const SPLASH_SCRIPT = `(${splash.toString()})(${JSON.stringify(config)});`;
