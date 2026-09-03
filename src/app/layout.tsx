import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucas Moreira | Software Engineer",
  description: "Software engineer who thrives on building high-impact systems. Specializing in React, TypeScript, Ruby on Rails, and scalable solutions.",
  keywords: ["software engineer", "react", "typescript", "ruby on rails", "full stack", "lucas moreira"],
  authors: [{ name: "Lucas Moreira" }],
  openGraph: {
    title: "Lucas Moreira | Software Engineer",
    description: "Software engineer who thrives on building high-impact systems",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
