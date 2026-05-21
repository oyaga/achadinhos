"use client";

import { cn } from "@/lib/utils";
import { Icon } from "../icons";

export type NavId = "home" | "orders" | "fav" | "profile";

interface BottomNavProps {
  active: NavId;
  onSelect: (id: NavId) => void;
  onAddClick: () => void;
  canInstall?: boolean;
  onInstall?: () => void;
}

const ITEMS_LEFT: Array<{ id: NavId; label: string; icon: keyof typeof Icon }> =
  [
    { id: "home", label: "Início", icon: "Home" },
    { id: "orders", label: "Pedidos", icon: "Box" },
  ];
const ITEMS_RIGHT: Array<{
  id: NavId;
  label: string;
  icon: keyof typeof Icon;
}> = [
  { id: "fav", label: "Favoritos", icon: "Heart" },
  { id: "profile", label: "Perfil", icon: "User" },
];

export function BottomNav({ active, onSelect, onAddClick, canInstall, onInstall }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {ITEMS_LEFT.map((it) => {
        const I = Icon[it.icon];
        return (
          <button
            type="button"
            key={it.id}
            className={cn("nav-item", active === it.id && "active")}
            onClick={() => onSelect(it.id)}
          >
            <I size={20} filled={active === it.id} />
            <span>{it.label}</span>
            <span className="nav-dot" />
          </button>
        );
      })}
      <button
        type="button"
        className="nav-fab"
        onClick={canInstall ? onInstall : onAddClick}
        aria-label={canInstall ? "Instalar app" : "Buscar"}
      >
        {canInstall ? <Icon.Plus size={24} /> : <Icon.Search size={22} />}
      </button>
      {ITEMS_RIGHT.map((it) => {
        const I = Icon[it.icon];
        return (
          <button
            type="button"
            key={it.id}
            className={cn("nav-item", active === it.id && "active")}
            onClick={() => onSelect(it.id)}
          >
            <I size={20} filled={active === it.id} />
            <span>{it.label}</span>
            <span className="nav-dot" />
          </button>
        );
      })}
    </nav>
  );
}
