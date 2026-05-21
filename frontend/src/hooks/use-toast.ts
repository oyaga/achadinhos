"use client";

import { useCallback, useRef, useState } from "react";

export function useToast(durationMs = 1800) {
  const [toast, setToast] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (msg: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setToast(msg);
      timerRef.current = setTimeout(() => setToast(null), durationMs);
    },
    [durationMs]
  );

  return { toast, showToast } as const;
}
