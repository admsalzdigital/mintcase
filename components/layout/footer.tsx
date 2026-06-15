import { MintCaseLogo } from "components/mintcase-logo";
import Link from "next/link";

const FOOTER_LINKS = {
  Unternehmen: [
    { label: "Über uns", href: "/#why" },
    { label: "Kontakt", href: "/contact" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Rückgabe", href: "/returns" },
    { label: "Versand", href: "/shipping" },
  ],
  Rechtliches: [
    { label: "AGB", href: "/terms" },
    { label: "Datenschutz", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2A2A30] bg-[#0B0B0D]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <MintCaseLogo height={28} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-neutral-400">
              MintCase verändert, wie du Mint dabei hast. Diskret, praktisch und
              immer griffbereit.
            </p>
            <p className="mt-4 text-xs text-neutral-500">
              Designed in Österreich 🇦🇹
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-medium text-white">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 transition-colors hover:text-[#AEE2DB]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-[#2A2A30] pt-8 text-xs text-neutral-500">
          <span>🚚 Kostenloser Versand ab €50</span>
          <span>🛡️ 1 Jahr Garantie</span>
          <span>↩️ 30 Tage Rückgabe</span>
        </div>

        <div className="mt-8 text-center text-xs text-neutral-500">
          &copy; {currentYear} MintCase. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
