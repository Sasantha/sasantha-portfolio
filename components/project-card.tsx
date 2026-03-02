import Link from "next/link";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col justify-between border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-900">
          <Link href={`/projects/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>
        <p className="text-sm text-slate-600">{project.summary}</p>
        <p className="text-sm font-medium text-slate-700">
          Stack: {project.stack.join(", ")}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4 text-sm font-medium">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900"
        >
          Live
        </a>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900"
        >
          Repo
        </a>
      </div>
    </article>
  );
}
