import Image from "next/image";
import Link from "next/link";
import type { ProjectView } from "@/lib/types/project";

type ProjectCardProps = {
  project: ProjectView;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const coverImage = project.coverImageUrl || "/placeholder.svg";

  return (
    <article className="flex h-full flex-col justify-between border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6">
      <div className="space-y-4">
        <div className="overflow-hidden border border-slate-200 bg-slate-100">
          <Image
            src={coverImage}
            alt={project.imageAlt ?? `${project.title} — ${project.category ?? "project"} screenshot`}
            width={800}
            height={420}
            className="h-44 w-full object-cover"
          />
        </div>
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
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900"
          >
            Live
          </a>
        ) : null}
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900"
          >
            Repo
          </a>
        ) : null}
      </div>
    </article>
  );
}
