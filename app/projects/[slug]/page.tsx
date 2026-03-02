import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/projects";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url: `https://sasantha-portfolio.vercel.app/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <p className="text-sm font-semibold tracking-wide text-slate-600">
          Project Detail
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          {project.title}
        </h1>
        <p className="max-w-3xl text-slate-600">{project.description}</p>
        <p className="text-sm font-medium text-slate-700">
          Stack: {project.stack.join(", ")}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <section aria-labelledby="highlights-heading" className="space-y-4">
        <h2 id="highlights-heading" className="text-xl font-semibold text-slate-900">
          Key Highlights
        </h2>
        <ul className="space-y-2 text-slate-600">
          {project.highlights.map((item) => (
            <li key={item} className="border-l-2 border-slate-300 pl-4">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Project links" className="flex flex-wrap gap-3">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          View Live
        </a>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
        >
          View Repository
        </a>
        <Link
          href="/projects"
          className="border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
        >
          Back to Projects
        </Link>
      </section>
    </article>
  );
}
