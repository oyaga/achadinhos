"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { lookupCEP, type ViaCEPResult } from "@/lib/cep";

/**
 * Tiny wrapper around ViaCEP.
 *
 * - Caller controls *when* to lookup (we don't watch any value).
 * - Cancels in-flight request when a new lookup starts (AbortController).
 * - Aborts on unmount.
 * - Returns null when CEP is unknown or the network fails (errors swallowed).
 *
 * Usage:
 *   const { lookup, loading } = useViaCEP();
 *   const result = await lookup("01310100");
 */
export function useViaCEP(): {
  lookup: (cep: string) => Promise<ViaCEPResult | null>;
  loading: boolean;
  error: string | null;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  // Cancel any pending request when the component unmounts.
  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  const lookup = useCallback(async (cep: string) => {
    // Cancel previous in-flight call.
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const result = await lookupCEP(cep, controller.signal);
      // Only emit state if this is still the active request.
      if (controllerRef.current === controller) {
        setLoading(false);
      }
      return result;
    } catch (err) {
      if (controllerRef.current === controller) {
        setLoading(false);
        setError(
          err instanceof Error ? err.message : "Erro ao consultar CEP"
        );
      }
      return null;
    }
  }, []);

  return { lookup, loading, error };
}
