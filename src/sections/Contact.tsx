import { useCallback, useMemo, useState } from "react";

type SendState = { kind: "idle" } | { kind: "loading" } | { kind: "success" } | { kind: "error"; message: string };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export function Contact() {
  const [state, setState] = useState<SendState>({ kind: "idle" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot
  });

  const isValid = useMemo(() => {
    if (!form.name.trim()) return false;
    if (!emailRegex.test(form.email.trim())) return false;
    if (form.message.trim().length < 5) return false;
    if (form.website.trim().length > 0) return false; // honeypot
    return true;
  }, [form]);

  const onChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((s) => (s.kind === "error" ? { kind: "idle" } : s));
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isValid) {
        setState({
          kind: "error",
          message: "Please fill out all fields correctly.",
        });
        return;
      }
      if (form.website.trim()) {
        setState({ kind: "success" }); // bot trap
        return;
      }

      setState({ kind: "loading" });
      try {
        const data = new FormData();
        data.append("form-name", "contact");
        data.append("name", form.name.trim());
        data.append("email", form.email.trim());
        data.append("message", form.message.trim());

        await fetch("/", {
          method: "POST",
          body: new URLSearchParams(data as any).toString(),
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        setState({ kind: "success" });
        setForm({ name: "", email: "", message: "", website: "" });
      } catch (err: any) {
        setState({
          kind: "error",
          message: err?.message || "Something went wrong. Please try again.",
        });
      }
    },
    [form, isValid],
  );

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-2 text-neutral-600">
        Have a question or want to book a session? Send a message and we’ll get back to you.
      </p>

      <form
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="website"
        onSubmit={handleSubmit}
        className="mt-8 space-y-4"
        noValidate
      >
        <input type="hidden" name="form-name" value="contact" />

        {/* Honeypot */}
        <div className="hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            value={form.website}
            onChange={onChange("website")}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="rounded-xl border px-3 py-2 outline-none focus:ring"
              value={form.name}
              onChange={onChange("name")}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="rounded-xl border px-3 py-2 outline-none focus:ring"
              value={form.email}
              onChange={onChange("email")}
              required
            />
            {!emailRegex.test(form.email) && form.email.length > 0 ? (
              <span className="mt-1 text-xs text-red-600">Enter a valid email</span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="mb-1 text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className="rounded-xl border px-3 py-2 outline-none focus:ring"
            value={form.message}
            onChange={onChange("message")}
            required
          />
          {form.message.trim().length > 0 && form.message.trim().length < 5 ? (
            <span className="mt-1 text-xs text-red-600">Message is too short</span>
          ) : null}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={state.kind === "loading" || !isValid}
            className="inline-flex items-center rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {state.kind === "loading" ? "Sending..." : "Send message"}
          </button>
        </div>

        {state.kind === "error" ? <p className="text-sm text-red-600">{state.message}</p> : null}

        {state.kind === "success" ? (
          <p className="text-sm text-green-700">Thanks. Your message has been sent.</p>
        ) : null}
      </form>

      <section className="mt-12 text-sm text-neutral-500">
        <p>By submitting this form you agree to be contacted at the email you provided for follow up.</p>
      </section>
    </main>
  );
}
