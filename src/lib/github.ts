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

export async function fetchRepos(): Promise<Repo[]> {
  const response = await fetch(ENDPOINT, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: 86400 },
  });

  if (!response.ok) return [];

  const repos: GitHubRepo[] = await response.json();

  return repos
    .filter((repo) => !repo.fork && !repo.archived && repo.description)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      url: repo.html_url,
      pushedAt: repo.pushed_at,
    }));
}
