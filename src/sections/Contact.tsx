import { useState } from "react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="container max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-2 text-neutral-600">
        Have a question or want to book a session? Send a message and we’ll get back to you.
      </p>

      <form onSubmit={handleSubmit} className="mx-auto space-y-4 flex flex-col">
        {/* Web3Forms access key */}
        <input type="hidden" name="access_key" value="ff9343a8-ac57-4faf-9b33-cfc474b98a02" />

        {/* Honeypot */}
        <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="rounded-xl border border-gray-300 px-3 py-2 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-xl border border-gray-300 px-3 py-2 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="mb-1 text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="rounded-xl border border-gray-300 px-3 py-2 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="self-center w-full sm:max-w-[60%] h-14 p-2 rounded-xl border font-calli text-3xl bg-[#f0ebe3] hover:bg-[#d9cfc0]  border-[#e0dcd5] focus:ring-[#e0dcd5] text-gray-800 transition focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-center text-sm text-green-600">Thanks! Your message has been sent.</p>
        )}
        {status === "error" && <p className="text-center text-sm text-red-600">Sorry, something went wrong.</p>}
      </form>
    </main>
  );
}
