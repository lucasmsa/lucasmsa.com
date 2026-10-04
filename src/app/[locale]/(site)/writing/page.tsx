import type { Metadata } from "next";
import { unstable_ViewTransition as ViewTransition } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { IndexRow } from "@/components/site/index-row";
import { pageMetadata, type Locale } from "@/lib/seo";
import { paper, talks } from "@/content/writing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/writing",
    title: t("writingTitle"),
    description: t("writingDescription"),
  });
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("writing");
  const seo = await getTranslations("seo");

  return (
    <section className="shell section">
      <ViewTransition name="writing-heading">
        <h1 className="section-title">
            {t("title")}
            <span className="visually-hidden"> {seo("byline")}</span>
          </h1>
      </ViewTransition>
      <p className="section-intro">{t("intro")}</p>
      <div className="index">
        <IndexRow
          name={t("paperTitle")}
          description={t("paperBlurb")}
          tags={t("paperVenue")}
          href={paper.url}
          mark="page"
        />
        <IndexRow
          name={t("talksTitle")}
          description={t("talksBlurb")}
          tags={t("talksVenue")}
          href={talks.url}
          mark="page"
        />
      </div>
    </section>
  );
}
