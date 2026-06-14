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
  buttonVariant = "default",
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  isPreOrder: boolean;
  compact?: boolean;
  buttonVariant?: "default" | "landing";
}) {
  const buttonClasses = clsx(
    "relative flex w-full items-center justify-center rounded-full tracking-wide",
    buttonVariant === "landing"
      ? "bg-[#AEE2DB] font-semibold uppercase text-[#0B0B0D] hover:bg-[#8FD4CB]"
      : "bg-blue-600 text-white",
    compact ? "p-3 text-sm" : "p-4",
  );
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";
  const buttonLabel = isPreOrder
    ? PRE_ORDER_BUTTON_TEXT
    : buttonVariant === "landing"
      ? "In den Warenkorb"
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
        "hover:opacity-90": buttonVariant === "default",
        "hover:bg-[#8FD4CB]": buttonVariant === "landing",
      })}
    >
      {buttonVariant === "default" ? (
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
      ) : null}
      {buttonLabel}
    </button>
  );
}

export function AddToCart({
  product,
  compact = false,
  buttonVariant = "default",
}: {
  product: Product;
  compact?: boolean;
  buttonVariant?: "default" | "landing";
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
        buttonVariant={buttonVariant}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
