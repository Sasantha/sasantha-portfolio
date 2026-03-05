import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import type { ProjectRecord } from "@/lib/types/project";
import { listProjects } from "@/lib/project-repo";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of full-stack and frontend projects by Sasantha.",
};

async function getProjects() {
  const { data, error } = await listProjects("public");
  if (error) {
    return [] as ProjectRecord[];
  }
  return data;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section aria-labelledby="projects-page-heading" className="space-y-8">
      <header className="space-y-3">
        <h1 id="projects-page-heading" className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Projects
        </h1>
        <p className="max-w-3xl text-slate-600">
          Selected work across SaaS dashboards, business workflow systems, and
          performance-focused web applications.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {projects.length === 0 ? (
        <p className="text-sm text-slate-600">No projects found.</p>
      ) : null}
    </section>
  );
}
