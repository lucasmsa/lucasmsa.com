"use client";

import { useTranslations } from "next-intl";
import { profile } from "@/content/resume";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="shell footer">
      <div className="footer-links">
        <a href={`mailto:${profile.email}`}>{t("email")}</a>
        <a href={`https://${profile.github}`}>{t("github")}</a>
        <a href={`https://${profile.linkedin}`}>{t("linkedin")}</a>
      </div>
    </footer>
  );
}
