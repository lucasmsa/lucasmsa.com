"use client";

import { useEffect, useState } from "react";

export type ThemeInk = {
  acc: string;
  water: string;
  seaMid: string;
  seaDeep: string;
  seaTint: string;
};

function readInk(): ThemeInk {
  const style = getComputedStyle(document.documentElement);
  return {
    acc: style.getPropertyValue("--acc-rgb").trim(),
    water: style.getPropertyValue("--water-rgb").trim(),
    seaMid: style.getPropertyValue("--sea-mid-rgb").trim(),
    seaDeep: style.getPropertyValue("--sea-deep-rgb").trim(),
    seaTint: style.getPropertyValue("--sea-tint-rgb").trim(),
  };
}

/**
 * Canvas colours as "r, g, b" strings for rgba(). Watches data-theme directly:
 * next-themes applies the attribute in its own effect, which runs after the
 * effects of the components below it, so reading on a theme state change would
 * see the previous theme's values.
 */
export function useThemeInk() {
  // Read on the first client render, so a canvas that mounts during a client
  // navigation paints in the right colours on its first frame. The value never
  // reaches markup, so the server's null cannot cause a hydration mismatch.
  const [ink, setInk] = useState<ThemeInk | null>(() =>
    typeof document === "undefined" ? null : readInk(),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => setInk(readInk()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return ink;
}
