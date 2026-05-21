"use client";

import { useEffect, useState } from "react";
import { categoriesApi, type ApiCategory } from "@/lib/api";
import type { CategoryId } from "@/lib/types";
import { Icon } from "../icons";

interface AllCategoriesScreenProps {
  onBack: () => void;
  onSelect: (id: CategoryId) => void;
}

export function AllCategoriesScreen({
  onBack,
  onSelect,
}: AllCategoriesScreenProps) {
  const [cats, setCats] = useState<ApiCategory[]>([]);

  useEffect(() => {
    void categoriesApi.list().then(setCats).catch(() => {});
  }, []);

  return (
    <div className="screen">
      <div className="screen-header gold-tint">
        <button
          type="button"
          className="screen-back"
          onClick={onBack}
          aria-label="Voltar"
        >
          <Icon.ChevLeft size={16} />
        </button>
        <div className="screen-title">Categorias</div>
      </div>
      <div className="screen-body">
        {cats.length === 0 ? (
          <div style={{ textAlign: "center", padding: 32, color: "var(--ink-500)", fontSize: 13 }}>
            Carregando…
          </div>
        ) : (
          <div className="all-cats">
            {cats.map((c) => {
              const iconKey = c.icon as keyof typeof Icon;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const I = Icon[iconKey] as ((props: { size?: number }) => any) | undefined;
              return (
                <button
                  type="button"
                  key={c.id}
                  className="all-cat"
                  onClick={() => onSelect(c.id as CategoryId)}
                  style={{ textAlign: "left" }}
                >
                  <div className="all-cat-icon">
                    {I ? <I /> : null}
                  </div>
                  <div className="all-cat-label">{c.label}</div>
                  <div className="all-cat-count">{c.count} prestadores</div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
