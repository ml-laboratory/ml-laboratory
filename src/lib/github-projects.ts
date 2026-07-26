const GITHUB_API_BASE = "https://api.github.com";
const DEFAULT_OWNER = "Akicoders";
const DEFAULT_TOPIC = "ml-laboratory-project";
const LANDING_REPOSITORY = "ml-laboratory";
const MAX_REPOSITORIES = 20;
const MAX_README_LENGTH = 12_000;
const REQUEST_TIMEOUT_MS = 8_000;

export type GithubProject = {
  id: number;
  name: string;
  title: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  license: string | null;
  htmlUrl: string;
};

type GithubRepository = {
  id: number;
  name?: unknown;
  full_name?: unknown;
  description?: unknown;
  html_url?: unknown;
  language?: unknown;
  stargazers_count?: unknown;
  forks_count?: unknown;
  archived?: unknown;
  fork?: unknown;
  topics?: unknown;
  license?: { spdx_id?: unknown; name?: unknown } | null;
};

type GithubReadmeJson = {
  content?: unknown;
  encoding?: unknown;
};

function configuredValue(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed || fallback;
}

function configuredOwnerType(value: string | undefined): "user" | "org" {
  return value?.trim().toLowerCase() === "org" ? "org" : "user";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function asNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function getHeaders(): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function githubFetch(url: string, accept = "application/vnd.github+json"): Promise<Response | null> {
  try {
    return await fetch(url, {
      headers: { ...getHeaders(), Accept: accept },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    } as RequestInit & { next: { revalidate: number } });
  } catch {
    return null;
  }
}

/** Convert common Markdown into a compact, plain-text card excerpt. */
export function parseReadmeExcerpt(markdown: string, maxLength = 220): string {
  if (typeof markdown !== "string") return "";

  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/[\*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength - 1).trimEnd()}…` : text;
}

function decodeReadme(value: GithubReadmeJson): string {
  if (typeof value.content !== "string") return "";
  if (value.encoding === "base64") {
    try {
      return Buffer.from(value.content.replace(/\s/g, ""), "base64").toString("utf8");
    } catch {
      return "";
    }
  }
  return value.content;
}

async function fetchReadmeExcerpt(owner: string, repository: string): Promise<string> {
  const response = await githubFetch(
    `${GITHUB_API_BASE}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/readme`,
    "application/vnd.github.raw+json",
  );
  if (!response?.ok) return "";

  try {
    const contentType = response.headers.get("content-type") || "";
    const body = await response.text();
    const markdown = contentType.includes("json") ? decodeReadme(JSON.parse(body) as GithubReadmeJson) : body;
    return parseReadmeExcerpt(markdown.slice(0, MAX_README_LENGTH));
  } catch {
    return "";
  }
}

function isProjectRepository(repository: GithubRepository, owner: string, topic: string): boolean {
  const topics = Array.isArray(repository.topics)
    ? repository.topics.filter((item): item is string => typeof item === "string")
    : [];
  const fullName = asString(repository.full_name)?.toLowerCase();
  const ownerName = fullName?.split("/")[0];
  const name = asString(repository.name)?.toLowerCase();

  return (
    ownerName === owner.toLowerCase() &&
    name !== LANDING_REPOSITORY &&
    repository.fork !== true &&
    repository.archived !== true &&
    topics.some((item) => item.toLowerCase() === topic.toLowerCase())
  );
}

function mapRepository(repository: GithubRepository, excerpt: string): GithubProject | null {
  const name = asString(repository.name);
  const htmlUrl = asString(repository.html_url);
  if (!name || !htmlUrl || typeof repository.id !== "number") return null;

  const license = isRecord(repository.license)
    ? asString(repository.license.spdx_id) || asString(repository.license.name)
    : null;

  return {
    id: repository.id,
    name,
    title: name.replace(/[-_]+/g, " "),
    description: excerpt || asString(repository.description) || "Project documentation is not available yet.",
    language: asString(repository.language) || "Not specified",
    stars: asNumber(repository.stargazers_count),
    forks: asNumber(repository.forks_count),
    license,
    htmlUrl,
  };
}

/** Fetch and map public project repositories without allowing API failures to break the landing page. */
export async function getGithubProjects(): Promise<GithubProject[]> {
  const owner = configuredValue(process.env.GITHUB_PROJECT_OWNER, DEFAULT_OWNER);
  const topic = configuredValue(process.env.GITHUB_PROJECT_TOPIC, DEFAULT_TOPIC);
  const ownerType = configuredOwnerType(process.env.GITHUB_PROJECT_OWNER_TYPE);
  const response = await githubFetch(
    `${GITHUB_API_BASE}/${ownerType === "org" ? "orgs" : "users"}/${encodeURIComponent(owner)}/repos?type=all&sort=updated&per_page=100`,
  );
  if (!response?.ok) return [];

  try {
    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) return [];

    const repositories = payload
      .filter((item): item is GithubRepository => isRecord(item) && isProjectRepository(item as GithubRepository, owner, topic))
      .slice(0, MAX_REPOSITORIES);

    const projects = await Promise.all(
      repositories.map(async (repository) => {
        const excerpt = await fetchReadmeExcerpt(owner, asString(repository.name) || "");
        return mapRepository(repository, excerpt);
      }),
    );
    return projects.filter((project): project is GithubProject => project !== null);
  } catch {
    return [];
  }
}
