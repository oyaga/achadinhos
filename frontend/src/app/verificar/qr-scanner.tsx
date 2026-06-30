"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/components/icons";

interface QrScannerProps {
  onResult: (text: string) => void;
  onCancel: () => void;
  onError: (msg: string) => void;
}

// Leitor de QR code via câmera. Usa getUserMedia + jsQR (import dinâmico) e
// decodifica frames num canvas. Em caso de falha (permissão negada, sem câmera
// ou navegador sem suporte) chama onError — o usuário segue podendo digitar o
// código. Sempre para os tracks da câmera ao fechar/desmontar.
export function QrScanner({ onResult, onCancel, onError }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mantém os callbacks atuais sem re-disparar o efeito (que reabre a câmera).
  const cbs = useRef({ onResult, onCancel, onError });
  cbs.current = { onResult, onCancel, onError };

  useEffect(() => {
    let stream: MediaStream | null = null;
    let raf = 0;
    let cancelled = false;
    let done = false;

    const stop = () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };

    (async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          cbs.current.onError("Seu navegador não permite usar a câmera aqui. Digite o código.");
          return;
        }
        const { default: jsQR } = await import("jsqr");
        if (cancelled) return;
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;
        video.srcObject = stream;
        await video.play().catch(() => {});
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        const tick = () => {
          if (cancelled || done) return;
          if (video.readyState >= 2 && video.videoWidth > 0) {
            const w = video.videoWidth;
            const h = video.videoHeight;
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(video, 0, 0, w, h);
            const img = ctx.getImageData(0, 0, w, h);
            const found = jsQR(img.data, w, h, { inversionAttempts: "dontInvert" });
            if (found && found.data) {
              done = true;
              stop();
              cbs.current.onResult(found.data);
              return;
            }
          }
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      } catch (err) {
        let msg = "Não foi possível acessar a câmera. Digite o código manualmente.";
        if (
          err instanceof DOMException &&
          (err.name === "NotAllowedError" || err.name === "SecurityError")
        ) {
          msg = "Permissão de câmera negada. Digite o código manualmente.";
        } else if (err instanceof DOMException && err.name === "NotFoundError") {
          msg = "Nenhuma câmera encontrada. Digite o código manualmente.";
        }
        cbs.current.onError(msg);
      }
    })();

    return () => stop();
  }, []);

  return (
    <div className="qr-scanner" role="dialog" aria-label="Escanear QR code">
      <video ref={videoRef} className="qr-scanner-video" playsInline muted autoPlay />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="qr-scanner-frame" aria-hidden />
      <div className="qr-scanner-hint">Aponte a câmera para o QR code do certificado</div>
      <button type="button" className="qr-scanner-cancel" onClick={() => cbs.current.onCancel()}>
        <Icon.X size={18} /> Cancelar
      </button>
    </div>
  );
}
