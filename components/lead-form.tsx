"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { track } from "@vercel/analytics";

declare global {
  interface Window {
    onTurnstileSuccess?: (token: string) => void;
    onTurnstileExpired?: () => void;
    turnstile?: { reset: (id?: string) => void };
  }
}

const BUDGET_OPTIONS = [
  { label: "$500 – $1,000", value: "500-1000" },
  { label: "$1,000 – $3,000", value: "1000-3000" },
  { label: "$3,000 – $10,000", value: "3000-10000" },
  { label: "$10,000+", value: "10000+" },
  { label: "Prefer to discuss", value: "discuss" },
] as const;

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
  consent?: string;
  turnstile?: string;
};

function validateFields(fields: {
  name: string;
  email: string;
  message: string;
  consent: boolean;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!fields.name.trim()) errors.name = "Name is required.";
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!fields.message.trim()) errors.message = "Message is required.";
  if (!fields.consent) errors.consent = "Please agree to be contacted.";
  return errors;
}

const inputClass =
  "w-full border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none";
const labelClass = "mb-1 block text-sm font-medium text-slate-700";
const errorClass = "mt-1 text-xs text-red-600";

export function LeadForm() {
  const router = useRouter();
  const [turnstileToken, setTurnstileToken] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    window.onTurnstileSuccess = (token: string) => setTurnstileToken(token);
    window.onTurnstileExpired = () => setTurnstileToken("");
    return () => {
      delete window.onTurnstileSuccess;
      delete window.onTurnstileExpired;
    };
  }, []);

  function markTouched(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function resetTurnstile() {
    window.turnstile?.reset();
    setTurnstileToken("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const name = (fd.get("name") as string) ?? "";
    const email = (fd.get("email") as string) ?? "";
    const company = (fd.get("company") as string) ?? "";
    const budget = (fd.get("budget") as string) ?? "";
    const message = (fd.get("message") as string) ?? "";
    const honeypot = (fd.get("honeypot") as string) ?? "";
    const consent = fd.get("consent") === "on";

    setTouched({ name: true, email: true, message: true, consent: true });

    const fieldErrors = validateFields({ name, email, message, consent });
    const allErrors: FieldErrors = { ...fieldErrors };
    if (!turnstileToken) {
      allErrors.turnstile = "Please complete the security check.";
    }

    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) return;

    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, budget, message, honeypot, turnstileToken }),
      });

      const json = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setServerError(json.error ?? "Something went wrong. Please try again.");
        resetTurnstile();
        return;
      }

      track("lead_form_submitted");
      router.push("/start-project/thank-you");
    } catch {
      setServerError("Network error. Please try again.");
      resetTurnstile();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
        aria-label="Project enquiry form"
      >
        {/* Honeypot — hidden from users, visible to bots */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", opacity: 0 }}
        >
          <label htmlFor="honeypot">Leave this blank</label>
          <input
            id="honeypot"
            name="honeypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="lead-name" className={labelClass}>
            Name <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your full name"
            aria-required="true"
            aria-describedby={touched.name && errors.name ? "err-name" : undefined}
            onBlur={() => markTouched("name")}
          />
          {touched.name && errors.name && (
            <p id="err-name" className={errorClass} role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="lead-email" className={labelClass}>
            Email <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@example.com"
            aria-required="true"
            aria-describedby={touched.email && errors.email ? "err-email" : undefined}
            onBlur={() => markTouched("email")}
          />
          {touched.email && errors.email && (
            <p id="err-email" className={errorClass} role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Company — optional */}
        <div>
          <label htmlFor="lead-company" className={labelClass}>
            Company{" "}
            <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="lead-company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClass}
            placeholder="Your company or project name"
          />
        </div>

        {/* Budget — optional */}
        <div>
          <label htmlFor="lead-budget" className={labelClass}>
            Budget{" "}
            <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <select
            id="lead-budget"
            name="budget"
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>
              Select budget (optional)
            </option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="lead-message" className={labelClass}>
            Message <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <textarea
            id="lead-message"
            name="message"
            rows={5}
            required
            className={inputClass}
            placeholder="Describe your project: what you need, who it&#39;s for, and any timeline or constraints."
            aria-required="true"
            aria-describedby={touched.message && errors.message ? "err-message" : undefined}
            onBlur={() => markTouched("message")}
          />
          {touched.message && errors.message && (
            <p id="err-message" className={errorClass} role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {/* Turnstile */}
        <div>
          {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
            <div
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              data-callback="onTurnstileSuccess"
              data-expired-callback="onTurnstileExpired"
            />
          ) : (
            <p className="border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              Security widget not configured —{" "}
              <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> is missing from your
              environment. Set it in <code>.env.local</code> and restart the dev
              server.
            </p>
          )}
          {errors.turnstile && (
            <p className={errorClass} role="alert">
              {errors.turnstile}
            </p>
          )}
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <input
            id="lead-consent"
            name="consent"
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 border border-slate-300 accent-slate-900"
            aria-required="true"
            aria-describedby={touched.consent && errors.consent ? "err-consent" : undefined}
            onBlur={() => markTouched("consent")}
          />
          <div>
            <label htmlFor="lead-consent" className="text-sm text-slate-600 cursor-pointer">
              I agree to be contacted about my enquiry.
            </label>
            {touched.consent && errors.consent && (
              <p id="err-consent" className={errorClass} role="alert">
                {errors.consent}
              </p>
            )}
          </div>
        </div>

        {serverError && (
          <p className="text-sm text-red-600" role="alert">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="border border-slate-900 bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Sending…" : "Send Enquiry"}
        </button>
      </form>
    </>
  );
}