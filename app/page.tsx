import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { profile } from "@/content/profile";
import type { ProjectRecord } from "@/lib/types/project";
import { listProjects } from "@/lib/project-repo";

export const metadata: Metadata = {
  description:
    "Full-stack web developer in Sri Lanka specializing in Next.js, React, ASP.NET, and modern business systems. View my portfolio and completed projects.",
};

async function getHomeProjects() {
  const { data, error } = await listProjects("public");
  if (error) {
    return [] as ProjectRecord[];
  }
  return data.slice(0, 6);
}

export default async function HomePage() {
  const homeProjects = await getHomeProjects();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Full Stack Web Developer",
    url: "https://sasantha-portfolio.vercel.app",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Piliyandala",
      addressCountry: "Sri Lanka",
    },
    sameAs: [profile.socials.github, profile.socials.linkedin],
  };

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <section
        aria-labelledby="hero-heading"
        className="grid gap-8 py-8 md:grid-cols-[1.2fr_0.8fr] md:items-center"
      >
        <div className="space-y-5">
          <p className="inline-flex w-fit border border-slate-300 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
            {profile.title}
          </p>
          <p className="text-sm font-semibold tracking-wide text-slate-700">
            Sasantha Perera
          </p>
          <h1
            id="hero-heading"
            className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            Full-Stack Web Developer in Sri Lanka - Sasantha Perera
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            Building modern business websites, SaaS platforms, and API systems
            using Next.js, React, Node.js and ASP.NET.
          </p>
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

      <section aria-labelledby="nextjs-react-heading" className="space-y-3">
        <h2 id="nextjs-react-heading" className="text-2xl font-semibold text-slate-900">
          Next.js & React Development
        </h2>
        <p className="max-w-3xl text-slate-600">
          I build fast, SEO-friendly and maintainable frontend applications with
          Next.js, React, and TypeScript for product teams and growing
          businesses.
        </p>
      </section>

      <section aria-labelledby="aspnet-backend-heading" className="space-y-3">
        <h2 id="aspnet-backend-heading" className="text-2xl font-semibold text-slate-900">
          ASP.NET & Backend Systems
        </h2>
        <p className="max-w-3xl text-slate-600">
          I develop dependable backend services, authentication flows, and data
          models using ASP.NET, C#, and SQL-backed infrastructure.
        </p>
      </section>

      <section aria-labelledby="corporate-web-heading" className="space-y-3">
        <h2 id="corporate-web-heading" className="text-2xl font-semibold text-slate-900">
          Corporate Website Development
        </h2>
        <p className="max-w-3xl text-slate-600">
          I create conversion-focused corporate websites that prioritize
          performance, accessibility, and clear content architecture.
        </p>
      </section>

      <section aria-labelledby="api-business-heading" className="space-y-3">
        <h2 id="api-business-heading" className="text-2xl font-semibold text-slate-900">
          API & Business System Development
        </h2>
        <p className="max-w-3xl text-slate-600">
          I design and implement APIs and internal business systems that connect
          teams, automate workflows, and support long-term scaling.
        </p>
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
            Projects
          </h2>
          <Link
            href="/projects"
            className="text-sm font-semibold text-slate-700 underline underline-offset-4"
          >
            See all projects
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {homeProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        {homeProjects.length === 0 ? (
          <p className="text-sm text-slate-600">No projects found.</p>
        ) : null}
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
