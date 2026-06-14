"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem } from "components/cart/actions";
import { Product, ProductVariant } from "lib/shopify/types";
import {
  isPreOrderProduct,
  PRE_ORDER_BUTTON_TEXT,
} from "lib/pre-order";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useCart } from "./cart-context";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  isPreOrder,
  compact = false,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  isPreOrder: boolean;
  compact?: boolean;
}) {
  const buttonClasses = clsx(
    "relative flex w-full items-center justify-center rounded-full bg-blue-600 tracking-wide text-white",
    compact ? "p-3 text-sm" : "p-4",
  );
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";
  const buttonLabel = isPreOrder
    ? PRE_ORDER_BUTTON_TEXT
    : "In den Warenkorb";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Ausverkauft
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Bitte wähle eine Option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        {buttonLabel}
      </button>
    );
  }

  return (
    <button
      aria-label={buttonLabel}
      className={clsx(buttonClasses, {
        "hover:opacity-90": true,
      })}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      {buttonLabel}
    </button>
  );
}

export function AddToCart({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const { variants, availableForSale } = product;
  const isPreOrder = isPreOrderProduct(product);
  const { addCartItem } = useCart();
  const searchParams = useSearchParams();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, {
    selectedVariantId,
    isPreOrder,
  });
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;

  return (
    <form
      action={async () => {
        if (finalVariant) {
          addCartItem(finalVariant, product);
        }
        addItemAction();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        isPreOrder={isPreOrder}
        compact={compact}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
