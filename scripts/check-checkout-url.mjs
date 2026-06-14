import { readFileSync } from "fs";

const env = readFileSync(".env.local", "utf8");
const domain = env.match(/SHOPIFY_STORE_DOMAIN="([^"]+)"/)?.[1];
const token = env.match(/SHOPIFY_STOREFRONT_ACCESS_TOKEN="([^"]+)"/)?.[1];

if (!domain || !token) {
  console.log("missing env");
  process.exit(1);
}

const host = domain.replace(/^https:\/\//, "");
const res = await fetch(`https://${host}/api/2025-01/graphql.json`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Shopify-Storefront-Private-Token": token,
    "Shopify-Storefront-Buyer-IP": "127.0.0.1",
  },
  body: JSON.stringify({
    query: `mutation { cartCreate { cart { id checkoutUrl totalQuantity } } }`,
  }),
});

const data = await res.json();
const cart = data.data?.cartCreate?.cart;

if (!cart) {
  console.log("error", JSON.stringify(data.errors || data, null, 2));
  process.exit(1);
}

console.log("checkoutUrl:", cart.checkoutUrl);
console.log("host:", new URL(cart.checkoutUrl).host);

const fixed = cart.checkoutUrl
  .replace("www.mint-case.com", "ihe0a9-j9.myshopify.com")
  .replace("mint-case.com", "ihe0a9-j9.myshopify.com");

console.log("fixedUrl:", fixed);
console.log("fixedHost:", new URL(fixed).host);
