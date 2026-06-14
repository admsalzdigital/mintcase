import Link from "next/link";

export default function CheckoutRedirectPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-6 py-16 text-white">
      <h1 className="text-2xl font-semibold">Checkout-Konfiguration</h1>
      <p className="mt-4 text-sm leading-relaxed text-neutral-400">
        Dein Shop läuft auf Vercel (<strong>www.mint-case.com</strong>), die
        Kasse muss aber auf Shopify gehostet werden. Aktuell leitet Shopify die
        Kasse zurück auf deine Vercel-Domain — deshalb landest du hier statt in
        der Zahlungsmaske.
      </p>

      <div className="mt-8 rounded-2xl border border-[#2A2A30] bg-[#141418] p-6 text-left text-sm">
        <p className="font-semibold text-[#AEE2DB]">
          Einmalig in Shopify einstellen (2 Minuten):
        </p>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-neutral-300">
          <li>
            Shopify Admin → <strong>Einstellungen → Domains</strong>
          </li>
          <li>
            Bei <strong>ihe0a9-j9.myshopify.com</strong> → drei Punkte →{" "}
            <strong>Als primäre Domain festlegen</strong>
          </li>
          <li>
            <strong>www.mint-case.com</strong> darf „Nicht verbunden“ bleiben —
            das ist bei Headless normal (DNS zeigt auf Vercel).
          </li>
        </ol>
        <p className="mt-4 text-xs text-neutral-500">
          Beim Bezahlen siehst du kurz die .myshopify.com-Adresse in der
          Browserleiste. Dein Shop bleibt unter www.mint-case.com.
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
