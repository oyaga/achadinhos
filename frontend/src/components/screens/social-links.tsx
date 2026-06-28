"use client";

import type { ReactNode } from "react";
import { externalHref } from "@/lib/api";
import { Icon } from "../icons";

export interface SocialLinksData {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  site?: string;
}

const ENTRIES: Array<{
  key: keyof SocialLinksData;
  label: string;
  icon: (size: number) => ReactNode;
}> = [
  { key: "instagram", label: "Instagram", icon: (s) => <Icon.Instagram size={s} /> },
  { key: "facebook", label: "Facebook", icon: (s) => <Icon.Facebook size={s} /> },
  { key: "tiktok", label: "TikTok", icon: (s) => <Icon.TikTok size={s} /> },
  { key: "youtube", label: "YouTube", icon: (s) => <Icon.YouTube size={s} /> },
  { key: "site", label: "Site", icon: (s) => <Icon.Globe size={s} /> },
];

// SocialLinks renders the filled social networks as a row of tappable icons in
// the business profile, so the síndico can reach the company's channels.
export function SocialLinks({ data }: { data: SocialLinksData }) {
  const links = ENTRIES.filter((e) => (data[e.key] ?? "").trim() !== "");
  if (links.length === 0) return null;
  return (
    <div className="pd-section">
      <h3>Redes sociais</h3>
      <div className="pd-social">
        {links.map((e) => (
          <a
            key={e.key}
            className="pd-social-btn"
            href={externalHref(data[e.key]!)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={e.label}
            title={e.label}
          >
            {e.icon(20)}
          </a>
        ))}
      </div>
    </div>
  );
}
