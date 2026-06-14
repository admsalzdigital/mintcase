"use client";

import clsx from "clsx";
import { FALLBACK_PRODUCT } from "lib/landing";
import { Suspense, useState } from "react";
import { LandingGallery } from "./landing-gallery";

function StaticProductDetails() {
  const [selectedModel, setSelectedModel] = useState(
    FALLBACK_PRODUCT.options[0]!.values[0]!,
  );
  const [selectedColor, setSelectedColor] = useState(
    FALLBACK_PRODUCT.options[1]!.values[0]!,
  );

  const colorMap: Record<string, string> = {
    Schwarz: "#1a1a1a",
    Weiß: "#f5f5f5",
    Mint: "#AEE2DB",
  };

  return (
    <div>
      <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {FALLBACK_PRODUCT.title}
      </h2>
      <p className="mb-6 text-2xl font-medium text-[#AEE2DB]">€30,00</p>
      <p className="mb-8 text-sm leading-relaxed text-neutral-400">
        {FALLBACK_PRODUCT.description}
      </p>

      <div className="mb-8">
        <p className="mb-4 text-sm font-medium text-neutral-300">
          iPhone-Modell wählen
        </p>
        <div className="flex flex-wrap gap-2">
          {FALLBACK_PRODUCT.options[0]!.values.map((model) => (
            <button
              key={model}
              onClick={() => setSelectedModel(model)}
              className={clsx(
                "rounded-full border px-4 py-2.5 text-sm transition-all",
                selectedModel === model
                  ? "border-[#AEE2DB] bg-[#AEE2DB]/10 text-[#AEE2DB]"
                  : "border-[#2A2A30] bg-[#141418] text-neutral-300 hover:border-neutral-500",
              )}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-4 text-sm font-medium text-neutral-300">Farbe</p>
        <div className="flex flex-wrap gap-3">
          {FALLBACK_PRODUCT.options[1]!.values.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              title={color}
              className={clsx(
                "relative h-10 w-10 rounded-full border-2 transition-all",
                selectedColor === color
                  ? "border-[#AEE2DB] ring-2 ring-[#AEE2DB]/30"
                  : "border-[#2A2A30] hover:border-neutral-500",
              )}
              style={{ backgroundColor: colorMap[color] }}
            >
              <span className="sr-only">{color}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        disabled
        className="w-full rounded-full bg-[#AEE2DB] py-4 text-sm font-semibold uppercase tracking-wider text-[#0B0B0D] opacity-60"
      >
        In den Warenkorb
      </button>
      <p className="mt-3 text-center text-xs text-neutral-500">
        Shopify-Verbindung erforderlich für den Warenkorb
      </p>
    </div>
  );
}

export function StaticProductDisplay() {
  return (
    <section id="product" className="scroll-mt-24 bg-[#0B0B0D] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Suspense
            fallback={
              <div className="aspect-square animate-pulse rounded-2xl bg-[#141418]" />
            }
          >
            <LandingGallery images={FALLBACK_PRODUCT.images} />
          </Suspense>
          <StaticProductDetails />
        </div>
      </div>
    </section>
  );
}
