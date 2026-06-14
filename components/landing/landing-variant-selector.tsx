"use client";

import clsx from "clsx";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { useRouter, useSearchParams } from "next/navigation";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

const COLOR_MAP: Record<string, string> = {
  black: "#1a1a1a",
  white: "#f5f5f5",
  mint: "#AEE2DB",
  schwarz: "#1a1a1a",
  weiß: "#f5f5f5",
  weiss: "#f5f5f5",
};

function isColorOption(name: string) {
  return ["color", "farbe", "colour"].includes(name.toLowerCase());
}

export function LandingVariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  const updateOption = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-8">
      {options.map((option) => {
        const isColor = isColorOption(option.name);

        return (
          <form key={option.id}>
            <div>
              <p className="mb-4 text-sm font-medium text-neutral-300">
                {option.name === "Title"
                  ? "Option"
                  : option.name === "Model"
                    ? "iPhone-Modell wählen"
                    : option.name === "Color"
                      ? "Farbe"
                      : option.name === "Modell"
                        ? "iPhone-Modell wählen"
                        : option.name === "Farbe"
                          ? "Farbe"
                          : option.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const optionNameLowerCase = option.name.toLowerCase();
                  const optionParams: Record<string, string> = {};
                  searchParams.forEach((v, k) => (optionParams[k] = v));
                  optionParams[optionNameLowerCase] = value;

                  const filtered = Object.entries(optionParams).filter(
                    ([key, val]) =>
                      options.find(
                        (opt) =>
                          opt.name.toLowerCase() === key &&
                          opt.values.includes(val),
                      ),
                  );

                  const isAvailableForSale = combinations.find((combination) =>
                    filtered.every(
                      ([key, val]) =>
                        combination[key] === val &&
                        combination.availableForSale,
                    ),
                  );

                  const isActive =
                    searchParams.get(optionNameLowerCase) === value;

                  if (isColor) {
                    const swatch =
                      COLOR_MAP[value.toLowerCase()] || "#888888";

                    return (
                      <button
                        key={value}
                        formAction={() =>
                          updateOption(optionNameLowerCase, value)
                        }
                        aria-disabled={!isAvailableForSale}
                        disabled={!isAvailableForSale}
                        title={value}
                        className={clsx(
                          "relative h-10 w-10 rounded-full border-2 transition-all",
                          isActive
                            ? "border-[#AEE2DB] ring-2 ring-[#AEE2DB]/30"
                            : "border-[#2A2A30] hover:border-neutral-500",
                          !isAvailableForSale && "opacity-40",
                        )}
                        style={{ backgroundColor: swatch }}
                      >
                        <span className="sr-only">{value}</span>
                      </button>
                    );
                  }

                  return (
                    <button
                      formAction={() =>
                        updateOption(optionNameLowerCase, value)
                      }
                      key={value}
                      aria-disabled={!isAvailableForSale}
                      disabled={!isAvailableForSale}
                      className={clsx(
                        "rounded-full border px-4 py-2.5 text-sm transition-all",
                        isActive
                          ? "border-[#AEE2DB] bg-[#AEE2DB]/10 text-[#AEE2DB]"
                          : "border-[#2A2A30] bg-[#141418] text-neutral-300 hover:border-neutral-500",
                        !isAvailableForSale && "cursor-not-allowed opacity-40",
                      )}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          </form>
        );
      })}
    </div>
  );
}
