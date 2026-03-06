import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// ─── Config ───────────────────────────────────────────────────────────────────

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.CONTACT_TO_EMAIL!;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL!;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// ─── Rate limiting (in-memory, per IP) ───────────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  return false;
}

// ─── Validation ───────────────────────────────────────────────────────────────

interface ContactBody {
  name: string;
  email: string;
  message: string;
  company?: string;
  formStartedAt?: number;
}

function validate(body: unknown): body is ContactBody {
  if (!body || typeof body !== "object") return false;

  const { name, email, message, company, formStartedAt } = body as Record<string, unknown>;

  if (typeof company === "string" && company.trim().length > 0) return false;

  if (typeof formStartedAt !== "number") return false;
  const elapsedMs = Date.now() - formStartedAt;
  if (elapsedMs < 2500 || elapsedMs > 1000 * 60 * 60) return false;

  if (typeof name !== "string" || name.trim().length < 2) return false;
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
  if (typeof message !== "string" || message.trim().length < 10) return false;

  return true;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = typeof forwardedFor === "string"
    ? forwardedFor.split(",")[0]?.trim() || "unknown"
    : "unknown";

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests. Please wait a moment." });
  }

  if (!validate(req.body)) {
    return res.status(422).json({ error: "Invalid form data." });
  }

  const { name, email, message } = req.body;
  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #171717;">
        <h2 style="font-size: 18px; margin-bottom: 16px;">New contact message</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #737373; width: 80px;">Name</td>
            <td style="padding: 8px 0;">${escapedName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #737373;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${escapedEmail}" style="color: #171717;">${escapedEmail}</a></td>
          </tr>
        </table>
        <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
          ${escapedMessage}
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #a3a3a3;">Sent via contact form</p>
      </div>
    `,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return res.status(500).json({ error: "Failed to send message." });
  }

  return res.status(200).json({ success: true });
}
