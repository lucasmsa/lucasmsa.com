import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL, languageAlternates, localeUrl } from "@/lib/seo";

const PAGES = [
  { path: "/", priority: 1 },
  { path: "/projects", priority: 0.8 },
  { path: "/writing", priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const localized = PAGES.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified,
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  );
  return [
    ...localized,
    { url: `${SITE_URL}/resume-source`, lastModified, priority: 0.7 },
    { url: `${SITE_URL}/resume`, lastModified, priority: 0.7 },
  ];
}
