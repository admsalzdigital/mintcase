import { Suspense } from "react";
import CheckoutRedirectPage from "./checkout-redirect";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[60vh] items-center justify-center text-white">
          <p className="text-sm text-neutral-400">Weiterleitung zur Kasse…</p>
        </main>
      }
    >
      <CheckoutRedirectPage />
    </Suspense>
  );
}
