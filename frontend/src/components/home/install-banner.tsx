"use client";

import { useEffect, useState } from "react";
import { useInstallPrompt } from "@/hooks/use-install-prompt";
import { Icon } from "../icons";

const DISMISSED_KEY = "achadinhos.install.dismissed.v1";

export function InstallBanner() {
  const { canInstall, promptInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(DISMISSED_KEY)) setDismissed(false);
  }, []);

  useEffect(() => {
    if (!canInstall || dismissed) { setVisible(false); return; }
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, [canInstall, dismissed]);

  if (!canInstall || dismissed) return null;

  function close() {
    localStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
    setTimeout(() => setDismissed(true), 300);
  }

  async function install() {
    await promptInstall();
    close();
  }

  return (
    <div className={`install-banner${visible ? " visible" : ""}`} role="banner">
      <div className="install-banner-icon">
        <img src="/icons/icon.svg" alt="Achadinhos" width={44} height={44} />
      </div>
      <div className="install-banner-body">
        <div className="install-banner-title">Instale o Achadinhos</div>
        <div className="install-banner-sub">Acesso rápido, funciona offline</div>
      </div>
      <button type="button" className="install-banner-cta" onClick={() => void install()}>
        <Icon.Download size={13} />
        Instalar
      </button>
      <button type="button" className="install-banner-close" onClick={close} aria-label="Fechar">
        <Icon.X size={14} />
      </button>
    </div>
  );
}
