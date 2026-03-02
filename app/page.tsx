import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { featuredProjects } from "@/content/projects";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Portfolio home for Sasantha Perera, full-stack developer building scalable web applications.",
};

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section
        aria-labelledby="hero-heading"
        className="grid gap-8 py-8 md:grid-cols-[1.2fr_0.8fr] md:items-center"
      >
        <div className="space-y-5">
          <p className="inline-flex w-fit border border-slate-300 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
            {profile.title}
          </p>
          <h1
            id="hero-heading"
            className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            Building practical web products that scale and stay maintainable.
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">{profile.summary}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
            >
              Contact Me
            </Link>
          </div>
        </div>
        <aside className="border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Snapshot</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>
              <span className="font-semibold text-slate-800">Location:</span>{" "}
              {profile.location}
            </li>
            <li>
              <span className="font-semibold text-slate-800">Email:</span>{" "}
              <a
                className="underline underline-offset-4"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>
            </li>
            <li>
              <span className="font-semibold text-slate-800">Core Stack:</span>{" "}
              TypeScript, Next.js, Node.js
            </li>
          </ul>
        </aside>
      </section>

      <section
        id="about"
        aria-labelledby="about-heading"
        className="space-y-4 scroll-mt-24"
      >
        <h2 id="about-heading" className="text-2xl font-semibold text-slate-900">
          About
        </h2>
        <p className="max-w-3xl text-slate-600">{profile.intro}</p>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="space-y-6 scroll-mt-24"
      >
        <div className="flex items-end justify-between gap-4">
          <h2
            id="projects-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-sm font-semibold text-slate-700 underline underline-offset-4"
          >
            See all projects
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="scroll-mt-24 border border-slate-200 bg-white p-8 text-center shadow-sm"
      >
        <h2 id="contact-heading" className="text-2xl font-semibold text-slate-900">
          Let&apos;s build something useful.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Open to collaborating on product engineering, platform architecture,
          and performance-focused frontend work.
        </p>
        <div className="mt-6">
          <Link
            href="/contact"
            className="border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
