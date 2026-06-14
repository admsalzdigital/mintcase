"use server";

import { TAGS } from "lib/constants";
import { getPreOrderCartAttributes } from "lib/pre-order";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "lib/shopify";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type AddItemPayload = {
  selectedVariantId: string | undefined;
  isPreOrder: boolean;
};

export async function addItem(prevState: any, payload: AddItemPayload) {
  const { selectedVariantId, isPreOrder } = payload;

  if (!selectedVariantId) {
    return "Bitte wähle zuerst eine Option";
  }

  try {
    await addToCart([
      {
        merchandiseId: selectedVariantId,
        quantity: 1,
        ...(isPreOrder && { attributes: getPreOrderCartAttributes() }),
      },
    ]);
    updateTag(TAGS.cart);
  } catch (e) {
    return "Artikel konnte nicht hinzugefügt werden";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return "Warenkorb konnte nicht geladen werden";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      updateTag(TAGS.cart);
    } else {
      return "Artikel nicht im Warenkorb gefunden";
    }
  } catch (e) {
    return "Artikel konnte nicht entfernt werden";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
    isPreOrder?: boolean;
  }
) {
  const { merchandiseId, quantity, isPreOrder = false } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return "Warenkorb konnte nicht geladen werden";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity,
          },
        ]);
      }
    } else if (quantity > 0) {
      await addToCart([
        {
          merchandiseId,
          quantity,
          ...(isPreOrder && { attributes: getPreOrderCartAttributes() }),
        },
      ]);
    }

    updateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return "Menge konnte nicht aktualisiert werden";
  }
}

export async function redirectToCheckout() {
  const cart = await getCart();
  // Custom-Domain im Checkout-Link durch die funktionierende Shopify-Zentrale ersetzen
  const checkoutUrl = cart!.checkoutUrl
    .replace("www.mint-case.com", "ihe0a9-j9.myshopify.com")
    .replace("mint-case.com", "ihe0a9-j9.myshopify.com");
  redirect(checkoutUrl);
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  (await cookies()).set("cartId", cart.id!);
}
