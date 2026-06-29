import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enquiry Received – Thank You",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  const schedulerUrl = process.env.NEXT_PUBLIC_SCHEDULER_URL;

  return (
    <div className="space-y-10">
      <section aria-labelledby="ty-heading" className="space-y-4">
        <h1 id="ty-heading" className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Message received.
        </h1>
        <p className="max-w-xl text-base text-slate-600">
          Thanks for reaching out. I&apos;ll review your enquiry and reply within one business
          day. In the meantime, feel free to book a discovery call below — no obligation,
          just 30 minutes to talk through your project.
        </p>
      </section>

      {schedulerUrl ? (
        <section aria-label="Schedule a call" className="border border-slate-200 bg-white shadow-sm overflow-hidden">
          <iframe
            src={schedulerUrl}
            title="Book a discovery call"
            width="100%"
            height="700"
            className="block border-0"
          />
        </section>
      ) : null}

      <nav aria-label="Return navigation">
        <Link
          href="/"
          className="inline-flex border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
        >
          ← Back to portfolio
        </Link>
      </nav>
    </div>
  );
}