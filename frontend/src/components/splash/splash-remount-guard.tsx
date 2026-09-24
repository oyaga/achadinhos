"use client";

import { useEffect } from "react";

// O overlay do splash vem por dangerouslySetInnerHTML e é controlado pelo
// script inline, que só executa no parse do documento. Numa navegação
// client-side de volta à home (home → /cadastro → voltar) o React re-injeta
// o HTML, o script não roda de novo e sobraria o poster do mascote travado
// na tela. O script marca com data-live o overlay que adotou; qualquer
// overlay sem a marca é órfão e sai aqui, logo após a (re)montagem.
export function SplashRemountGuard() {
  useEffect(() => {
    const host = document.getElementById("splash-host");
    const overlay = host?.firstElementChild as HTMLElement | null;
    if (overlay && !overlay.hasAttribute("data-live")) overlay.remove();
  }, []);
  return null;
}
