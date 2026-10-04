import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { profile, roles, skills } from "@/content/resume";

export const SITE_URL = "https://lucasmsa.com";

export type Locale = (typeof routing.locales)[number];

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  "pt-BR": "pt_BR",
  es: "es_ES",
};

/** URL of a page in a locale, following the `as-needed` prefix rule: English has no prefix. */
export function localeUrl(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${clean}`;
}

export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) languages[locale] = localeUrl(locale, path);
  languages["x-default"] = localeUrl(routing.defaultLocale, path);
  return languages;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = localeUrl(locale, path);
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    robots: { index: true, follow: true },
    authors: [{ name: profile.shortName, url: SITE_URL }],
    creator: profile.shortName,
    openGraph: {
      type: path === "/" ? "profile" : "website",
      url,
      siteName: profile.shortName,
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const currentRole = roles.find((role) => role.end === "Present");

export function personSchema() {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: profile.shortName,
    alternateName: [profile.name, "lucasmsa"],
    jobTitle: profile.title,
    url: SITE_URL,
    image: `${SITE_URL}/lucas.jpeg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "João Pessoa",
      addressRegion: "Paraíba",
      addressCountry: "BR",
    },
    sameAs: [`https://${profile.github}`, `https://www.${profile.linkedin}`],
    knowsAbout: skills.flatMap((group) => group.items),
    ...(currentRole
      ? { worksFor: { "@type": "Organization", name: currentRole.company } }
      : {}),
  };
}

export function homeSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: profile.shortName,
        inLanguage: routing.locales,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        url: localeUrl(locale, "/"),
        inLanguage: locale,
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

export function resumeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}/resume-source`,
    inLanguage: "en",
    mainEntity: personSchema(),
  };
}

export function projectsSchema(
  locale: Locale,
  items: { name: string; url: string; description: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: localeUrl(locale, "/projects"),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.name,
        url: item.url,
        description: item.description,
        creator: { "@id": `${SITE_URL}/#person` },
      },
    })),
  };
}

/** JSON for a <script type="application/ld+json">; `<` is escaped so data can never close the tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
