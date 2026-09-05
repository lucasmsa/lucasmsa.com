export function IndexRow({
  name,
  description,
  tags,
  href,
  codeHref,
  codeLabel,
}: {
  name: string;
  description: string;
  tags?: string;
  href?: string;
  codeHref?: string;
  codeLabel?: string;
}) {
  return (
    <div className="index-row">
      <div>
        {href ? (
          <a
            className="index-name"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            {name}
          </a>
        ) : (
          <span className="index-name">{name}</span>
        )}
        <p className="index-desc">{description}</p>
      </div>
      <div className="index-meta">
        {tags ? <span className="index-tags">{tags}</span> : null}
        {codeHref ? (
          <a
            className="index-code"
            href={codeHref}
            target="_blank"
            rel="noreferrer"
          >
            {codeLabel}
          </a>
        ) : null}
      </div>
    </div>
  );
}
