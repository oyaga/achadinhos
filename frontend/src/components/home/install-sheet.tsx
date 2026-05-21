"use client";

import { Icon } from "../icons";

interface InstallSheetProps {
  open: boolean;
  onClose: () => void;
  isIOS: boolean;
  isStandalone: boolean;
}

// Shown when the user taps the install button but the browser has no native
// install prompt available (notably iOS Safari, which only supports the manual
// "Add to Home Screen" flow).
export function InstallSheet({ open, onClose, isIOS, isStandalone }: InstallSheetProps) {
  if (!open) return null;

  return (
    <div className="install-sheet-backdrop" onClick={onClose} role="presentation">
      <div
        className="install-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Instalar o app"
      >
        <button
          type="button"
          className="install-sheet-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          <Icon.X size={16} />
        </button>

        <div className="install-sheet-icon">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/icon.svg" alt="Achadinhos" width={52} height={52} />
        </div>

        {isStandalone ? (
          <>
            <div className="install-sheet-title">App já instalado</div>
            <div className="install-sheet-sub">
              Você já está usando o Achadinhos instalado na tela inicial.
            </div>
          </>
        ) : isIOS ? (
          <>
            <div className="install-sheet-title">Instalar no iPhone / iPad</div>
            <div className="install-sheet-sub">
              No iPhone a instalação é feita pelo Safari, em 3 passos:
            </div>
            <ol className="install-sheet-steps">
              <li>
                <span className="install-sheet-step-n">1</span>
                <span>
                  Toque no botão <strong>Compartilhar</strong>{" "}
                  <Icon.Share size={14} /> na barra do Safari.
                </span>
              </li>
              <li>
                <span className="install-sheet-step-n">2</span>
                <span>
                  Role a lista e toque em{" "}
                  <strong>“Adicionar à Tela de Início”</strong>.
                </span>
              </li>
              <li>
                <span className="install-sheet-step-n">3</span>
                <span>
                  Confirme tocando em <strong>“Adicionar”</strong>.
                </span>
              </li>
            </ol>
          </>
        ) : (
          <>
            <div className="install-sheet-title">Instalar o app</div>
            <div className="install-sheet-sub">
              Abra o menu do navegador e escolha{" "}
              <strong>“Instalar app”</strong> ou{" "}
              <strong>“Adicionar à tela inicial”</strong>.
            </div>
          </>
        )}

        <button type="button" className="install-sheet-ok" onClick={onClose}>
          Entendi
        </button>
      </div>
    </div>
  );
}
