import { getTranslations, setRequestLocale } from "next-intl/server";
import { IndexRow } from "@/components/site/index-row";
import { featured, claudeWork } from "@/content/projects";
import { fetchRepos } from "@/lib/github";

export const revalidate = 86400;

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  const curated = [...featured, ...claudeWork];
  const featuredNames = new Set(curated.map((project) => project.name));
  const repos = (await fetchRepos()).filter(
    (repo) => !featuredNames.has(repo.name),
  );

  return (
    <>
      <section className="shell section">
        <h1 className="section-title">{t("title")}</h1>
        <p className="section-intro">{t("intro")}</p>
        <div className="index">
          {featured.map((project) => (
            <IndexRow
              key={project.id}
              name={project.name}
              description={t(`items.${project.id}`)}
              tags={project.tags.join(", ")}
              href={project.site ?? project.url}
              codeHref={project.site ? project.url : undefined}
              codeLabel={t("code")}
            />
          ))}
        </div>
      </section>

      <section className="shell section">
        <h2 className="section-title">{t("claude")}</h2>
        <p className="section-intro">{t("claudeIntro")}</p>
        <div className="index">
          {claudeWork.map((project) => (
            <IndexRow
              key={project.id}
              name={project.name}
              description={t(`items.${project.id}`)}
              tags={project.tags.join(", ")}
              href={project.site ?? project.url}
              codeHref={project.site ? project.url : undefined}
              codeLabel={t("code")}
            />
          ))}
        </div>
      </section>

      {repos.length > 0 ? (
        <section className="shell section">
          <h2 className="section-title">{t("more")}</h2>
          <p className="section-intro">{t("moreIntro")}</p>
          <div className="index">
            {repos.map((repo) => (
              <IndexRow
                key={repo.name}
                name={repo.name}
                description={repo.description ?? ""}
                tags={repo.language ?? undefined}
                href={repo.site ?? repo.url}
                codeHref={repo.site ? repo.url : undefined}
                codeLabel={t("code")}
              />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
