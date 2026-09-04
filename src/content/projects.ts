export type Project = {
  id: string;
  name: string;
  tags: string[];
  url?: string;
};

export const featured: Project[] = [
  {
    id: "open-portfolio",
    name: "open-portfolio",
    tags: ["Elixir", "Phoenix LiveView", "MCP"],
  },
  {
    id: "crimp-studio",
    name: "crimp-studio",
    tags: ["React", "Three.js", "TypeScript"],
  },
  {
    id: "mandibible",
    name: "mandibible",
    tags: ["Three.js", "Python", "CBCT"],
  },
  {
    id: "claude-checkpoint-diagram",
    name: "claude-checkpoint-diagram",
    tags: ["TypeScript", "Mermaid"],
    url: "https://github.com/lucasmsa/claude-checkpoint-diagram",
  },
  {
    id: "hiit-maker",
    name: "hiit-maker",
    tags: ["React 19", "Vite", "Zustand"],
    url: "https://github.com/lucasmsa/hiit-maker",
  },
];
