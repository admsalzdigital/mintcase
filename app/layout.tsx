import { CartProvider } from "components/cart/cart-context";
import { CookieBanner } from "components/cookie-banner";
import { Navbar } from "components/layout/navbar";
import { ShopifyConfigError } from "components/shopify-config-error";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { baseUrl, getShopifyConfigError } from "lib/utils";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME || "MintCase",
    template: `%s | ${SITE_NAME || "MintCase"}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const configError = getShopifyConfigError();

  if (configError) {
    return (
      <html lang="de" className={GeistSans.variable}>
        <body className="bg-[#111114] text-white">
          <ShopifyConfigError message={configError} />
        </body>
      </html>
    );
  }

  const cart = getCart().catch(() => undefined);

  return (
    <html lang="de" className={GeistSans.variable}>
      <body className="bg-[#0B0B0D] text-white antialiased selection:bg-[#AEE2DB]/30 selection:text-white">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
          </main>
        </CartProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
