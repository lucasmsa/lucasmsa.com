import { getTranslations, setRequestLocale } from "next-intl/server";
import { IndexRow } from "@/components/site/index-row";
import { paper } from "@/content/writing";

export default async function WritingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("writing");

  return (
    <section className="shell section">
      <h1 className="section-title">{t("title")}</h1>
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
          mark="page"
        />
      </div>
    </section>
  );
}
