import { execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";

const CHROME =
  process.env.CHROME_BIN ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = process.env.RESUME_URL ?? "http://localhost:3000/resume-source";
const OUT = "public/resume.pdf";

// An unstyled render still produces a valid two-page PDF, just a much smaller
// one, because none of the display fonts get embedded. 150KB sits between the
// two: the styled document is ~200KB, the CSS-less fallback ~100KB.
const MIN_BYTES = 150_000;

mkdirSync("public", { recursive: true });

execFileSync(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${OUT}`,
    "--virtual-time-budget=10000",
    URL,
  ],
  { stdio: "inherit" },
);

const { size } = statSync(OUT);
if (size < MIN_BYTES) {
  throw new Error(
    `${OUT} is ${size} bytes, under ${MIN_BYTES}. The page almost certainly ` +
      `rendered without its stylesheet. Serve a production build and retry.`,
  );
}

console.log(`wrote ${OUT} (${size} bytes) from ${URL}`);
