"use client";

import { useEffect, useRef, useState } from "react";

const COLUMNS = 96;
const STIFFNESS = 0.026;
const DAMPING = 0.017;
const SPREAD = 0.16;

const GRAVITY = 0.42;
/** Equilibrium submersion is GRAVITY / BUOYANCY, so this wets only the bottom eighth of the disc. */
const BUOYANCY = 0.023;


/** The far plane sits higher on screen and moves less, which is what reads as distance. */
const BACK_RISE = 13;
const BACK_CALM = 0.55;

type Geometry = {
  width: number;
  height: number;
  diameter: number;
  radius: number;
  centreX: number;
  restY: number;
  waterY: number;
};

/** Clearance above the disc at rest, so bobbing never clips the top of the head. */
const TOP_ROOM = 26;
/** Radius of the pool the water is cut to, measured from the waterline. */
const POOL_RADIUS = 104;

function geometryFor(diameter: number, width: number): Geometry {
  const radius = diameter / 2;
  // The disc settles where buoyancy cancels gravity, so the canvas is sized from
  // that resting position rather than from a guessed padding.
  const restingSubmersion = GRAVITY / BUOYANCY;
  const restY = TOP_ROOM + radius;
  const waterY = restY + radius - restingSubmersion;
  return {
    width,
    // The canvas ends where the pool does, so the arc is never squared off by
    // the element's own edge.
    height: Math.round(waterY + POOL_RADIUS),
    diameter,
    radius,
    centreX: width / 2,
    restY,
    waterY,
  };
}

/**
 * The water is a half-disc centred on the waterline, so its bottom reads as an
 * arc rather than the canvas edge. Two corrections ride on top of it: a
 * sideways fade, because the half-disc otherwise ends in two vertical chords at
 * the waterline, and a circle over the photo, because the pool's own radius
 * stops short of the top of the head.
 *
 * Layers composite onto the ones below them, so the order here is bottom-up:
 * pool, then the fade it is cut by, then the photo added back.
 */
function maskFor(g: Geometry) {
  return {
    maskImage: [
      `radial-gradient(circle ${g.radius + 8}px at ${g.centreX}px ${g.restY}px, #000 95%, transparent)`,
      "linear-gradient(to right, transparent, #000 26%, #000 74%, transparent)",
      `radial-gradient(circle ${POOL_RADIUS}px at ${g.centreX}px ${g.waterY}px, #000 46%, transparent)`,
    ].join(", "),
    maskComposite: "add, intersect, add",
  } as const;
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

    const columnStep = g.width / (COLUMNS - 1);

    const makePlane = () => ({
      surface: new Float32Array(COLUMNS),
      velocity: new Float32Array(COLUMNS),
    });
    const front = makePlane();
    const back = makePlane();
    const planes = [front, back];

    const splash = (column: number, force: number) => {
      const i = Math.max(0, Math.min(COLUMNS - 1, Math.round(column)));
      for (const plane of planes) {
        const scale = plane === back ? BACK_CALM : 1;
        plane.velocity[i] += force * scale;
        if (i > 0) plane.velocity[i - 1] += force * 0.5 * scale;
        if (i < COLUMNS - 1) plane.velocity[i + 1] += force * 0.5 * scale;
      }
    };

    const stepWater = () => {
      for (const { surface, velocity } of planes) {
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

    const traceSurface = (plane: typeof front, rise: number) => {
      ctx.beginPath();
      ctx.moveTo(0, g.waterY - rise + plane.surface[0]);
      for (let i = 1; i < COLUMNS; i++) {
        ctx.lineTo(i * columnStep, g.waterY - rise + plane.surface[i]);
      }
    };

    const seaPath = (plane: typeof front, rise: number) => {
      traceSurface(plane, rise);
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

    const fillSea = (top: string, bottom: string, rise = 0) => {
      const fill = ctx.createLinearGradient(0, g.waterY - rise - 14, 0, g.height);
      fill.addColorStop(0, top);
      fill.addColorStop(1, bottom);
      ctx.fillStyle = fill;
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, g.width, g.height);

      // Far plane, behind the disc. Higher on screen, calmer, dimmer.
      seaPath(back, BACK_RISE);
      fillSea("rgba(24, 74, 108, 0.40)", "rgba(10, 34, 55, 0.52)", BACK_RISE);
      traceSurface(back, BACK_RISE);
      ctx.strokeStyle = "rgba(77, 225, 255, 0.24)";
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // The disc sits between the two planes.
      ctx.save();
      clipDisc();
      drawPhoto(0, null);
      ctx.restore();

      // The submerged slice, tinted. No horizontal shift: displacing it reads as a
      // rendering glitch at this size rather than as refraction.
      ctx.save();
      clipDisc();
      seaPath(front, 0);
      ctx.clip();
      drawPhoto(0, "rgba(40, 120, 150, 0.30)");
      ctx.restore();

      // Near plane, over the disc. Same hue, brighter and more transparent.
      seaPath(front, 0);
      fillSea("rgba(77, 225, 255, 0.17)", "rgba(16, 62, 96, 0.26)");
      traceSurface(front, 0);
      ctx.strokeStyle = "rgba(77, 225, 255, 0.72)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
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
        const level = g.waterY + front.surface[centreColumn];
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

  return { canvasRef, maskStyle: maskFor(geometryFor(diameter, width)) };
}
