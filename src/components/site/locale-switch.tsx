"use client";

import { useLocale } from "next-intl";
import { Link, usePathname, routing } from "@/i18n/routing";

const localeNames: Record<string, string> = {
  en: "EN",
  "pt-BR": "PT",
  es: "ES",
};

export function LocaleSwitch() {
  const pathname = usePathname();
  const active = useLocale();

  return (
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
  );
}
