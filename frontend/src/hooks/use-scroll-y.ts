"use client";

import { useEffect, useState } from "react";

// Tracks window vertical scroll position. Subscribes once on mount and
// uses a passive listener so it never blocks scrolling.
export function useScrollY(): number {
  const [y, setY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return y;
}
