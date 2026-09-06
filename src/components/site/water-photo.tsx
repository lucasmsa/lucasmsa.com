"use client";

import { useWaterPhoto } from "@/hooks/use-water-photo";

const DIAMETER = 148;
const SEA_WIDTH = 300;

export function WaterPhoto() {
  const { canvasRef, maskStyle } = useWaterPhoto("/lucas.jpeg", DIAMETER, SEA_WIDTH);

  return (
    <canvas
      ref={canvasRef}
      className="lede-water"
      aria-hidden="true"
      style={maskStyle}
    />
  );
}
