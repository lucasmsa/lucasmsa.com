export type Project = {
  id: string;
  name: string;
  tags: string[];
  url: string;
};

const gh = (repo: string) => `https://github.com/lucasmsa/${repo}`;

export const featured: Project[] = [
  {
    id: "crimp-studio",
    name: "crimp-studio",
    tags: ["React", "Three.js", "TypeScript"],
    url: gh("crimp-studio"),
  },
  {
    id: "coast-to-cup",
    name: "coast-to-cup",
    tags: ["TypeScript", "R3F", "Python"],
    url: gh("coast-to-cup"),
  },
  {
    id: "hiit-maker",
    name: "hiit-maker",
    tags: ["React 19", "Vite", "Zustand"],
    url: gh("hiit-maker"),
  },
  {
    id: "vscodethemes-scrapper",
    name: "vscodethemes-scrapper",
    tags: ["TypeScript", "Puppeteer", "S3"],
    url: gh("vscodethemes-scrapper"),
  },
  {
    id: "arkham-theme",
    name: "arkham-theme",
    tags: ["VS Code"],
    url: gh("arkham-theme"),
  },
  {
    id: "pixel-algorithms",
    name: "pixel-algorithms",
    tags: ["TypeScript", "Canvas"],
    url: gh("pixel-algorithms"),
  },
];

export const claudeWork: Project[] = [
  {
    id: "claude-checkpoint-diagram",
    name: "claude-checkpoint-diagram",
    tags: ["Go", "Mermaid"],
    url: gh("claude-checkpoint-diagram"),
  },
  {
    id: "claude-doc-tdd",
    name: "claude-doc-tdd",
    tags: ["Python"],
    url: gh("claude-doc-tdd"),
  },
];
