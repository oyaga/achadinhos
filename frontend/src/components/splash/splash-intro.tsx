"use client";

import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import type { SplashPhase } from "./scene-3d";

// ssr:false + module scope: o chunk three/r3f/drei só é baixado quando
// <Scene3D/> renderizar pela 1ª vez — visitante recorrente nunca o baixa.
const Scene3D = dynamic(() => import("./scene-3d"), { ssr: false });

const SESSION_KEY = "achadinhos:splash-seen";
const LOAD_TIMEOUT_MS = 2500;
const ENTER_MS = 800;
const FLOAT_MS = 1100;
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
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return false;
  try {
    const c = document.createElement("canvas");
    if (!c.getContext("webgl2") && !c.getContext("webgl")) return false;
  } catch {
    return false;
  }
  return true;
}

class SceneBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

type Stage = "hidden" | "loading" | SplashPhase | "done";

export function SplashIntro() {
  // SSR e 1º render do cliente: null — sem hydration mismatch no export estático.
  const [stage, setStage] = useState<Stage>("hidden");
  const timers = useRef<number[]>([]);
  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    if (!shouldShowSplash()) return;
    try {
      // Marca já na decisão de mostrar: refresh no meio do splash não replica.
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    setStage("loading");
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // Rede lenta/offline: aborta se chunk + glb não ficarem prontos a tempo.
  useEffect(() => {
    if (stage !== "loading") return;
    const id = window.setTimeout(() => setStage("exit"), LOAD_TIMEOUT_MS);
    return () => clearTimeout(id);
  }, [stage]);

  useEffect(() => {
    if (stage === "float") after(FLOAT_MS, () => setStage("exit"));
    if (stage === "exit") after(EXIT_MS, () => setStage("done"));
  }, [stage, after]);

  const onReady = useCallback(() => {
    setStage((s) => (s === "loading" ? "enter" : s));
    after(ENTER_MS, () => setStage((s) => (s === "enter" ? "float" : s)));
  }, [after]);

  const skip = useCallback(() => {
    setStage((s) => (s === "done" || s === "hidden" ? s : "exit"));
  }, []);

  const fail = useCallback(() => setStage("exit"), []);

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
      <div className="splash-canvas">
        <SceneBoundary onError={fail}>
          <Scene3D
            phase={stage === "loading" ? "enter" : stage}
            onReady={onReady}
            onError={fail}
          />
        </SceneBoundary>
      </div>
      <span className="splash-hint">toque para pular</span>
    </div>
  );
}
