"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { profile } from "@/content/resume";

const localeNames: Record<string, string> = {
  en: "EN",
  "pt-BR": "PT",
  es: "ES",
};

export function SiteFooter() {
  const t = useTranslations("footer");
  const pathname = usePathname();
  const active = useLocale();

  return (
    <footer className="shell footer">
      <div className="footer-links">
        <a href={`mailto:${profile.email}`}>{t("email")}</a>
        <a href={`https://${profile.github}`}>{t("github")}</a>
        <a href={`https://${profile.linkedin}`}>{t("linkedin")}</a>
      </div>
      <div className="locale-switch">
        {routing.locales.map((locale) => (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            aria-current={locale === active ? "true" : undefined}
          >
            {localeNames[locale]}
          </Link>
        ))}
      </div>
    </footer>
  );
}
