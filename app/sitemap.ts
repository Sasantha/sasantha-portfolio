import type { MetadataRoute } from "next";
import { listProjects } from "@/lib/project-repo";
import type { ProjectRecord } from "@/lib/types/project";

const siteUrl = "https://spperera.me";
const staticPageLastModified = new Date("2026-03-16T00:00:00.000Z");
export const dynamic = "force-dynamic";

async function getProjects() {
  const { data, error } = await listProjects("public");
  if (error) {
    return [] as ProjectRecord[];
  }
  return data;
}

function getValidDate(value: string | null | undefined, fallback: Date) {
  if (!value) return fallback;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const latestProjectUpdate =
    projects.length > 0
      ? projects.reduce((latest, project) => {
          const projectUpdatedAt = getValidDate(project.updatedAt, latest);
          return projectUpdatedAt > latest ? projectUpdatedAt : latest;
        }, staticPageLastModified)
      : staticPageLastModified;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: latestProjectUpdate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: latestProjectUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: staticPageLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: getValidDate(project.updatedAt, staticPageLastModified),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
