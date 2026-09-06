import type { Metadata } from "next";
import { Arvo } from "next/font/google";
import "./resume.css";

const arvo = Arvo({
  variable: "--font-arvo",
  subsets: ["latin"],
  weight: ["400", "700"],
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
    <div className={`${arvo.variable} resume-root`}>
      {children}
    </div>
  );
}
