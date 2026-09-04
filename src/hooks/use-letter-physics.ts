"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Matter from "matter-js";

type Glyph = { body: Matter.Body; char: string };

const WALL = 400;
const NAME = "LUCAS MOREIRA";

function measure(ctx: CanvasRenderingContext2D, font: string) {
  ctx.font = font;
  return (char: string) => {
    const m = ctx.measureText(char);
    return {
      width: m.width,
      height: m.actualBoundingBoxAscent + m.actualBoundingBoxDescent,
      ascent: m.actualBoundingBoxAscent,
    };
  };
}

export function useLetterPhysics() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropRef = useRef<(() => void) | undefined>(undefined);
  const gravityRef = useRef<((off: boolean) => void) | undefined>(undefined);
  const [weightless, setWeightless] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas || reducedMotion) return;

    let frame = 0;
    let disposed = false;
    const engine = Matter.Engine.create();
    const glyphs: Glyph[] = [];

    const start = async () => {
      await document.fonts.ready;
      if (disposed) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = stage.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const size = Math.max(44, Math.min(w / 7.4, 150));
      const family =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--font-anton")
          .trim() || "Anton";
      const font = `400 ${size}px ${family}, sans-serif`;
      const sizeOf = measure(ctx, font);

      const chars = NAME.split("");
      const widths = chars.map((c) => (c === " " ? size * 0.28 : sizeOf(c).width));
      const total = widths.reduce((a, b) => a + b, 0);

      let cursor = (w - total) / 2;
      chars.forEach((char, i) => {
        const cw = widths[i];
        if (char !== " ") {
          const g = sizeOf(char);
          const body = Matter.Bodies.rectangle(
            cursor + cw / 2,
            18 + (i % 3) * 26,
            Math.max(cw * 0.86, 8),
            Math.max(g.height, 8),
            { restitution: 0.36, friction: 0.4, frictionAir: 0.012, chamfer: { radius: 2 } },
          );
          glyphs.push({ body, char });
        }
        cursor += cw;
      });

      const walls = [
        Matter.Bodies.rectangle(w / 2, h + WALL / 2, w + WALL * 2, WALL, { isStatic: true }),
        Matter.Bodies.rectangle(-WALL / 2, h / 2, WALL, h * 6, { isStatic: true }),
        Matter.Bodies.rectangle(w + WALL / 2, h / 2, WALL, h * 6, { isStatic: true }),
        Matter.Bodies.rectangle(w / 2, -h * 2 - WALL / 2, w + WALL * 2, WALL, { isStatic: true }),
      ];

      Matter.Composite.add(engine.world, [...walls, ...glyphs.map((g) => g.body)]);

      const mouse = Matter.Mouse.create(canvas);
      mouse.pixelRatio = dpr;
      const drag = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.18, render: { visible: false } },
      });
      Matter.Composite.add(engine.world, drag);

      dropRef.current = () => {
        glyphs.forEach((g, i) => {
          Matter.Body.setPosition(g.body, {
            x: (w - total) / 2 + widths.slice(0, i).reduce((a, b) => a + b, 0),
            y: -40 - i * 22,
          });
          Matter.Body.setAngle(g.body, 0);
          Matter.Body.setVelocity(g.body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(g.body, 0);
        });
      };

      gravityRef.current = (off: boolean) => {
        engine.gravity.y = off ? -0.06 : 1;
        // A nudge so nothing hangs perfectly still when the floor stops mattering.
        glyphs.forEach(({ body }) =>
          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.06),
        );
      };

      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.font = font;
        ctx.fillStyle = getComputedStyle(document.body).color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (const { body, char } of glyphs) {
          ctx.save();
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);
          ctx.fillText(char, 0, 0);
          ctx.restore();
        }
      };

      draw();

      const step = () => {
        if (disposed) return;
        Matter.Engine.update(engine, 1000 / 60);
        draw();
        frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    void start();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [reducedMotion]);

  const reset = useCallback(() => {
    dropRef.current?.();
    gravityRef.current?.(false);
    setWeightless(false);
  }, []);

  const toggleGravity = useCallback(() => {
    setWeightless((off) => {
      gravityRef.current?.(!off);
      return !off;
    });
  }, []);

  return {
    stageRef,
    canvasRef,
    reset,
    toggleGravity,
    weightless,
    reducedMotion,
    name: NAME,
  };
}
