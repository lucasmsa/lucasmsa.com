export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  pushedAt: string;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

const ENDPOINT =
  "https://api.github.com/users/lucasmsa/repos?per_page=100&sort=pushed";

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
  /^simple-crud-application$/i,
  /^book-finder-app$/i,
  /^musify$/i,
  /mostrando-pra-gabriel/i,
];

function isNoise(name: string) {
  return EXCLUDED.some((pattern) => pattern.test(name));
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
        !repo.fork && !repo.archived && repo.description && !isNoise(repo.name),
    )
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      url: repo.html_url,
      pushedAt: repo.pushed_at,
    }));
}
