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
          <span className="install-sheet-icon-tile" aria-hidden="true">A</span>
        </div>

        {isStandalone ? (
          <>
            <div className="install-sheet-title">App já instalado</div>
            <div className="install-sheet-sub">
              Você já está usando o Achadinhos instalado na tela inicial.
            </div>
          </>
        ) : (
          <>
            <div className="install-sheet-title">Instale o Achadinhos</div>
            <div className="install-sheet-sub">
              Acesso em 1 toque, direto da tela inicial — sem ocupar memória e
              funciona offline.
            </div>
            <div className="install-sheet-benefits">
              <div className="install-sheet-benefit">
                <Icon.Check size={16} /> Abre como um app nativo
              </div>
              <div className="install-sheet-benefit">
                <Icon.Check size={16} /> Notificações de orçamento e eventos
              </div>
              <div className="install-sheet-benefit">
                <Icon.Check size={16} /> Funciona mesmo sem internet
              </div>
            </div>
          </>
        )}

        {!isStandalone && isIOS && (
          <>
            <div className="install-sheet-how">No iPhone, instale pelo Safari em 3 passos:</div>
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
        )}

        {!isStandalone && !isIOS && (
          <div className="install-sheet-how">
            Abra o menu do navegador e escolha <strong>“Instalar app”</strong>{" "}
            ou <strong>“Adicionar à tela inicial”</strong>.
          </div>
        )}

        <button type="button" className="install-sheet-ok" onClick={onClose}>
          Entendi
        </button>
      </div>
    </div>
  );
}
