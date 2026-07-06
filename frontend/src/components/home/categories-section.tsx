"use client";

import { useEffect, useState } from "react";
import { categoriesApi, type ApiCategory } from "@/lib/api";
import type { CategoryId } from "@/lib/types";
import { cn, isPublicCategory } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Icon } from "../icons";

interface CategoriesSectionProps {
  active: CategoryId;
  onSelect: (id: CategoryId) => void;
  onSeeAll: () => void;
}

export function CategoriesSection({
  active,
  onSelect,
  onSeeAll,
}: CategoriesSectionProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // Avoid hydration mismatch: render mobile slice on first paint, then swap
  // to the full list once the media query has resolved on the client.
  const [mounted, setMounted] = useState(false);
  const [cats, setCats] = useState<ApiCategory[]>([]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    void categoriesApi
      .list()
      .then((cats) => setCats(cats.filter(isPublicCategory)))
      .catch(() => {});
  }, []);

  const showAll = mounted && isDesktop;
  const list = showAll ? cats : cats.slice(0, 8);

  if (cats.length === 0) return null;

  return (
    <div className="section">
      <div className="section-title">
        <h2>Categorias</h2>
        <button
          type="button"
          className="see-all"
          onClick={onSeeAll}
          // Hide on desktop where we already show every category.
          style={showAll ? { display: "none" } : undefined}
        >
          Ver todas <Icon.ChevRight />
        </button>
      </div>
      <div className="cats">
        {list.map((c, i) => {
          const iconKey = c.icon as keyof typeof Icon;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const IconCmp = Icon[iconKey] as ((props: { size?: number }) => any) | undefined;
          return (
            <button
              type="button"
              key={c.id}
              className={cn("cat fade-up", active === c.id && "active")}
              onClick={() => onSelect(c.id as CategoryId)}
              style={{ animationDelay: `${100 + i * 30}ms` }}
            >
              {c.badge && <span className="cat-badge">{c.badge}</span>}
              <span className="cat-icon">
                {IconCmp ? <IconCmp /> : null}
              </span>
              <span className="cat-label">{c.short}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
