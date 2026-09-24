"use client";

import { InkButton } from "@/components/site/ink-button";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

export function ThemeToggle() {
  const { label, ariaLabel, ready, toggle } = useThemeToggle();

  return (
    <InkButton
      className="theme-toggle"
      onClick={toggle}
      aria-label={ariaLabel}
      disabled={!ready}
    >
      {label}
    </InkButton>
  );
}
