import { Icon } from "../icons";

interface BrandLockupProps {
  sub?: string;
}

export function BrandLockup({ sub = "Síndico · Prestadores · Shopping" }: BrandLockupProps) {
  return (
    <div className="auth-brand">
      <div className="auth-brand-mark">
        <Icon.BrandHouse size={24} />
      </div>
      <div className="auth-brand-text">
        <span className="auth-brand-name">Achadinhos do condomínio</span>
        <span className="auth-brand-sub">{sub}</span>
      </div>
    </div>
  );
}
