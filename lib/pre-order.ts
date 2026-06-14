import { Product } from "lib/shopify/types";

export const PRE_ORDER_TAG = "pre-order";
export const PRE_ORDER_BUTTON_TEXT =
  "Jetzt vorbestellen (Lieferung in 4 Wochen)";
export const PRE_ORDER_SHIPPING_NOTE = "Pre-Order - Versand in 4 Wochen";

export function isPreOrderProduct(product: Product): boolean {
  return product.tags.includes(PRE_ORDER_TAG);
}

export function getPreOrderCartAttributes() {
  return [{ key: "_shipping_note", value: PRE_ORDER_SHIPPING_NOTE }];
}
