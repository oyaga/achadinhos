"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "achadinhos.whatsapp-history.v2";
const MAX_ENTRIES = 50;

export type ContactKind = "provider" | "product" | "seller";

// WhatsappEntry is a single "contacted via WhatsApp" record, generic over the
// three kinds of business a user can reach out to.
export interface WhatsappEntry {
  id: string;
  kind: ContactKind;
  targetId: string;
  name: string;
  avatar: string; // initial letter, fallback when there is no logo
  logoUrl?: string;
  subtitle: string; // category label / seller name
  whatsapp: string;
  date: string; // ISO
}

// ContactInput is what callers pass to record() — id and date are filled in.
export type ContactInput = Omit<WhatsappEntry, "id" | "date">;

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
  } catch {
    /* ignore quota */
  }
}

export function useWhatsappHistory() {
  const [history, setHistory] = useState<WhatsappEntry[]>([]);

  useEffect(() => {
    setHistory(load());
  }, []);

  const record = useCallback((input: ContactInput) => {
    const entry: WhatsappEntry = {
      ...input,
      id: `${Date.now()}-${input.targetId}`,
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
