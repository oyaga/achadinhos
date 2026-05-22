"use client";

import { useCallback, useEffect, useState } from "react";
import { favoritesApi, type FavoriteTargetType } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";

const STORAGE_KEY = "achadinhos.favorites.v1";

export function useFavorites() {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount (works for unauthenticated too)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setFavorites(new Set(JSON.parse(raw) as string[]));
      }
    } catch {
      setFavorites(new Set());
    }
    setHydrated(true);
  }, []);

  // Sync from API when user logs in
  useEffect(() => {
    if (!isAuthenticated || !hydrated) return;
    void favoritesApi.list().then((favs) => {
      setFavorites(new Set(favs.map((f) => f.target_id)));
    }).catch(() => {});
  }, [isAuthenticated, hydrated]);

  // Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)));
    } catch {
      // ignore quota / private mode failures
    }
  }, [favorites, hydrated]);

  const toggle = useCallback(
    (id: number | string, type: FavoriteTargetType = "provider"): boolean => {
      const key = String(id);
      const isCurrentlyFav = favorites.has(key);
      const willAdd = !isCurrentlyFav;

      // Optimistic update
      setFavorites((prev) => {
        const next = new Set(prev);
        if (isCurrentlyFav) next.delete(key);
        else next.add(key);
        return next;
      });

      // API sync (fire-and-forget)
      if (isAuthenticated) {
        if (willAdd) {
          void favoritesApi.add(type, key).catch(() => {
            // Revert on failure
            setFavorites((prev) => {
              const n = new Set(prev);
              n.delete(key);
              return n;
            });
          });
        } else {
          void favoritesApi.remove(type, key).catch(() => {
            // Revert on failure
            setFavorites((prev) => {
              const n = new Set(prev);
              n.add(key);
              return n;
            });
          });
        }
      }

      return willAdd;
    },
    [favorites, isAuthenticated]
  );

  const isFav = useCallback(
    (id: number | string) => favorites.has(String(id)),
    [favorites]
  );

  return { favorites, toggle, isFav, hydrated } as const;
}
