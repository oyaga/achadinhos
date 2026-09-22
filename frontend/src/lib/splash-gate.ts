// No celular, o splash de abertura (components/splash/splash-script.ts) segura
// as requisições da API até o vídeo estar baixado, para os dados e as imagens
// da home não disputarem banda com ele. Fora do splash, resolve na hora.
type SplashState = { hold: boolean; done: Promise<void> };

export function waitForSplash(): Promise<void> | undefined {
  if (typeof window === "undefined") return;
  const s = (window as Window & { __achSplash?: SplashState }).__achSplash;
  return s?.hold ? s.done : undefined;
}
