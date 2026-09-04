export function IndexRow({
  name,
  description,
  tags,
  href,
}: {
  name: string;
  description: string;
  tags?: string;
  href?: string;
}) {
  const content = (
    <>
      <div>
        <div className="index-name">{name}</div>
        <p className="index-desc">{description}</p>
      </div>
      {tags ? <span className="index-tags">{tags}</span> : null}
    </>
  );

  if (href) {
    return (
      <a className="index-row" href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return <div className="index-row">{content}</div>;
}
