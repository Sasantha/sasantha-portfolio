import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Start a Project – Web Development Services",
  description:
    "Hire Sasantha Perera for business websites, SaaS platforms, and API development. Fill in the form and get a response within one business day.",
  keywords: [
    "hire web developer Sri Lanka",
    "freelance full stack developer",
    "saas mvp development",
    "business website development",
    "api development services",
  ],
  alternates: {
    canonical: "https://spperera.me/start-project",
  },
};

const PACKAGES = [
  {
    name: "Business Website",
    range: "$149 – $2,000",
    description:
      "A fast, SEO-ready website for your business — from landing pages to multi-page sites with CMS, contact forms, and analytics.",
    features: [
      "Responsive design (mobile-first)",
      "SEO-optimised structure",
      "Contact or lead capture form",
      "CMS integration (optional)",
      "Deployed to production",
    ],
  },
  {
    name: "SaaS Platform",
    range: "$3,000 – $10,000",
    description:
      "A full-stack web application with auth, payments, dashboards, and API — built to scale from MVP to production without a rewrite.",
    features: [
      "User auth & role management",
      "Payment integration (Stripe)",
      "Admin dashboard",
      "REST or GraphQL API",
      "CI/CD pipeline",
    ],
  },
  {
    name: "API Development",
    range: "$500 – $5,000",
    description:
      "Backend APIs and integrations — from internal microservices to third-party webhook handlers and data pipelines.",
    features: [
      "REST or GraphQL endpoints",
      "Third-party integrations",
      "Authentication & rate limiting",
      "API documentation",
      "Cloud deployment",
    ],
  },
] as const;

const FAQ = [
  {
    q: "How long does a project take?",
    a: "Business websites typically ship in 2–3 weeks. SaaS platforms and APIs run 4–8 weeks depending on scope. I give you a precise timeline before work begins.",
  },
  {
    q: "What do I need to get started?",
    a: "A description of what you want to build, who it's for, and a rough budget. Everything else we work out together in the first call.",
  },
  {
    q: "Do you work with clients outside Sri Lanka?",
    a: "Yes — most of my clients are international. I work async-first across time zones with regular written updates.",
  },
  {
    q: "What happens after I submit the form?",
    a: "I reply within one business day. If there's a fit, we book a 30-minute call to scope the work and agree on a proposal before anything starts.",
  },
  {
    q: "Can I hire you on an hourly basis?",
    a: "For defined projects I prefer fixed-price quotes so you know the cost upfront. For ongoing or advisory work, hourly rates start at $40/hr.",
  },
] as const;

export default function StartProjectPage() {
  return (
    <div className="space-y-14 sm:space-y-20">
      {/* Hero */}
      <section aria-labelledby="sp-hero-heading" className="space-y-4 py-4">
        <p className="inline-flex w-fit border border-slate-300 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
          Available for new projects
        </p>
        <h1
          id="sp-hero-heading"
          className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
        >
          Let&apos;s build your next project together.
        </h1>
        <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
          Fill in the form below and I&apos;ll respond within one business day.
          No retainers, no agencies — direct hire, fixed price, shipped on time.
        </p>
      </section>

      {/* Service packages */}
      <section aria-labelledby="packages-heading" className="space-y-6">
        <h2 id="packages-heading" className="text-2xl font-semibold text-slate-900">
          What I build
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="border border-slate-200 bg-white p-5 shadow-sm space-y-3"
            >
              <div>
                <h3 className="text-base font-semibold text-slate-900">{pkg.name}</h3>
                <p className="text-sm font-semibold text-slate-500">{pkg.range}</p>
              </div>
              <p className="text-sm text-slate-600">{pkg.description}</p>
              <ul className="space-y-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-0.5 shrink-0 text-slate-400">—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Lead form */}
      <section
        id="enquiry-form"
        aria-labelledby="form-heading"
        className="border border-slate-200 bg-white p-5 shadow-sm sm:p-8 scroll-mt-24"
      >
        <div className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <h2 id="form-heading" className="text-2xl font-semibold text-slate-900">
              Tell me about your project
            </h2>
            <p className="text-sm text-slate-600">
              Fields marked <span className="text-red-500">*</span> are required.
              I reply within one business day.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="space-y-6">
        <h2 id="faq-heading" className="text-2xl font-semibold text-slate-900">
          Frequently asked questions
        </h2>
        <dl className="space-y-5">
          {FAQ.map((item) => (
            <div key={item.q} className="border-b border-slate-200 pb-5 last:border-0">
              <dt className="text-sm font-semibold text-slate-900">{item.q}</dt>
              <dd className="mt-1 text-sm text-slate-600">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Testimonials placeholder */}
      <section aria-labelledby="testimonials-heading" className="space-y-4">
        <h2 id="testimonials-heading" className="text-2xl font-semibold text-slate-900">
          What clients say
        </h2>
        <p className="text-sm text-slate-500 border border-dashed border-slate-300 p-6 text-center">
          Client testimonials coming soon.
        </p>
      </section>
    </div>
  );
}