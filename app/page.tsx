import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { profile } from "@/content/profile";
import { targetKeywords } from "@/content/seo";
import type { ProjectRecord } from "@/lib/types/project";
import { listProjects } from "@/lib/project-repo";

export const metadata: Metadata = {
  title: "Web Developer for Hire in Sri Lanka",
  description:
    "Web developer for hire in Sri Lanka offering modern website design, frontend and backend development, ecommerce website development, and full-stack product delivery.",
  keywords: targetKeywords,
  alternates: {
    canonical: "https://spperera.me",
  },
};
export const dynamic = "force-dynamic";

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
    url: "https://spperera.me",
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
            Web Developer for Hire in Sri Lanka
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            Sasantha Perera is a freelance web developer and full stack
            developer for hire building modern websites, ecommerce platforms,
            and custom business systems with Next.js, React, Node.js, and
            ASP.NET.
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

      <section aria-labelledby="hire-heading" className="space-y-3">
        <h2 id="hire-heading" className="text-2xl font-semibold text-slate-900">
          Full Stack Developer for Hire
        </h2>
        <p className="max-w-3xl text-slate-600">
          If you are looking for a web developer for hire, a front end
          developer, a back end developer, or one partner who can handle front
          end and back end delivery together, I help Sri Lankan and
          international businesses launch polished digital products quickly.
        </p>
      </section>

      <section aria-labelledby="nextjs-react-heading" className="space-y-3">
        <h2 id="nextjs-react-heading" className="text-2xl font-semibold text-slate-900">
          Front End Developer and Web UI Delivery
        </h2>
        <p className="max-w-3xl text-slate-600">
          I build fast, SEO-friendly, and maintainable interfaces with Next.js,
          React, and TypeScript. That includes landing pages, responsive web
          design, dashboard interfaces, and modern web UI systems that work
          across mobile and desktop.
        </p>
      </section>

      <section aria-labelledby="aspnet-backend-heading" className="space-y-3">
        <h2 id="aspnet-backend-heading" className="text-2xl font-semibold text-slate-900">
          Back End Developer for APIs and Business Logic
        </h2>
        <p className="max-w-3xl text-slate-600">
          I develop dependable backend services, authentication flows, and data
          models using ASP.NET, C#, Node.js, and SQL-backed infrastructure for
          teams that need a reliable back end developer and clean full-stack
          architecture.
        </p>
      </section>

      <section aria-labelledby="corporate-web-heading" className="space-y-3">
        <h2 id="corporate-web-heading" className="text-2xl font-semibold text-slate-900">
          Website Design and Web Development in Sri Lanka
        </h2>
        <p className="max-w-3xl text-slate-600">
          I create modern website design systems for companies that need website
          design in Sri Lanka, web design in Sri Lanka, or a professional
          website designer instead of a traditional web design company. The
          focus is always performance, accessibility, clear messaging, and
          mobile-first execution.
        </p>
      </section>

      <section aria-labelledby="ecommerce-heading" className="space-y-3">
        <h2 id="ecommerce-heading" className="text-2xl font-semibold text-slate-900">
          Ecommerce Website Development
        </h2>
        <p className="max-w-3xl text-slate-600">
          I design and build ecommerce website development projects with product
          catalogs, conversion-focused pages, secure checkout flows, and custom
          integrations for brands that need a modern website builder experience
          without template-heavy compromises.
        </p>
      </section>

      <section aria-labelledby="search-intent-heading" className="space-y-3">
        <h2 id="search-intent-heading" className="text-2xl font-semibold text-slate-900">
          Professional Web Designer for Local and Remote Clients
        </h2>
        <p className="max-w-3xl text-slate-600">
          Businesses often search for phrases like website developer near me,
          web developer near me, website designer near me, professional web
          designer near me, or ecommerce website designer near me. I work from
          Sri Lanka and collaborate remotely, so clients can hire me for web
          dev, website dev, and freelance website developer work from anywhere.
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
        <p className="max-w-3xl text-slate-600">
          {profile.intro} I focus on modern website delivery, responsive web
          design, and scalable full-stack product work for businesses that want
          a clean online presence and measurable results.
        </p>
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
          Open to collaborating on website design, web development, ecommerce
          website development, and full-stack product engineering for clients in
          Sri Lanka and beyond.
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
