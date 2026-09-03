export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="resume-section">
      <h2 className="resume-section-title">{title}</h2>
      {children}
    </section>
  );
}

export function Entry({
  primary,
  secondary,
  aside,
  meta,
  children,
}: {
  primary: string;
  secondary?: string;
  aside?: string;
  meta?: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="resume-entry">
      <div className="resume-entry-row">
        <span className="resume-entry-primary">{primary}</span>
        {aside ? <span className="resume-entry-meta">{aside}</span> : null}
      </div>
      {secondary || meta ? (
        <div className="resume-entry-row">
          <span className="resume-entry-secondary">{secondary}</span>
          {meta ? <span className="resume-entry-meta">{meta}</span> : null}
        </div>
      ) : null}
      {children}
    </article>
  );
}
