"use client";

import { Icon } from "../icons";

interface HeroProps {
  onClick: () => void;
}

export function Hero({ onClick }: HeroProps) {
  return (
    <div className="section">
      <div
        className="hero fade-up"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        style={{ animationDelay: "60ms", textAlign: "left" }}
      >
        <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
          <div className="hero-tag">
            <Icon.Crown size={11} /> Destaque do dia
          </div>
          <div className="hero-title">
            TurboElev
            <br />
            Manutenção 24h
          </div>
          <div className="hero-meta">
            <div className="hero-rating">
              <Icon.Star size={11} /> 4,9
            </div>
            <span className="hero-divider"></span>
            <span>128 contratos</span>
            <span className="hero-divider"></span>
            <span>1,2 km</span>
          </div>
        </div>
        <div className="hero-pic" />
      </div>
    </div>
  );
}
