import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/site/hero";
import { IndexRow } from "@/components/site/index-row";
import { Link } from "@/i18n/routing";
import { featured } from "@/content/projects";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const p = await getTranslations("projects");
  const w = await getTranslations("writing");

  return (
    <>
      <Hero />

      <section className="shell section">
        <h2 className="section-title">{t("projects")}</h2>
        <div className="index">
          {featured.slice(0, 4).map((project) => (
            <IndexRow
              key={project.id}
              name={project.name}
              description={p(`items.${project.id}`)}
              tags={project.tags.join(", ")}
              href={project.url}
            />
          ))}
        </div>
        <Link className="section-more" href="/projects">
          {t("allProjects")}
        </Link>
      </section>

      <section className="shell section">
        <h2 className="section-title">{t("writing")}</h2>
        <div className="index">
          <IndexRow
            name={w("paperTitle")}
            description={w("paperBlurb")}
            tags={w("paperVenue")}
          />
          <IndexRow
            name={w("talksTitle")}
            description={w("talksBlurb")}
            tags={w("talksVenue")}
          />
        </div>
      </section>
    </>
  );
}
