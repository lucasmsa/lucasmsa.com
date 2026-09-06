"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { LocaleSwitch } from "@/components/site/locale-switch";

const links = [
  { href: "/projects", key: "projects" },
  { href: "/writing", key: "writing" },
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
        {/* /resume rewrites to the PDF, so this leaves the app rather than
            navigating a route. next/link would try to client-side route it. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/resume">{t("resume")}</a>
        <LocaleSwitch />
      </nav>
    </header>
  );
}
