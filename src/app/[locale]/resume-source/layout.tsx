import type { Metadata } from "next";
import { Arvo } from "next/font/google";
import "./resume.css";
import { profile } from "@/content/resume";
import { SITE_URL } from "@/lib/seo";

const arvo = Arvo({
  variable: "--font-arvo",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: { absolute: "Lucas Moreira | Resume" },
  description: profile.summary,
  alternates: { canonical: `${SITE_URL}/resume-source` },
  robots: { index: true, follow: true },
};

export default function ResumeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${arvo.variable} resume-root`}>
      {children}
    </div>
  );
}
