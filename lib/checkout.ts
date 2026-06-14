const CHECKOUT_HOST =
  process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "") ||
  "ihe0a9-j9.myshopify.com";

/** Always send checkout to Shopify's hosted domain (never the Vercel storefront). */
export function resolveCheckoutUrl(checkoutUrl: string): string {
  try {
    const source = new URL(checkoutUrl);
    const target = new URL(
      `${source.pathname}${source.search}`,
      `https://${CHECKOUT_HOST}`,
    );
    return target.toString();
  } catch {
    return checkoutUrl
      .replace("www.mint-case.com", CHECKOUT_HOST)
      .replace("mint-case.com", CHECKOUT_HOST);
  }
}

export function normalizeCheckoutUrl(checkoutUrl: string): string {
  return resolveCheckoutUrl(checkoutUrl);
}
