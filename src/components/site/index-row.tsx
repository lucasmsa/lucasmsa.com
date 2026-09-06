import { RowMark } from "@/components/site/row-mark";
import type { MarkKind } from "@/utils/row-mark";

export function IndexRow({
  name,
  description,
  tags,
  href,
  codeHref,
  codeLabel,
  mark,
}: {
  name: string;
  description: string;
  tags?: string;
  href?: string;
  codeHref?: string;
  codeLabel?: string;
  mark: MarkKind;
}) {
  return (
    <div className="index-row">
      <RowMark kind={mark} seed={name} />
      {href ? (
        <a className="index-name" href={href} target="_blank" rel="noreferrer">
          {name}
        </a>
      ) : (
        <span className="index-name">{name}</span>
      )}
      {tags ? <span className="index-tags">{tags}</span> : null}
      {codeHref ? (
        <a
          className="index-code"
          href={codeHref}
          target="_blank"
          rel="noreferrer"
        >
          <span className="index-code-mark" aria-hidden="true">
            &lt;/&gt;
          </span>
          <span className="index-code-word">{codeLabel}</span>
        </a>
      ) : null}
      <p className="index-desc">{description}</p>
    </div>
  );
}
