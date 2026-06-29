import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(1),
  honeypot: z.string().optional(),
  turnstileToken: z.string().min(1),
});

// EN DASH U+2013 — must be byte-identical to Zoho picklist strings
const BUDGET_MAP: Record<string, string> = {
  "500-1000": "$500 – $1,000",
  "1000-3000": "$1,000 – $3,000",
  "3000-10000": "$3,000 – $10,000",
  "10000+": "$10,000+",
  discuss: "Prefer to discuss",
};

async function verifyTurnstile(token: string): Promise<boolean> {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
    }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: unknown = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }

    const { name, email, company, budget, message, honeypot, turnstileToken } = parsed.data;

    // Silent reject bots that fill the honeypot
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const turnstileOk = await verifyTurnstile(turnstileToken);
    if (!turnstileOk) {
      return NextResponse.json(
        { ok: false, error: "Security check failed. Please try again." },
        { status: 400 },
      );
    }

    const resolvedBudget =
      budget && BUDGET_MAP[budget] !== undefined ? BUDGET_MAP[budget] : null;

    // Zoho Leads requires Company; empty routes to manual-approval queue
    const companyValue =
      company && company.trim().length > 0
        ? company.trim()
        : name.trim() || "Not specified";

    const description = resolvedBudget
      ? `Budget: ${resolvedBudget}\n———\n${message}`
      : message;

    // ── Zoho Web-to-Lead POST ──────────────────────────────────────────────
    const zohoParams = new URLSearchParams({
      xnQsjsdp: process.env.ZOHO_XNQSJSDP ?? "",
      xmIwtLD: process.env.ZOHO_XMIWTLD ?? "",
      actionType: process.env.ZOHO_ACTIONTYPE ?? "",
      returnURL: process.env.ZOHO_RETURNURL ?? "",
      "Last Name": name,
      Email: email,
      Company: companyValue,
      Description: description,
    });

    if (resolvedBudget !== null) {
      zohoParams.set(process.env.ZOHO_FIELD_BUDGET ?? "Salutation", resolvedBudget);
    }

    let zohoError: string | null = null;
    try {
      await fetch(process.env.ZOHO_WEBTOLEAD_ACTION_URL ?? "", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: process.env.ZOHO_FORM_LOCATION_URL ?? "",
        },
        body: zohoParams.toString(),
        redirect: "manual",
      });
    } catch (err) {
      zohoError = err instanceof Error ? err.message : String(err);
      console.error("[/api/lead] Zoho POST failed:", zohoError);
    }

    // ── Fallback email — ALWAYS sent regardless of Zoho result ────────────
    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST ?? "smtp.zoho.com",
      port: Number(process.env.ZOHO_SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.ZOHO_SMTP_USER ?? "",
        pass: process.env.ZOHO_SMTP_PASS ?? "",
      },
    });

    const lines = [
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Company: ${company && company.trim() ? company.trim() : "(not provided)"}`,
      `Budget:  ${resolvedBudget ?? "(not provided)"}`,
      ``,
      `Message:`,
      message,
    ];
    if (zohoError) {
      lines.push(``, `[Warning: Zoho POST failed — ${zohoError}]`);
    }

    await transporter.sendMail({
      from: process.env.ZOHO_SMTP_USER ?? "",
      to: process.env.LEAD_NOTIFY_EMAIL ?? "",
      subject: `New lead: ${name} <${email}>`,
      text: lines.join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/lead]", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again later." },
      { status: 500 },
    );
  }
}