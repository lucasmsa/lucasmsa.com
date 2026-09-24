"use client";

import type { ComponentProps } from "react";
import clsx from "clsx";
import { useInkFill } from "@/hooks/use-ink-fill";

export function InkButton({
  className,
  children,
  ...props
}: ComponentProps<"button">) {
  const { filled, ...ink } = useInkFill();

  return (
    <button
      type="button"
      {...props}
      {...ink}
      className={clsx("ink-button", className)}
      data-filled={filled || undefined}
    >
      <span className="ink-blob" aria-hidden="true" />
      <span className="ink-label">{children}</span>
    </button>
  );
}
