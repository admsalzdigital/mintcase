"use client";

import { normalizeCheckoutUrl } from "lib/checkout";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const REDIRECT_KEY = "mintcase-checkout-attempt";

export default function CheckoutRedirectPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const query = searchParams.toString();
    const currentUrl = `${window.location.origin}${pathname}${query ? `?${query}` : ""}`;
    const target = normalizeCheckoutUrl(currentUrl);

    if (!target.includes(".myshopify.com")) {
      setFailed(true);
      return;
    }

    const previousAttempt = sessionStorage.getItem(REDIRECT_KEY);

    if (previousAttempt === target) {
      sessionStorage.removeItem(REDIRECT_KEY);
      setFailed(true);
      return;
    }

    sessionStorage.setItem(REDIRECT_KEY, target);
    window.location.replace(target);
  }, [pathname, searchParams]);

  if (failed) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="text-2xl font-semibold">Checkout nicht erreichbar</h1>
        <p className="mt-4 text-sm text-neutral-400">
          Die Kasse kann unter dieser Adresse nicht geladen werden. Bitte gehe
          zurück zum Shop und klicke erneut auf „Zur Kasse“.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-[#AEE2DB] px-6 py-3 text-sm font-semibold text-[#0B0B0D]"
        >
          Zurück zum Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-[60vh] items-center justify-center text-white">
      <p className="text-sm text-neutral-400">Weiterleitung zur Kasse…</p>
    </main>
  );
}
