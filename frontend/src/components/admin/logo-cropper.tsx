"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

interface LogoCropperProps {
  file: File;
  onCancel: () => void;
  onConfirm: (cropped: File) => void;
}

const WINDOW = 260; // crop window size on screen (px)
const OUTPUT = 512; // exported square size (px)

// LogoCropper lets the user frame a picked image into a square — drag to
// position, slider to zoom — and exports the framed area as a PNG File.
export function LogoCropper({ file, onCancel, onConfirm }: LogoCropperProps) {
  const [imgUrl, setImgUrl] = useState("");
  const [nat, setNat] = useState<{ w: number; h: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [busy, setBusy] = useState(false);
  const imgElRef = useRef<HTMLImageElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImgUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const base = nat ? Math.max(WINDOW / nat.w, WINDOW / nat.h) : 1;
  const scale = base * zoom;

  // Keep the image covering the window — no empty gaps.
  function clamp(o: { x: number; y: number }, s: number) {
    if (!nat) return o;
    const dw = nat.w * s;
    const dh = nat.h * s;
    return {
      x: Math.min(0, Math.max(WINDOW - dw, o.x)),
      y: Math.min(0, Math.max(WINDOW - dh, o.y)),
    };
  }

  function onImgLoad() {
    const el = imgElRef.current;
    if (!el) return;
    const w = el.naturalWidth;
    const h = el.naturalHeight;
    if (!w || !h) return;
    setNat({ w, h });
    const b = Math.max(WINDOW / w, WINDOW / h);
    setOffset({ x: (WINDOW - w * b) / 2, y: (WINDOW - h * b) / 2 });
  }

  function onZoomChange(z: number) {
    if (!nat) {
      setZoom(z);
      return;
    }
    const oldS = base * zoom;
    const newS = base * z;
    // Anchor the zoom on the window centre.
    const cx = (WINDOW / 2 - offset.x) / oldS;
    const cy = (WINDOW / 2 - offset.y) / oldS;
    setZoom(z);
    setOffset(clamp({ x: WINDOW / 2 - cx * newS, y: WINDOW / 2 - cy * newS }, newS));
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    drag.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    drag.current = { x: e.clientX, y: e.clientY };
    setOffset((o) => clamp({ x: o.x + dx, y: o.y + dy }, scale));
  }
  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    drag.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
  }

  async function handleConfirm() {
    const el = imgElRef.current;
    if (!el || !nat || busy) return;
    setBusy(true);
    try {
      const s = scale;
      const canvas = document.createElement("canvas");
      canvas.width = OUTPUT;
      canvas.height = OUTPUT;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setBusy(false);
        return;
      }
      ctx.drawImage(
        el,
        -offset.x / s,
        -offset.y / s,
        WINDOW / s,
        WINDOW / s,
        0,
        0,
        OUTPUT,
        OUTPUT,
      );
      const blob = await new Promise<Blob | null>((res) =>
        canvas.toBlob((b) => res(b), "image/png"),
      );
      if (!blob) {
        setBusy(false);
        return;
      }
      onConfirm(new File([blob], "logo.png", { type: "image/png" }));
    } catch {
      setBusy(false);
    }
  }

  return (
    <div className="lc-overlay" role="dialog" aria-modal="true">
      <div className="lc-panel">
        <div className="lc-title">Enquadrar a logo</div>
        <div
          className="lc-window"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {imgUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imgElRef}
              src={imgUrl}
              alt=""
              draggable={false}
              onLoad={onImgLoad}
              className="lc-img"
              style={{
                width: nat ? nat.w * scale : undefined,
                height: nat ? nat.h * scale : undefined,
                transform: `translate(${offset.x}px, ${offset.y}px)`,
              }}
            />
          )}
        </div>
        <div className="lc-hint">Arraste para posicionar · use a barra para o zoom</div>
        <div className="lc-zoom">
          <span>−</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => onZoomChange(Number(e.target.value))}
          />
          <span>+</span>
        </div>
        <div className="lc-actions">
          <button
            type="button"
            className="admin-btn-ghost"
            onClick={onCancel}
            disabled={busy}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="admin-btn-primary"
            onClick={handleConfirm}
            disabled={busy || !nat}
          >
            {busy ? "Processando…" : "Usar esta foto"}
          </button>
        </div>
      </div>
    </div>
  );
}
