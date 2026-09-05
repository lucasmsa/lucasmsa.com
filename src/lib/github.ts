export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  site: string | null;
  pushedAt: string;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

const ENDPOINT =
  "https://api.github.com/users/lucasmsa/repos?per_page=100&sort=pushed";

/** Pinned by hand. These win over every rule below, however old or oddly named. */
const ALWAYS_SHOW = new Set([
  "edc-ufpb-grade-analyser",
  "vehicle-identifier",
  "embedded-systems",
  "book-finder-app",
  "simple-genetic-algorithm",
]);

/** Anything last touched before this is university-era coursework. */
const ACTIVE_SINCE = Date.parse("2024-01-01");

/** Descriptions that announce the repo is graded groupwork rather than a project. */
const NOISE_DESCRIPTIONS = [
  /em grupo/i,
  /realizad[ao]/i,
  /trabalho final/i,
  /disciplina/i,
  /final project/i,
  /bootcamp/i,
  /rocketseat/i,
  /\bignite\b/i,
  /\bcourse\b/i,
  /challenge/i,
  /assess?ment/i,
  /technical (test|evaluation|evalutation)/i,
  /interview question/i,
];

/** Coursework, bootcamp modules and hiring take-homes: written to be graded, not to be read. */
const EXCLUDED = [
  /^gostack/i,
  /rocketseat/i,
  /bootcamp/i,
  /udemy/i,
  /-course$/i,
  /course$/i,
  /ignite-challenges/i,
  /challenge/i,
  /assess?ment/i,
  /evalu[at]tion/i,
  /coding-test/i,
  /-tests?$/i,
  /interview/i,
  /algo-expert/i,
  /cracking-the-code/i,
  /dataquest/i,
  /freecodecamp/i,
  /ufpb/i,
  /^iti-project/i,
  /embedded-systems/i,
  /^arjs-test/i,
  /hands-on-rust/i,
  /rust-book-notes/i,
  /educative-io/i,
  /^mosh-/i,
  /^node-advanced/i,
  /erickwendel/i,
  /^microservices-with/i,
  /^tickety-ms/i,
  /^nameko-devex/i,
  /^sveltekit-pokedex/i,
  /githubgraduation/i,
  /^alpha-blog/i,
  /^boilerplates$/i,
  /^algorithms$/i,
  /^dotfiles$/i,
  /^machine-backup$/i,
  /^lucasmsa$/i,
  /^lucasmsa\.com$/i,
  /^trilha-agentica$/i,
  /\.github\.io$/i,
  /^lista/i,
  /-lp\d/i,
  /^lp\d$/i,
  /^cl\d$/i,
  /^bd$/i,
  /^cvrp/i,
  /^computer-architecture$/i,
  /^projeto-/i,
  /^simple-crud-application$/i,
  /^book-finder-app$/i,
  /^musify$/i,
  /mostrando-pra-gabriel/i,
];

function isNoise(repo: GitHubRepo) {
  if (ALWAYS_SHOW.has(repo.name)) return false;
  if (EXCLUDED.some((pattern) => pattern.test(repo.name))) return true;
  if (repo.name.length <= 3) return true;
  if (Date.parse(repo.pushed_at) < ACTIVE_SINCE) return true;
  return NOISE_DESCRIPTIONS.some((pattern) =>
    pattern.test(repo.description ?? ""),
  );
}

export async function fetchRepos(): Promise<Repo[]> {
  const response = await fetch(ENDPOINT, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 86400 },
  });

  if (!response.ok) return [];

  const repos: GitHubRepo[] = await response.json();

  return repos
    .filter(
      (repo) =>
        !repo.fork && !repo.archived && repo.description && !isNoise(repo),
    )
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      url: repo.html_url,
      site: repo.homepage?.trim() || null,
      pushedAt: repo.pushed_at,
    }));
}
