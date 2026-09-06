import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

const CHROME =
  process.env.CHROME_BIN ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = process.env.RESUME_URL ?? "http://localhost:3000/resume-source";
const OUT = "public/resume.pdf";

// An unstyled render still produces a valid two-page PDF, which is why this once
// shipped without its stylesheet. Byte size was the first guard and it broke the
// moment the typeface changed. The font the sheet asks for either made it into
// the file or the CSS never applied, so that is what gets asserted.
const REQUIRED_FONT = "Arvo";

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

const pdf = readFileSync(OUT);
if (!pdf.includes(REQUIRED_FONT)) {
  throw new Error(
    `${OUT} does not embed ${REQUIRED_FONT}, so the page rendered without its ` +
      `stylesheet. Serve a production build and retry.`,
  );
}

// Chrome paints the page canvas from html/body, not from the sheet, so a short
// page used to come out with the site's dark background below the content.
// Every page must open on a white full-page fill.
const pageFills = () =>
  [...pdf.toString("latin1").matchAll(/stream\r?\n/g)].flatMap((match) => {
    const start = match.index + match[0].length;
    const body = pdf.subarray(start, pdf.indexOf("endstream", start));
    let text;
    try {
      text = inflateSync(body).toString("latin1");
    } catch {
      return [];
    }
    const fill = text.match(
      /([\d.]+) ([\d.]+) ([\d.]+) rg\s*(?:\/\w+ gs\s*)?(?:\/\w+ <<[^>]*>>BDC\s*)?0 0 \d+ \d+ re\s*f/,
    );
    return fill ? [fill.slice(1, 4).map(Number)] : [];
  });

const dark = pageFills().filter((rgb) => rgb.some((channel) => channel < 0.95));
if (dark.length > 0) {
  throw new Error(
    `${OUT} paints ${dark.length} page(s) on a non-white canvas ` +
      `(${dark.map((rgb) => rgb.join(" ")).join("; ")}). The site background is ` +
      `leaking past the sheet; force html and body white in the print stylesheet.`,
  );
}

const pages = pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g)?.length ?? 0;
console.log(`wrote ${OUT} (${pdf.length} bytes, ${pages} pages) from ${URL}`);
