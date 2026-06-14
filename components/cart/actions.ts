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
    return "Error adding item to cart";
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
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      updateTag(TAGS.cart);
    } else {
      return "Item not found in cart";
    }
  } catch (e) {
    return "Error removing item from cart";
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
      return "Error fetching cart";
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
    return "Error updating item quantity";
  }
}

export async function redirectToCheckout() {
  let cart = await getCart();
  redirect(cart!.checkoutUrl);
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  (await cookies()).set("cartId", cart.id!);
}
