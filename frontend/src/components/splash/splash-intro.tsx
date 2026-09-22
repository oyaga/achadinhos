"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Splash de abertura em vídeo (mascote-moeda 3D renderizado). Substituiu a
// cena R3F ao vivo — sem WebGL/three no bundle; os mp4 ficam no cache do
// service worker ("splash-media", CacheFirst + Range). Versione os arquivos
// (-vN) ao trocar o vídeo para invalidar o cache. Mobile/PWA (<768px) usa o
// corte vertical 9:16; desktop, o widescreen 16:9.
const VIDEO_URL_DESKTOP = "/splash-video-v1.mp4";
const VIDEO_URL_MOBILE = "/splash-video-mobile-v1.mp4";

const SESSION_KEY = "achadinhos:splash-seen";
// Rede lenta/offline: se o vídeo travar, aborta. O contador reinicia a cada
// pedaço que chega, então só desiste quando o download de fato estanca — na
// 1ª abertura o arquivo vem da rede (~1,6MB no mobile) e 3s cravados
// cortavam o vídeo antes da hora. LOAD_MAX_MS é o teto absoluto da espera.
const STALL_TIMEOUT_MS = 3000;
const LOAD_MAX_MS = 9000;
const EXIT_MS = 550;
// Espera a home assentar antes de buscar o vídeo da próxima abertura, para não
// disputar banda com o conteúdo que o usuário está de fato vendo.
const PREFETCH_DELAY_MS = 5000;

function shouldShowSplash(): boolean {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return false;
  } catch {
    // Safari private mode lança ao acessar sessionStorage
    return false;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  return true;
}

type Stage = "hidden" | "loading" | "playing" | "exit" | "done";

export function SplashIntro() {
  // SSR e 1º render do cliente: null — sem hydration mismatch no export estático.
  const [stage, setStage] = useState<Stage>("hidden");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rearmStall = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!shouldShowSplash()) return;
    try {
      // Marca já na decisão de mostrar: refresh no meio do splash não replica.
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    // Escolhido uma vez na montagem — o splash dura segundos, não precisa
    // reagir a resize.
    setVideoUrl(
      window.matchMedia("(max-width: 767px)").matches
        ? VIDEO_URL_MOBILE
        : VIDEO_URL_DESKTOP,
    );
    setStage("loading");
  }, []);

  useEffect(() => {
    // React nem sempre emite o atributo `muted` no HTML, e sem ele o iOS
    // recusa o autoplay — garantimos direto na propriedade do elemento.
    if (videoRef.current) videoRef.current.muted = true;
  }, [videoUrl]);

  // Deixa o vídeo no cache HTTP do navegador para a PRÓXIMA abertura. Sem
  // isto o splash tem que baixar 1,3-1,7MB no instante em que deveria tocar:
  // no desktop aparece a logo antes do vídeo, e no celular o download nem
  // termina a tempo, sobrando só a logo. Só roda com o splash fora do caminho
  // ("hidden", quando nem apareceu, ou "done"), nunca em paralelo com ele —
  // senão o mesmo arquivo viria duas vezes e a disputa de banda pioraria
  // justamente a abertura que queremos salvar. E busca só o corte deste
  // aparelho, nunca os dois. Já estando no cache, o force-cache não vai à rede.
  useEffect(() => {
    if (stage !== "hidden" && stage !== "done") return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (conn?.saveData) return;
    const url = window.matchMedia("(max-width: 767px)").matches
      ? VIDEO_URL_MOBILE
      : VIDEO_URL_DESKTOP;
    const id = window.setTimeout(() => {
      void fetch(url, { cache: "force-cache" }).catch(() => {});
    }, PREFETCH_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [stage]);

  useEffect(() => {
    if (stage !== "loading") return;
    const deadline = Date.now() + LOAD_MAX_MS;
    let id = 0;
    const arm = () => {
      window.clearTimeout(id);
      const wait = Math.min(STALL_TIMEOUT_MS, deadline - Date.now());
      id = window.setTimeout(() => setStage("exit"), Math.max(0, wait));
    };
    rearmStall.current = arm;
    arm();
    return () => {
      window.clearTimeout(id);
      rearmStall.current = null;
    };
  }, [stage]);

  useEffect(() => {
    if (stage !== "exit") return;
    const id = window.setTimeout(() => setStage("done"), EXIT_MS);
    return () => clearTimeout(id);
  }, [stage]);

  // Autoplay pode ser negado mesmo com muted (economia de bateria etc.) —
  // nesse caso não fica preso no logo pulsando: sai direto.
  const onCanPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play()
      .then(() => setStage((s) => (s === "loading" ? "playing" : s)))
      .catch(() => setStage("exit"));
  }, []);

  // No iOS o `canplay` às vezes não chega (só metadados são pré-carregados) e
  // quem avisa que a imagem entrou é o `playing`.
  const onPlaying = useCallback(() => {
    setStage((s) => (s === "loading" ? "playing" : s));
  }, []);

  const skip = useCallback(() => {
    setStage((s) => (s === "done" || s === "hidden" ? s : "exit"));
  }, []);

  if (stage === "hidden" || stage === "done") return null;

  return (
    <div
      className={`splash-overlay${stage === "exit" ? " splash-exit" : ""}`}
      onPointerDown={skip}
      role="button"
      aria-label="Pular abertura"
    >
      {stage === "loading" && (
        <img
          src="/icon-logo-achadinhos-do-condominio.png"
          alt=""
          className="splash-logo"
        />
      )}
      {videoUrl && (
      <video
        ref={videoRef}
        className={`splash-video${stage === "playing" ? " show" : ""}`}
        src={videoUrl}
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onCanPlay={onCanPlay}
        onPlaying={onPlaying}
        onProgress={() => rearmStall.current?.()}
        onEnded={skip}
        onError={skip}
      />
      )}
      <span className="splash-hint">toque para pular</span>
    </div>
  );
}
