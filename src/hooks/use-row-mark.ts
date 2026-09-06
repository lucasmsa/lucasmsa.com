"use client";

import { useEffect, useRef } from "react";
import {
  markGeometry,
  pageLines,
  pixelCells,
  type MarkKind,
} from "@/utils/row-mark";

const SIZE = 52;
const INK = "77, 225, 255";

function drawPixels(ctx: CanvasRenderingContext2D, seed: string) {
  const step = SIZE / markGeometry.pixelCells;
  for (const cell of pixelCells(seed)) {
    ctx.fillStyle = `rgba(${INK}, ${cell.alpha})`;
    ctx.fillRect(cell.column * step, cell.row * step, step, step);
  }
}

function drawPage(ctx: CanvasRenderingContext2D, seed: string) {
  const margin = 7;
  const column = SIZE - margin * 2;
  const lines = pageLines(seed);
  // The heading rule is twice as tall, so the leading has to be measured from
  // the total ink rather than divided evenly.
  const ink = lines.reduce((total, line) => total + (line.thick ? 2 : 1), 0);
  const leading = (SIZE - margin * 2 - ink) / (lines.length - 1);

  let y = margin;
  for (const line of lines) {
    const height = line.thick ? 2 : 1;
    ctx.fillStyle = `rgba(${INK}, ${line.thick ? 0.8 : 0.42})`;
    ctx.fillRect(margin, y, column * line.width, height);
    y += height + leading;
  }
}

export function useRowMark(kind: MarkKind, seed: string) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(SIZE * dpr);
    canvas.height = Math.round(SIZE * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, SIZE, SIZE);

    if (kind === "pixels") drawPixels(ctx, seed);
    else drawPage(ctx, seed);
  }, [kind, seed]);

  return canvasRef;
}
