"use client";

import { cn } from "@/lib/utils";
import { Icon } from "../icons";

export type NavId = "home" | "events" | "fav" | "profile";

interface BottomNavProps {
  active: NavId;
  onSelect: (id: NavId) => void;
  onInstall: () => void;
  authed?: boolean;
}

type NavItem = { id: NavId; label: string; icon: keyof typeof Icon };

const ITEMS_LEFT: NavItem[] = [
  { id: "home", label: "Início", icon: "Home" },
  { id: "fav", label: "Favoritos", icon: "Heart" },
];

export function BottomNav({ active, onSelect, onInstall, authed }: BottomNavProps) {
  const itemsRight: NavItem[] = [
    { id: "events", label: "Eventos", icon: "Calendar" },
    { id: "profile", label: authed ? "Perfil" : "Login", icon: "User" },
  ];

  const renderItem = (it: NavItem) => {
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
  };

  return (
    <nav className="bottom-nav">
      {ITEMS_LEFT.map(renderItem)}
      <button
        type="button"
        className="nav-fab"
        onClick={onInstall}
        aria-label="Instalar o app"
      >
        <span className="nav-fab-circle">
          <Icon.Download size={22} />
        </span>
        <span className="nav-fab-label">Instalar</span>
      </button>
      {itemsRight.map(renderItem)}
    </nav>
  );
}
