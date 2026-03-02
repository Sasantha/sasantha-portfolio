import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sasantha for full-stack development collaborations.",
};

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-page-heading" className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <h1 id="contact-page-heading" className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Contact
        </h1>
        <p className="text-slate-600">
          I am available for full-stack product development, frontend
          architecture, and API-focused backend work.
        </p>
        <div className="space-y-2 text-sm text-slate-600">
          <p>
            <span className="font-semibold text-slate-800">Email:</span>{" "}
            <a className="underline underline-offset-4" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </p>
          <p>
            <span className="font-semibold text-slate-800">Location:</span>{" "}
            {profile.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
          >
            GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
          >
            LinkedIn
          </a>
          <a
            href={profile.socials.x}
            target="_blank"
            rel="noreferrer"
            className="border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
          >
            X
          </a>
          <a
            href={profile.socials.facebook}
            target="_blank"
            rel="noreferrer"
            className="border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
          >
            Facebook
          </a>
          <a
            href={profile.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
          >
            Instagram
          </a>
          <a
            href={profile.socials.fiverr}
            target="_blank"
            rel="noreferrer"
            className="border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
          >
            Fiverr
          </a>
          <a
            href={profile.socials.upwork}
            target="_blank"
            rel="noreferrer"
            className="border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
          >
            Upwork
          </a>
          <a
            href={profile.socials.freelancer}
            target="_blank"
            rel="noreferrer"
            className="border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
          >
            Freelancer
          </a>
          <a
            href={profile.socials.takemelk}
            target="_blank"
            rel="noreferrer"
            className="border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
          >
            takeme.lk
          </a>
        </div>
      </div>

      <form
        aria-label="Contact form"
        className="space-y-4 border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
            placeholder="Tell me about your project..."
          />
        </div>
        <a
          className="inline-flex border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          href={`mailto:${profile.email}?subject=Portfolio%20Inquiry`}
        >
          Send via Email
        </a>
      </form>
    </section>
  );
}
