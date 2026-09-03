"use client";

import { usePrint } from "@/hooks/use-print";

export function PrintButton() {
  const print = usePrint();

  return (
    <button type="button" className="resume-print-button" onClick={print}>
      Save as PDF
    </button>
  );
}
