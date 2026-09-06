export type MarkKind = "pixels" | "page";

/** Cells per side of the pixel mark. Only half are drawn; the rest is mirrored. */
const PIXEL_CELLS = 6;
const PAGE_LINES = 7;

export type PixelCell = { column: number; row: number; alpha: number };
export type PageLine = { width: number; thick: boolean };

/** FNV-1a. The mark has to be the same every render, so nothing here is random. */
function seedOf(text: string) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function sequence(text: string) {
  let state = seedOf(text);
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/** A mirrored block pattern, in the spirit of an identicon. */
export function pixelCells(text: string): PixelCell[] {
  const next = sequence(text);
  const cells: PixelCell[] = [];
  for (let column = 0; column < Math.ceil(PIXEL_CELLS / 2); column++) {
    for (let row = 0; row < PIXEL_CELLS; row++) {
      if (next() < 0.45) continue;
      const alpha = 0.22 + next() * 0.58;
      cells.push({ column, row, alpha });
      cells.push({ column: PIXEL_CELLS - 1 - column, row, alpha });
    }
  }
  return cells;
}

/** A page of set type: a heading rule, body lines, and a short last line. */
export function pageLines(text: string): PageLine[] {
  const next = sequence(text);
  return Array.from({ length: PAGE_LINES }, (_, index) => {
    if (index === 0) return { width: 0.52 + next() * 0.22, thick: true };
    if (index === PAGE_LINES - 1) return { width: 0.3 + next() * 0.26, thick: false };
    return { width: 0.66 + next() * 0.34, thick: false };
  });
}

export const markGeometry = { pixelCells: PIXEL_CELLS, pageLines: PAGE_LINES };
