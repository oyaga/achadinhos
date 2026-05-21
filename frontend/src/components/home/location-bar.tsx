"use client";

import { useAuth } from "@/contexts/auth-context";
import { Icon } from "../icons";

export function LocationBar() {
  const { user } = useAuth();
  const condoName = user?.condo_name ?? null;

  return (
    <div className="location-bar">
      <span className="pin">
        <Icon.Pin />
      </span>
      <span>
        {condoName ? (
          <>Atendendo em torno de <strong>{condoName}</strong></>
        ) : (
          <>Selecione seu <strong>condomínio</strong></>
        )}
      </span>
      <Icon.ChevDown />
    </div>
  );
}
