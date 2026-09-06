"use client";

import { useEffect, useRef, useState } from "react";

const COLUMNS = 96;
const STIFFNESS = 0.026;
const DAMPING = 0.017;
const SPREAD = 0.16;

const GRAVITY = 0.42;
/** Equilibrium submersion is GRAVITY / BUOYANCY, which floats the disc a little under half under. */
const BUOYANCY = 0.0068;

/** Where the waterline crosses the disc at rest, as a fraction of its diameter. */
const WATERLINE = 0.58;

type Geometry = {
  width: number;
  height: number;
  diameter: number;
  radius: number;
  centreX: number;
  restY: number;
  waterY: number;
};

function geometryFor(diameter: number, width: number): Geometry {
  const bob = Math.round(diameter * 0.13);
  const radius = diameter / 2;
  const restY = bob + radius;
  return {
    width,
    height: diameter + bob * 2,
    diameter,
    radius,
    centreX: width / 2,
    restY,
    waterY: restY - radius + diameter * WATERLINE,
  };
}

export function useWaterPhoto(src: string, diameter: number, width: number) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const g = geometryFor(diameter, width);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.style.width = `${g.width}px`;
    canvas.style.height = `${g.height}px`;
    canvas.width = Math.round(g.width * dpr);
    canvas.height = Math.round(g.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const surface = new Float32Array(COLUMNS);
    const velocity = new Float32Array(COLUMNS);
    const columnStep = g.width / (COLUMNS - 1);

    const splash = (column: number, force: number) => {
      const i = Math.max(0, Math.min(COLUMNS - 1, Math.round(column)));
      velocity[i] += force;
      if (i > 0) velocity[i - 1] += force * 0.5;
      if (i < COLUMNS - 1) velocity[i + 1] += force * 0.5;
    };

    const stepWater = () => {
      for (let i = 0; i < COLUMNS; i++) {
        velocity[i] += -STIFFNESS * surface[i] - DAMPING * velocity[i];
        surface[i] += velocity[i];
      }
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < COLUMNS; i++) {
          if (i > 0) velocity[i - 1] += SPREAD * (surface[i] - surface[i - 1]);
          if (i < COLUMNS - 1)
            velocity[i + 1] += SPREAD * (surface[i] - surface[i + 1]);
        }
      }
    };

    const image = new Image();
    image.src = src;

    let discY = g.restY;
    let discV = 0;
    let tick = 0;
    let frame = 0;
    let disposed = false;

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      splash(((event.clientX - rect.left) / g.width) * (COLUMNS - 1), -1.4);
    };
    canvas.addEventListener("pointermove", onPointer);

    const clipDisc = () => {
      ctx.beginPath();
      ctx.arc(g.centreX, discY, g.radius, 0, Math.PI * 2);
      ctx.clip();
    };

    const traceSurface = () => {
      ctx.beginPath();
      ctx.moveTo(0, g.waterY + surface[0]);
      for (let i = 1; i < COLUMNS; i++) {
        ctx.lineTo(i * columnStep, g.waterY + surface[i]);
      }
    };

    const seaPath = () => {
      traceSurface();
      ctx.lineTo(g.width, g.height);
      ctx.lineTo(0, g.height);
      ctx.closePath();
    };

    const drawPhoto = (offsetX: number, tint: string | null) => {
      if (!image.complete || !image.naturalWidth) return;
      const scale = Math.max(
        g.diameter / image.naturalWidth,
        g.diameter / image.naturalHeight,
      );
      const w = image.naturalWidth * scale;
      const h = image.naturalHeight * scale;
      // Both faces sit above centre in the source, so the crop rides high.
      ctx.drawImage(
        image,
        g.centreX - w / 2 + offsetX,
        discY - g.radius - (h - g.diameter) * 0.38,
        w,
        h,
      );
      if (tint) {
        ctx.fillStyle = tint;
        ctx.fillRect(
          g.centreX - g.radius,
          discY - g.radius,
          g.diameter,
          g.diameter,
        );
      }
    };

    const fillSea = (top: string, bottom: string) => {
      const fill = ctx.createLinearGradient(0, g.waterY - 14, 0, g.height);
      fill.addColorStop(0, top);
      fill.addColorStop(1, bottom);
      ctx.fillStyle = fill;
      ctx.fill();
    };

    /** Bright flecks where the surface tilts hardest, standing in for a light hitting the crests. */
    const drawSpecular = () => {
      ctx.lineWidth = 1.2;
      for (let i = 1; i < COLUMNS - 1; i++) {
        const slope = surface[i + 1] - surface[i - 1];
        const strength = Math.min(Math.abs(slope) * 0.5, 0.7);
        if (strength < 0.06) continue;
        ctx.strokeStyle = `rgba(226, 236, 245, ${strength.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(i * columnStep, g.waterY + surface[i] - 2.5);
        ctx.lineTo((i + 1) * columnStep, g.waterY + surface[i + 1] - 2.5);
        ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, g.width, g.height);

      // 1. the sea behind everything, spanning the full width
      seaPath();
      fillSea("rgba(31, 96, 138, 0.55)", "rgba(12, 44, 70, 0.85)");

      // 2. the disc on top of it
      ctx.save();
      clipDisc();
      drawPhoto(0, null);
      ctx.restore();

      // 3. the submerged slice again, shoved by the local wave slope
      ctx.save();
      clipDisc();
      seaPath();
      ctx.clip();
      const mid = Math.round(((g.centreX / g.width) * (COLUMNS - 1)) | 0);
      const slope = (surface[mid] - surface[Math.max(0, mid - 4)]) * 1.6;
      drawPhoto(slope + 3, "rgba(40, 120, 150, 0.30)");
      ctx.restore();

      // 4. water in front of the disc, so the submerged half reads as under it
      seaPath();
      fillSea("rgba(77, 225, 255, 0.26)", "rgba(16, 62, 96, 0.42)");

      traceSurface();
      ctx.strokeStyle = "#4de1ff";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      drawSpecular();
    };

    image.onload = draw;

    if (reducedMotion) {
      draw();
      return () => canvas.removeEventListener("pointermove", onPointer);
    }

    const STEP = 1000 / 60;
    let previous = performance.now();
    let debt = 0;

    const loop = (now: number) => {
      if (disposed) return;
      debt = Math.min(debt + (now - previous), STEP * 5);
      previous = now;
      const centreColumn = ((g.centreX / g.width) * (COLUMNS - 1)) | 0;
      while (debt >= STEP) {
        const level = g.waterY + surface[centreColumn];
        const submerged = Math.max(
          0,
          Math.min(discY + g.radius - level, g.diameter),
        );
        discV += GRAVITY;
        discV -= submerged * BUOYANCY;
        discV *= submerged > 0 ? 0.86 : 0.985;
        discY += discV;

        splash(centreColumn, discV * 0.22);
        if (++tick % 150 === 0) {
          splash(Math.floor(Math.random() * COLUMNS), -0.55);
        }
        stepWater();
        debt -= STEP;
      }
      draw();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", onPointer);
    };
  }, [src, diameter, width, reducedMotion]);

  return { canvasRef };
}
