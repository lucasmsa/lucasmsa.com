export type Project = {
  id: string;
  /** What the thing is called to someone using it, not the repository slug. */
  name: string;
  tags: string[];
  /** The repository. Always present. */
  url: string;
  /** Where the thing actually runs, when it runs somewhere. */
  site?: string;
};

const gh = (repo: string) => `https://github.com/lucasmsa/${repo}`;

/** The display name is the product; the slug belongs on the link to the code. */
export const repoSlug = (project: Project) =>
  project.url.split("/").pop() ?? project.name;

/**
 * The GitHub listing arrives under repository slugs. These are the repositories
 * that go by something else in public; anything unlisted keeps its slug.
 */
const REPO_NAMES: Record<string, string> = {
  "paraiba-atlas": "Paraíba Atlas",
  "benfords-law-covid19": "Benford's Law and COVID-19",
  "a-star-visualizer": "A* Visualizer",
  "crimp-studio": "Crimp Studio",
  mandibible: "Mandibible",
  "athena-consortium-vs-financing-calculator": "Consortium vs Financing",
  "muse-ai": "Muse AI",
  "vehicle-identifier": "Vehicle Identifier",
  "embedded-systems": "Embedded Systems",
  "book-finder-app": "Book Finder",
  "edc-ufpb-grade-analyser": "UFPB Grade Analyser",
  "simple-genetic-algorithm": "Genetic Algorithm",
};

export const repoDisplayName = (repo: string) => REPO_NAMES[repo] ?? repo;

export const featured: Project[] = [
  {
    id: "coast-to-cup",
    name: "Coast to Cup",
    tags: ["TypeScript", "R3F", "Python", "Go"],
    url: gh("coast-to-cup"),
    site: "https://coast-to-cup.pages.dev",
  },
  {
    id: "hiit-maker",
    name: "HIIT Maker",
    tags: ["React 19", "Vite", "Zustand"],
    url: gh("hiit-maker"),
    site: "https://hiit-maker.lucasmsa.com",
  },
  {
    id: "vscodethemes-scrapper",
    name: "What Is My Theme?",
    tags: ["TypeScript", "PyTorch", "ONNX", "AWS S3"],
    url: gh("vscodethemes-scrapper"),
    site: "https://whatismytheme.lucasmsa.com",
  },
  {
    id: "arkham-theme",
    name: "Arkham Theme",
    tags: ["VS Code"],
    url: gh("arkham-theme"),
    site: "https://marketplace.visualstudio.com/items?itemName=lucasmsa.arkham-theme",
  },
  {
    id: "pixel-algorithms",
    name: "Pixel Algorithms",
    tags: ["TypeScript", "Canvas"],
    url: gh("pixel-algorithms"),
    site: "https://pixels.lucasmsa.com",
  },
];

export const claudeWork: Project[] = [
  {
    id: "claude-checkpoint-diagram",
    name: "Checkpoint Diagram",
    tags: ["Go", "Mermaid", "hooks"],
    url: gh("claude-checkpoint-diagram"),
  },
  {
    id: "claude-doc-tdd",
    name: "Doc TDD",
    tags: ["Python", "hooks"],
    url: gh("claude-doc-tdd"),
  },
  {
    id: "claude-visual-options",
    name: "Visual Options",
    tags: ["Python", "hooks", "design"],
    url: gh("claude-visual-options"),
  },
  {
    id: "claude-enhance-me",
    name: "Enhance Me",
    tags: ["Python", "hooks", "architecture"],
    url: gh("claude-enhance-me"),
  },
  {
    id: "claude-handoff",
    name: "Handoff",
    tags: ["Python", "hooks", "context"],
    url: gh("claude-handoff"),
  },
];
