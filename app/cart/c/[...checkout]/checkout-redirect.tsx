import Link from "next/link";
import { getCheckoutHost } from "lib/checkout";

export default function CheckoutRedirectPage() {
  const checkoutHost = getCheckoutHost();

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-6 py-16 text-white">
      <h1 className="text-2xl font-semibold">Checkout-Konfiguration</h1>
      <p className="mt-4 text-sm leading-relaxed text-neutral-400">
        Dein Shop läuft auf Vercel (<strong>www.mint-case.com</strong>). Die
        Kasse muss auf einer separaten Domain laufen, die mit Shopify verbunden
        ist — nicht auf Vercel und nicht über die .myshopify.com-Adresse als
        Primärdomain.
      </p>

      <div className="mt-8 rounded-2xl border border-[#2A2A30] bg-[#141418] p-6 text-left text-sm">
        <p className="font-semibold text-[#AEE2DB]">
          Empfohlenes Setup (Headless-Standard):
        </p>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-neutral-300">
          <li>
            Shopify Admin → <strong>Einstellungen → Domains</strong> → Domain
            verbinden → <strong>checkout.mint-case.com</strong> anlegen
          </li>
          <li>
            DNS (bei Shopify): CNAME <strong>checkout</strong> →{" "}
            <strong>shops.myshopify.com</strong> (exakten Wert von Shopify
            übernehmen)
          </li>
          <li>
            <strong>checkout.mint-case.com</strong> als{" "}
            <strong>Primärdomain</strong> festlegen
          </li>
          <li>
            <strong>www.mint-case.com</strong> bleibt auf Vercel (darf „Nicht
            verbunden“ zeigen — das ist korrekt)
          </li>
          <li>
            In Vercel Environment Variable setzen:{" "}
            <code className="text-[#AEE2DB]">
              SHOPIFY_CHECKOUT_DOMAIN=checkout.mint-case.com
            </code>
          </li>
        </ol>
        <p className="mt-4 text-xs text-neutral-500">
          Aktuell konfigurierter Checkout-Host im Code:{" "}
          <strong>{checkoutHost}</strong>
        </p>
        <p className="mt-2 text-xs text-neutral-500">
          Setze <strong>nicht</strong> ihe0a9-j9.myshopify.com als Primärdomain
          — sonst zeigt Shopify dort den Standard-Online-Shop statt deiner
          Custom-Site.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-[#AEE2DB] px-6 py-3 text-center text-sm font-semibold text-[#0B0B0D]"
        >
          Zurück zum Shop
        </Link>
        <a
          href="https://admin.shopify.com/store/ihe0a9-j9/settings/domains"
          className="rounded-full border border-[#2A2A30] px-6 py-3 text-center text-sm font-semibold text-white hover:border-[#AEE2DB]"
          rel="noopener noreferrer"
          target="_blank"
        >
          Shopify Domains öffnen
        </a>
      </div>
    </main>
  );
}
