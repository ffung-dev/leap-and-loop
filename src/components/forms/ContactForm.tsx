"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ email }: { email?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          isCommissionInquiry: data.get("isCommissionInquiry") === "on",
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-green-200 bg-green-50 px-6 py-12 text-center">
        <CheckCircle2 className="text-green-600" size={36} aria-hidden />
        <p className="font-subheading text-xl text-brown-900">Message sent!</p>
        <p className="max-w-sm text-sm text-brown-600">
          Thanks for reaching out — we&apos;ll get back to you as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-semibold text-green-700 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-brown-800">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-tan-300 bg-white px-4 py-2.5 text-sm text-brown-900 focus:border-green-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-brown-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-tan-300 bg-white px-4 py-2.5 text-sm text-brown-900 focus:border-green-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-brown-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your custom commission idea, workshop question, or anything else…"
          className="w-full resize-y rounded-xl border border-tan-300 bg-white px-4 py-2.5 text-sm text-brown-900 focus:border-green-500 focus:outline-none"
        />
      </div>

      <label className="flex items-center gap-2.5 text-sm text-brown-700">
        <input
          type="checkbox"
          name="isCommissionInquiry"
          className="h-4 w-4 rounded border-tan-300 text-green-600 focus:ring-green-500"
        />
        This is a custom commission inquiry
      </label>

      {status === "error" && (
        <p className="rounded-xl bg-pink-50 px-4 py-3 text-sm text-pink-800">
          {errorMessage}
          {email && (
            <>
              {" "}
              <a href={`mailto:${email}`} className="font-semibold underline">
                Email us instead
              </a>
              .
            </>
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" && <Loader2 size={16} className="animate-spin" aria-hidden />}
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
