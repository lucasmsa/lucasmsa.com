"use client";

import { useCallback } from "react";

export function usePrint() {
  return useCallback(() => window.print(), []);
}
