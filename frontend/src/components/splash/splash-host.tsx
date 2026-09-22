import { SPLASH_HTML, SPLASH_SCRIPT } from "./splash-script";

// Splash de abertura da home, fora do React (ver splash-script.ts). O
// innerHTML fixo faz o React não mexer nos filhos do host na hidratação.
export function SplashHost() {
  return (
    <>
      <div
        id="splash-host"
        dangerouslySetInnerHTML={{ __html: SPLASH_HTML }}
        suppressHydrationWarning
      />
      <script dangerouslySetInnerHTML={{ __html: SPLASH_SCRIPT }} />
    </>
  );
}
