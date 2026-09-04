"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLetterPhysics } from "@/hooks/use-letter-physics";

export function Hero() {
  const t = useTranslations("hero");
  const meta = useTranslations("meta");
  const {
    stageRef,
    canvasRef,
    reset,
    toggleGravity,
    weightless,
    reducedMotion,
    name,
  } = useLetterPhysics();

  return (
    <section className="shell hero">
      <h1 className="hero-name-a11y">{name}</h1>

      {reducedMotion ? (
        <p className="hero-fallback" aria-hidden="true">
          {name}
        </p>
      ) : (
        <>
          <div className="hero-stage" ref={stageRef} onDoubleClick={reset}>
            <canvas ref={canvasRef} aria-hidden="true" />
          </div>
          <div className="hero-controls">
            <span>{t("hint")}</span>
            <button
              type="button"
              className="hero-reset"
              onClick={toggleGravity}
              aria-pressed={weightless}
            >
              {weightless ? t("gravityOn") : t("gravityOff")}
            </button>
            <button type="button" className="hero-reset" onClick={reset}>
              {t("reset")}
            </button>
          </div>
        </>
      )}

      <div className="lede">
        <div>
          <p className="lede-bio">
            {t.rich("bio", {
              accent: (chunks) => <span className="acc">{chunks}</span>,
            })}
          </p>
          <p className="lede-meta">
            <span>{meta("now")}</span>
            <span>{meta("location")}</span>
          </p>
        </div>
        <Image
          src="/lucas.jpeg"
          alt=""
          width={128}
          height={158}
          priority
        />
      </div>
    </section>
  );
}
