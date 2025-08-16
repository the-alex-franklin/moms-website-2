import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v ?? ""))
    .join("&");
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd) as Record<string, string>;

    // Honeypot: if bots fill this, silently succeed
    if (data.company) {
      setStatus("success");
      form.reset();

      return;
    }

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact", // must match the hidden blueprint form's name
          ...data,
        }),
      });

      if (!res.ok) throw new Error(`Netlify Forms error: ${res.status}`);
      setStatus("success");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="max-w-4xl mx-auto px-4 my-16">
      <header className="mb-6">
        <h2 className="text-2xl font-bold">Get in touch</h2>
        <p className="text-gray-600">
          Have a question or want to book? Send a message below.
        </p>
      </header>

      {status === "success" ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg bg-green-50 text-green-900 p-4"
        >
          <p className="font-medium">Thanks! Your message has been sent.</p>
          <p className="text-sm opacity-80">We’ll get back to you shortly.</p>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          name="contact"
          data-netlify="true"
          netlify-honeypot="company"
          className="grid gap-4"
        >
          {/* Honeypot (hidden field bots will fill) */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <label className="grid gap-1">
              <span className="text-sm font-medium">Name</span>
              <input
                name="name"
                required
                className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:(ring-2 ring-gray-400 border-gray-400)"
                placeholder="Your name"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium">Email</span>
              <input
                name="email"
                type="email"
                required
                className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:(ring-2 ring-gray-400 border-gray-400)"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Phone (optional)</span>
            <input
              name="phone"
              className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:(ring-2 ring-gray-400 border-gray-400)"
              placeholder="(555) 555-5555"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Message</span>
            <textarea
              name="message"
              required
              rows={5}
              className="rounded-lg border border-gray-300 px-3 py-2 resize-y outline-none focus:(ring-2 ring-gray-400 border-gray-400)"
              placeholder="Tell us a bit about what you need…"
            />
          </label>

          {status === "error" && (
            <p className="text-red-600 text-sm" role="alert">
              {error}
            </p>
          )}

          <div className="mt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 text-white px-5 py-2.5 hover:bg-gray-800 disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send message"}
            </button>
          </div>

          <p className="text-xs text-gray-500">
            We’ll never share your information. By submitting, you consent to be
            contacted about your inquiry.
          </p>
        </form>
      )}
    </section>
  );
}
