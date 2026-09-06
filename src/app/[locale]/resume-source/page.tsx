import { Bullets } from "@/components/resume/bullets";
import { Entry, Section } from "@/components/resume/section";
import {
  education,
  languages,
  profile,
  projects,
  roles,
  skills,
} from "@/content/resume";

export default function ResumePage() {
  return (
    <>
      <main className="resume-sheet">
        <header className="resume-masthead">
          <h1 className="resume-name">{profile.name}</h1>
          <p className="resume-contact">
            <span className="resume-nowrap">{profile.location}</span>
            <br />
            <span className="resume-nowrap">{profile.phone}</span>
            <span className="resume-sep">•</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span className="resume-sep">•</span>
            <a href={`https://${profile.github}`}>{profile.github}</a>
            <span className="resume-sep">•</span>
            <a href={`https://${profile.linkedin}`}>{profile.linkedin}</a>
          </p>
        </header>

        <p className="resume-summary">{profile.summary}</p>

        <Section title="Experience">
          <div className="resume-entries">
            {roles.map((role) => (
              <Entry
                key={`${role.company}-${role.start}`}
                primary={role.title}
                secondary={role.company}
                aside={role.location}
                meta={`${role.start} — ${role.end}`}
              >
                <Bullets items={role.bullets} />
              </Entry>
            ))}
          </div>
        </Section>

        <Section title="Projects">
          <div className="resume-entries">
            {projects.map((project) => (
              <Entry
                key={project.name}
                primary={project.name}
                aside={project.url}
              >
                <p className="resume-stack">
                  {project.tagline}.{project.stack ? ` ${project.stack.join(", ")}` : ""}
                </p>
              </Entry>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <Entry
            primary={education.school}
            secondary={education.degree}
            aside={education.detail}
            meta={`${education.start} — ${education.end}`}
          />
        </Section>

        <Section title="Additional">
          <div className="resume-additional">
            {skills.map((group) => (
              <p key={group.group} className="resume-additional-row">
                <strong>{group.group}:</strong> {group.items.join(", ")}
              </p>
            ))}
            <p className="resume-additional-row">
              <strong>Spoken:</strong>{" "}
              {languages
                .map((language) => `${language.name} (${language.level})`)
                .join(", ")}
            </p>
          </div>
        </Section>
      </main>
    </>
  );
}
