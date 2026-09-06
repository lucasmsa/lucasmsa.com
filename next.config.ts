import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const RESUME = "/resume.pdf";

const nextConfig: NextConfig = {
  // The resume is a document, so every name for it serves the same PDF at its own
  // URL. The HTML at /resume-source only exists to generate that PDF.
  async rewrites() {
    return [
      { source: "/resume", destination: RESUME },
      { source: "/cv", destination: RESUME },
      { source: "/cv.pdf", destination: RESUME },
    ];
  },
};

export default withNextIntl(nextConfig);
