import { CartProvider } from "components/cart/cart-context";
import { CookieBanner } from "components/cookie-banner";
import { Navbar } from "components/layout/navbar";
import { ShopifyConfigError } from "components/shopify-config-error";
import { WelcomeToast } from "components/welcome-toast";
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
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
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
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
        </CartProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
