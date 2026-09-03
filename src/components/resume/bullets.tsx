import type { Bullet } from "@/content/resume";

export function Bullets({ items }: { items: Bullet[] }) {
  return (
    <ul className="resume-bullets">
      {items.map((bullet) => (
        <li key={bullet.text}>
          {bullet.text}.{" "}
          {bullet.metric ? <strong>{bullet.metric}.</strong> : null}
        </li>
      ))}
    </ul>
  );
}
