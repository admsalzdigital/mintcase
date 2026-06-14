const CHECKOUT_HOST =
  process.env.SHOPIFY_CHECKOUT_DOMAIN?.replace(/^https?:\/\//, "") ||
  process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "") ||
  "ihe0a9-j9.myshopify.com";

const STOREFRONT_HOSTS = ["www.mint-case.com", "mint-case.com"];

export function getCheckoutHost(): string {
  return CHECKOUT_HOST;
}

export function isStorefrontHost(hostname: string): boolean {
  return STOREFRONT_HOSTS.includes(hostname);
}

/** Send checkout to Shopify's connected domain, never the Vercel storefront. */
export function resolveCheckoutUrl(checkoutUrl: string): string {
  try {
    const source = new URL(checkoutUrl);

    if (isStorefrontHost(source.hostname)) {
      return new URL(
        `${source.pathname}${source.search}`,
        `https://${CHECKOUT_HOST}`,
      ).toString();
    }

    return source.toString();
  } catch {
    return checkoutUrl
      .replace("www.mint-case.com", CHECKOUT_HOST)
      .replace("mint-case.com", CHECKOUT_HOST);
  }
}

export function normalizeCheckoutUrl(checkoutUrl: string): string {
  return resolveCheckoutUrl(checkoutUrl);
}
