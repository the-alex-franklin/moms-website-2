// netlify/functions/contact.js
import nodemailer from "nodemailer";

const json = (code: number, obj: any) => ({ statusCode: code, body: JSON.stringify(obj) });

export async function handler(event) {
  if (event.httpMethod !== "POST") return json(405, { error: "Method Not Allowed" });

  try {
    const data = JSON.parse(event.body || "{}");
    const {
      name = "",
      email = "",
      message = "",
      website = "", // honeypot
      ts = 0, // optional time gate: ms since epoch from the client
    } = data;

    // 1) Honeypot
    if (website) return json(200, { ok: true });

    // 2) Minimal validation
    if (!name || !message) return json(400, { error: "Missing fields" });

    // 3) Basic time gate (reject instant bot submits if client included ts)
    if (Number(ts) > 0 && Date.now() - Number(ts) < 2000) {
      return json(200, { ok: true });
    }

    // 4) Create transporter for Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // smtp.gmail.com
      port: Number(process.env.SMTP_PORT) || 465, // 465 SSL or 587 STARTTLS
      secure: (process.env.SMTP_SECURE ?? "true") === "true",
      auth: {
        user: process.env.SMTP_USER, // elizabethf@gmail.com
        pass: process.env.SMTP_PASS, // 16-char App Password
      },
    });

    // 5) Send. From must match SMTP_USER.
    await transporter.sendMail({
      from: `"Mom’s Website" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || process.env.SMTP_USER,
      subject: "New contact form submission",
      text: `Name: ${name}\n` + (email ? `Email: ${email}\n` : "") + `\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        ${email ? `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return json(200, { ok: true });
  } catch (err) {
    // Do not leak details to client
    return json(500, { error: "Email send failed" });
  }
}

// Tiny HTML escape to avoid HTML injection in the email body
function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c]),
  );
}
