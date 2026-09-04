import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const CHROME =
  process.env.CHROME_BIN ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = process.env.RESUME_URL ?? "http://localhost:3000/resume";
const OUT = "public/lucas-moreira.pdf";

mkdirSync("public", { recursive: true });

execFileSync(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${OUT}`,
    "--virtual-time-budget=8000",
    URL,
  ],
  { stdio: "inherit" },
);

console.log(`wrote ${OUT} from ${URL}`);
