"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

const links = [
  { href: "/projects", key: "projects" },
  { href: "/writing", key: "writing" },
  { href: "/resume", key: "resume" },
] as const;

export function SiteNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <header className="shell nav">
      <Link href="/" className="nav-mark">
        <Image
          src="/logo.png"
          alt=""
          width={389}
          height={512}
          className="nav-logo"
          priority
        />
        Lucas Moreira
      </Link>
      <nav className="nav-links">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {t(link.key)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
