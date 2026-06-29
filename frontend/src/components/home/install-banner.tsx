"use client";

import { useEffect, useState } from "react";
import { useInstallPrompt } from "@/hooks/use-install-prompt";
import { Icon } from "../icons";

const DISMISSED_KEY = "achadinhos.install.dismissed.v1";

interface InstallBannerProps {
  // Decide entre o prompt nativo (Android) e as instruções de "Adicionar à
  // tela inicial" (iOS). Vem do App (handleInstall).
  onInstall: () => void;
}

// Banner único de instalação (handoff M4). Aparece uma vez na Home quando o app
// pode ser instalado (Android com prompt nativo, ou iOS Safari) e ainda não foi
// instalado nem dispensado. O X persiste a dispensa em localStorage.
export function InstallBanner({ onInstall }: InstallBannerProps) {
  const { canInstall, isIOS, isStandalone } = useInstallPrompt();
  const installable = (canInstall || isIOS) && !isStandalone;
  const [dismissed, setDismissed] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(DISMISSED_KEY)) setDismissed(false);
  }, []);

  useEffect(() => {
    if (!installable || dismissed) { setVisible(false); return; }
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, [installable, dismissed]);

  if (!installable || dismissed) return null;

  function close() {
    localStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
    setTimeout(() => setDismissed(true), 300);
  }

  return (
    <div className={`install-banner${visible ? " visible" : ""}`} role="banner">
      <div className="install-banner-icon">
        <Icon.Download size={20} />
      </div>
      <div className="install-banner-body">
        <div className="install-banner-title">Instale o Achadinhos</div>
        <div className="install-banner-sub">Acesso rápido, funciona offline</div>
      </div>
      <button type="button" className="install-banner-cta" onClick={onInstall}>
        <Icon.Download size={13} />
        Instalar
      </button>
      <button type="button" className="install-banner-close" onClick={close} aria-label="Dispensar">
        <Icon.X size={14} />
      </button>
    </div>
  );
}
