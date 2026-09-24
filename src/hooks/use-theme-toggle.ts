"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

type Theme = "light" | "dark";

function oppositeOf(theme: string | undefined): Theme {
  return theme === "dark" ? "light" : "dark";
}

export function useThemeToggle() {
  const t = useTranslations("nav.theme");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // next-themes already knows the stored theme on the client's first render, but
  // the server never does, so labelling from it before mount breaks hydration.
  const target = oppositeOf(mounted ? resolvedTheme : undefined);

  return {
    label: t(target),
    ariaLabel: t(`switchTo.${target}`),
    // Hidden until mounted, so the server's label never flashes.
    ready: mounted,
    toggle: () => setTheme(target),
  };
}
