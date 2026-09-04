"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Matter from "matter-js";

type Glyph = { body: Matter.Body; char: string; ink: Ink; homeX: number };

const WALL = 400;
const NAME = "LUCAS MOREIRA";

type Ink = {
  advance: number;
  left: number;
  right: number;
  ascent: number;
  descent: number;
};

/**
 * A glyph's body has to match its ink, not its advance box. Sizing bodies from
 * the advance and drawing from the "middle" baseline leaves every letter resting
 * at a slightly different height and overlapping its neighbours, because the ink
 * sits differently inside the em box for an S than for an A.
 */
function inkOf(ctx: CanvasRenderingContext2D, char: string): Ink {
  const m = ctx.measureText(char);
  return {
    advance: m.width,
    left: m.actualBoundingBoxLeft,
    right: m.actualBoundingBoxRight,
    ascent: m.actualBoundingBoxAscent,
    descent: m.actualBoundingBoxDescent,
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
    // Big, fast bodies need more solver passes than the defaults or they settle
    // interpenetrated after a hard drag.
    engine.positionIterations = 12;
    engine.velocityIterations = 10;
    engine.constraintIterations = 4;
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
      ctx.font = font;

      const chars = NAME.split("");
      const inks = chars.map((c) => (c === " " ? null : inkOf(ctx, c)));
      const widths = chars.map((c, i) =>
        c === " " ? size * 0.28 : inks[i]!.advance,
      );
      const total = widths.reduce((a, b) => a + b, 0);

      let cursor = (w - total) / 2;
      chars.forEach((char, i) => {
        const cw = widths[i];
        const ink = inks[i];
        if (ink) {
          const inkWidth = Math.max(ink.left + ink.right, 6);
          const inkHeight = Math.max(ink.ascent + ink.descent, 6);
          const homeX = cursor + (ink.right - ink.left) / 2;
          const body = Matter.Bodies.rectangle(
            homeX,
            18 + (i % 3) * 26,
            inkWidth,
            inkHeight,
            { restitution: 0.36, friction: 0.4, frictionAir: 0.012, chamfer: { radius: 2 } },
          );
          glyphs.push({ body, char, ink, homeX });
        }
        cursor += cw;
      });

      // The ceiling sits far above so letters can fall in from off-screen, and drops
      // flush with the top edge under zero gravity so they cannot drift out of frame.
      const CEILING_PARKED = -h * 2 - WALL / 2;
      const CEILING_CLOSED = -WALL / 2;
      const ceiling = Matter.Bodies.rectangle(
        w / 2,
        CEILING_PARKED,
        w + WALL * 2,
        WALL,
        { isStatic: true },
      );

      const walls = [
        Matter.Bodies.rectangle(w / 2, h + WALL / 2, w + WALL * 2, WALL, { isStatic: true }),
        Matter.Bodies.rectangle(-WALL / 2, h / 2, WALL, h * 6, { isStatic: true }),
        Matter.Bodies.rectangle(w + WALL / 2, h / 2, WALL, h * 6, { isStatic: true }),
        ceiling,
      ];

      Matter.Composite.add(engine.world, [...walls, ...glyphs.map((g) => g.body)]);

      const mouse = Matter.Mouse.create(canvas);
      mouse.pixelRatio = dpr;
      const drag = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.12, damping: 0.25, render: { visible: false } },
      });
      Matter.Composite.add(engine.world, drag);

      dropRef.current = () => {
        Matter.Body.setPosition(ceiling, { x: w / 2, y: CEILING_PARKED });
        glyphs.forEach((g, i) => {
          Matter.Body.setPosition(g.body, { x: g.homeX, y: -40 - i * 22 });
          Matter.Body.setAngle(g.body, 0);
          Matter.Body.setVelocity(g.body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(g.body, 0);
        });
      };

      gravityRef.current = (off: boolean) => {
        engine.gravity.y = off ? -0.06 : 1;
        Matter.Body.setPosition(ceiling, {
          x: w / 2,
          y: off ? CEILING_CLOSED : CEILING_PARKED,
        });
        // A nudge so nothing hangs perfectly still when the floor stops mattering.
        glyphs.forEach(({ body }) =>
          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.06),
        );
      };

      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.font = font;
        ctx.fillStyle = getComputedStyle(document.body).color;
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        for (const { body, char, ink } of glyphs) {
          ctx.save();
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);
          // Put the glyph's ink centre on the body centre, not its advance box.
          ctx.fillText(
            char,
            -(ink.right - ink.left) / 2,
            (ink.ascent - ink.descent) / 2,
          );
          ctx.restore();
        }
      };

      draw();

      // A fixed 1000/60 per animation frame runs at double speed on a 120Hz
      // display, which is enough extra travel per step to push letters through
      // each other. Step on elapsed time instead, and never faster than real time.
      const STEP = 1000 / 60;
      const MAX_SPEED = 26;
      let previous = performance.now();
      let debt = 0;

      const step = (now: number) => {
        if (disposed) return;
        debt = Math.min(debt + (now - previous), STEP * 5);
        previous = now;

        while (debt >= STEP) {
          Matter.Engine.update(engine, STEP);
          debt -= STEP;
          for (const { body } of glyphs) {
            if (body.speed > MAX_SPEED) {
              const scale = MAX_SPEED / body.speed;
              Matter.Body.setVelocity(body, {
                x: body.velocity.x * scale,
                y: body.velocity.y * scale,
              });
            }
          }
        }

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
