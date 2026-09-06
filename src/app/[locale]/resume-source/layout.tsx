import type { Metadata } from "next";
import "./resume.css";

export const metadata: Metadata = {
  title: "Lucas Moreira | Resume",
  description:
    "Full-stack engineer with 5+ years across TypeScript, React, Ruby on Rails and Python.",
};

export default function ResumeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="resume-root">
      {children}
    </div>
  );
}
