import type { Metadata } from "next";
import { Newsreader, Jost } from "next/font/google";
import "./resume.css";

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const body = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Lucas Moreira | Resume",
  description:
    "Full-stack engineer with 5+ years across TypeScript, React, Ruby on Rails and Python.",
};

export default function ResumeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${display.variable} ${body.variable} resume-root`}>
      {children}
    </div>
  );
}
