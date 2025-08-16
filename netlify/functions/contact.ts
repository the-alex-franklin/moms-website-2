import type { Handler } from "@netlify/functions";

// Optional: quick naive email check
const isEmail = (s: string) => /\S+@\S+\.\S+/.test(s);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const body = JSON.parse(event.body || "{}");
  const { name, email, phone = "", message, company } = body;

  // Honeypot: if bots fill the hidden 'company' field, pretend success
  if (company) return ok();

  if (!name || !email || !message || !isEmail(email)) {
    return json(400, { error: "Missing or invalid fields" });
  }

  // Send via Resend (uses server-side env vars)
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM, // e.g. "Website <noreply@yourdomain.com>"
      to: [process.env.CONTACT_TO!], // your inbox
      reply_to: email,
      subject: `New contact from ${name}`,
      text: `Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`,
    }),
  });

  if (!resp.ok) {
    const detail = await resp.text();

    return json(500, { error: "Email send failed", detail });
  }

  return ok();
};

// helpers
const ok = () => json(200, { ok: true });
const json = (statusCode: number, data: unknown) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
