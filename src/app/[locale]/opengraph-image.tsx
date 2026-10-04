import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const alt = "Lucas Moreira";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dark palette of ADR-0005: ground, foreground, muted, rules, accent.
const INK = { ground: "#070A0F", fg: "#E2ECF5", muted: "#ADB9C9", rule: "#152030", accent: "#4DE1FF" };

const asset = (file: string) => readFile(join(process.cwd(), "src/assets/og", file));

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const meta = await getTranslations({ locale, namespace: "meta" });
  const seo = await getTranslations({ locale, namespace: "seo" });
  const [anton, work, workExt, photo] = await Promise.all([
    asset("Anton-Regular.ttf"),
    asset("WorkSans-500.woff"),
    asset("WorkSans-500-ext.woff"),
    readFile(join(process.cwd(), "public/lucas.jpeg")),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK.ground,
          padding: "64px 72px",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `12px solid ${INK.accent}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div
            style={{
              fontFamily: "Anton",
              fontSize: 156,
              lineHeight: 0.92,
              color: INK.fg,
              letterSpacing: -1,
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Lucas</span>
            <span>Moreira</span>
          </div>
          <div style={{ fontFamily: "Work Sans", fontSize: 38, color: INK.accent, marginTop: 28 }}>
            {seo("ogTagline")}
          </div>
          <div style={{ fontFamily: "Work Sans", fontSize: 30, color: INK.muted, marginTop: 10 }}>
            {`${meta("location")}  |  lucasmsa.com`}
          </div>
        </div>
        <img
          src={photoSrc}
          alt=""
          width={330}
          height={330}
          style={{ borderRadius: 330, objectFit: "cover", border: `6px solid ${INK.rule}` }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Anton", data: anton, weight: 400, style: "normal" },
        { name: "Work Sans", data: work, weight: 500, style: "normal" },
        { name: "Work Sans", data: workExt, weight: 500, style: "normal" },
      ],
    },
  );
}
