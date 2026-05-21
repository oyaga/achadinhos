"use client";

import { useCallback, useEffect, useState } from "react";
import type { Provider } from "@/lib/types";

const STORAGE_KEY = "achadinhos.whatsapp-history.v1";
const MAX_ENTRIES = 50;

export interface WhatsappEntry {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerCatLabel: string;
  whatsapp: string;
  date: string; // ISO
}

function load(): WhatsappEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WhatsappEntry[]) : [];
  } catch {
    return [];
  }
}

function save(entries: WhatsappEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch { /* ignore quota */ }
}

export function useWhatsappHistory() {
  const [history, setHistory] = useState<WhatsappEntry[]>([]);

  useEffect(() => {
    setHistory(load());
  }, []);

  const record = useCallback((provider: Provider) => {
    const entry: WhatsappEntry = {
      id: `${Date.now()}-${provider.id}`,
      providerId: provider.id,
      providerName: provider.name,
      providerAvatar: provider.avatar,
      providerCatLabel: provider.catLabel,
      whatsapp: provider.whatsapp,
      date: new Date().toISOString(),
    };
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, MAX_ENTRIES);
      save(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    save([]);
    setHistory([]);
  }, []);

  return { history, record, clear } as const;
}
