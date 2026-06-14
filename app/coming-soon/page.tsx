"use client";

import { MintCaseLogo } from "components/mintcase-logo";
import { FormEvent, useState } from "react";

export default function ComingSoonPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/site-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Falsches Passwort");
        return;
      }

      window.location.href = "/";
    } catch {
      setError("Etwas ist schiefgelaufen. Bitte erneut versuchen.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0B0B0D] px-6 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(174,226,219,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#AEE2DB]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-20 h-64 w-64 rounded-full bg-[#AEE2DB]/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <MintCaseLogo className="h-10" href={null} />
        </div>

        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-[#AEE2DB]">
          Coming Soon
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Mint gehört hierher.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
          Wir bereiten den Launch vor. Zugang nur mit Passwort.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4 text-left">
          <label className="block">
            <span className="mb-2 block text-sm text-neutral-300">Passwort</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-[#2A2A30] bg-[#141418] px-4 py-3 text-white outline-none transition-colors focus:border-[#AEE2DB]"
              placeholder="Passwort eingeben"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-[#AEE2DB] px-6 py-3 text-sm font-semibold text-[#0B0B0D] transition-colors hover:bg-[#8FD4CB] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Wird geprüft…" : "Zugang freischalten"}
          </button>
        </form>
      </div>
    </div>
  );
}
