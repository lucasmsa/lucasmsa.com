"use client";

import { useRef, useState, type FocusEvent, type PointerEvent } from "react";

/** Radius that reaches the corner farthest from the origin, plus slack for the wet edge. */
function coverRadius(x: number, y: number, width: number, height: number) {
  return Math.hypot(Math.max(x, width - x), Math.max(y, height - y)) + 6;
}

export function useInkFill() {
  const ref = useRef<HTMLButtonElement>(null);
  const [filled, setFilled] = useState(false);

  const fillFrom = (x: number, y: number) => {
    const button = ref.current;
    if (!button) return;
    const { width, height } = button.getBoundingClientRect();
    button.style.setProperty("--ink-x", `${x}px`);
    button.style.setProperty("--ink-y", `${y}px`);
    button.style.setProperty("--ink-r", `${coverRadius(x, y, width, height)}px`);
    setFilled(true);
  };

  return {
    ref,
    filled,
    onPointerEnter: (event: PointerEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      fillFrom(event.clientX - rect.left, event.clientY - rect.top);
    },
    onPointerLeave: () => setFilled(false),
    onFocus: (event: FocusEvent<HTMLButtonElement>) => {
      // A pointer press also focuses the button; only keyboard focus fills from the centre.
      if (!event.currentTarget.matches(":focus-visible")) return;
      const rect = event.currentTarget.getBoundingClientRect();
      fillFrom(rect.width / 2, rect.height / 2);
    },
    onBlur: () => setFilled(false),
  };
}
