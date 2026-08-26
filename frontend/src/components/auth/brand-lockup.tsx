// Logo oficial (horizontal) usado no topo das telas de auth, planos,
// certificação e verificação. Substitui o lockup antigo desenhado em CSS
// (quadrado dourado + ícone de casa + texto).
export function BrandLockup() {
  return (
    <div className="auth-brand">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mobile-logo-achadinhos-do-condominio.png?v=3"
        alt="Achadinhos do Condomínio"
        className="auth-brand-logo"
        width={760}
        height={176}
        decoding="async"
      />
    </div>
  );
}
