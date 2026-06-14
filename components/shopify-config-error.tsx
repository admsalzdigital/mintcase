export function ShopifyConfigError({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111114] p-6">
      <div className="max-w-xl rounded-2xl border border-cyan-500/20 bg-[#1c1c1e] p-8 shadow-2xl shadow-cyan-950/30">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          <p className="text-sm font-semibold tracking-wide text-cyan-300">
            MintCase Setup
          </p>
        </div>
        <h1 className="mb-3 text-2xl font-semibold text-white">
          Shopify-Verbindung fehlt
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-white/80">{message}</p>
        <ol className="space-y-3 text-sm text-white/70">
          <li>1. Shopify Admin → Vertriebskanäle → Headless → Mint Case Headless</li>
          <li>2. Storefront API → Verwalten → Anmeldedaten</li>
          <li>
            3. <strong className="text-white">Privaten Zugriffstoken</strong>{" "}
            kopieren (beginnt mit shpat_ — das ist korrekt)
          </li>
          <li>
            4. In{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-300">
              .env.local
            </code>{" "}
            eintragen
          </li>
          <li>
            5. Prüfe{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-300">
              SHOPIFY_STORE_DOMAIN
            </code>
            : Einstellungen → Domains → deine .myshopify.com-Adresse
          </li>
          <li>6. Dev-Server neu starten: npm run dev</li>
        </ol>
      </div>
    </div>
  );
}
