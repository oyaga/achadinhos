"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Splash de abertura em vídeo (mascote-moeda 3D renderizado, 8s). Substituiu
// a cena R3F ao vivo — sem WebGL/three no bundle; o mp4 fica no cache do
// service worker ("splash-media", CacheFirst). Versione o arquivo (-vN) ao
// trocar o vídeo para invalidar o cache.
const VIDEO_URL = "/splash-video-v1.mp4";

const SESSION_KEY = "achadinhos:splash-seen";
// Rede lenta/offline: se o vídeo não começar a tocar a tempo, aborta.
const LOAD_TIMEOUT_MS = 3000;
const EXIT_MS = 550;

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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!shouldShowSplash()) return;
    try {
      // Marca já na decisão de mostrar: refresh no meio do splash não replica.
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    setStage("loading");
  }, []);

  useEffect(() => {
    if (stage !== "loading") return;
    const id = window.setTimeout(() => setStage("exit"), LOAD_TIMEOUT_MS);
    return () => clearTimeout(id);
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
      <video
        ref={videoRef}
        className={`splash-video${stage === "playing" ? " show" : ""}`}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onCanPlay={onCanPlay}
        onEnded={skip}
        onError={skip}
      />
      <span className="splash-hint">toque para pular</span>
    </div>
  );
}
