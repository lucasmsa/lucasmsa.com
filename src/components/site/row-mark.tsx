"use client";

import { useRowMark } from "@/hooks/use-row-mark";
import type { MarkKind } from "@/utils/row-mark";

export function RowMark({ kind, seed }: { kind: MarkKind; seed: string }) {
  const canvasRef = useRowMark(kind, seed);

  return <canvas ref={canvasRef} className="index-mark" aria-hidden="true" />;
}
