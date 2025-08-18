import { useCallback, useMemo, useState } from "react";
import ContactForm from "../components/ContactForm";

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
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-2 text-neutral-600">
        Have a question or want to book a session? Send a message and we’ll get back to you.
      </p>

      <ContactForm />
    </main>
  );
}
