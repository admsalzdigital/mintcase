import { AnnouncementBar } from "components/landing/announcement-bar";
import CartModal from "components/cart/modal";
import { MintCaseLogo } from "components/mintcase-logo";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Shop", href: "/#product" },
  { label: "Über uns", href: "/#why" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2A30] bg-[#0B0B0D]/95 backdrop-blur-md">
      <AnnouncementBar />
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-neutral-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="absolute left-1/2 -translate-x-1/2">
          <MintCaseLogo height={36} priority />
        </div>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <ul className="flex items-center gap-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-neutral-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <CartModal />
        </div>
      </nav>
    </header>
  );
}
