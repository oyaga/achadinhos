"use client";

import { cn } from "@/lib/utils";
import { Icon } from "../icons";

export type NavId = "home" | "orders" | "fav" | "profile";

interface BottomNavProps {
  active: NavId;
  onSelect: (id: NavId) => void;
  onInstall: () => void;
  authed?: boolean;
}

type NavItem = { id: NavId; label: string; icon: keyof typeof Icon };

const ITEMS_LEFT: NavItem[] = [
  { id: "home", label: "Início", icon: "Home" },
  { id: "orders", label: "Pedidos", icon: "Box" },
];

export function BottomNav({ active, onSelect, onInstall, authed }: BottomNavProps) {
  const itemsRight: NavItem[] = [
    { id: "fav", label: "Favoritos", icon: "Heart" },
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
        aria-label="Baixar o app"
      >
        <Icon.Plus size={24} />
      </button>
      {itemsRight.map(renderItem)}
    </nav>
  );
}
