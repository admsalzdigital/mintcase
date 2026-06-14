const CHECKOUT_HOST =
  process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "") ||
  "ihe0a9-j9.myshopify.com";

const CUSTOM_HOSTS = ["www.mint-case.com", "mint-case.com"];

export function normalizeCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);

    if (CUSTOM_HOSTS.includes(url.hostname)) {
      url.hostname = CHECKOUT_HOST;
    }

    return url.toString();
  } catch {
    return checkoutUrl
      .replace("www.mint-case.com", CHECKOUT_HOST)
      .replace("mint-case.com", CHECKOUT_HOST);
  }
}
