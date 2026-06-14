"use client";

import {
  ArrowPathIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { TRUST_BADGES } from "lib/landing";
import { Product } from "lib/shopify/types";
import { Suspense } from "react";
import { LandingGallery } from "./landing-gallery";
import { LandingVariantSelector } from "./landing-variant-selector";

const TRUST_ICONS = {
  check: CheckCircleIcon,
  return: ArrowPathIcon,
  shield: ShieldCheckIcon,
  sparkle: SparklesIcon,
};

function TrustBadges() {
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
      {TRUST_BADGES.map((badge) => {
        const Icon = TRUST_ICONS[badge.icon];
        return (
          <li
            key={badge.label}
            className="flex items-center gap-3 text-sm text-neutral-400"
          >
            <Icon className="h-5 w-5 shrink-0 text-[#AEE2DB]" />
            {badge.label}
          </li>
        );
      })}
    </ul>
  );
}

function ProductDetailsInner({ product }: { product: Product }) {
  return (
    <div>
      <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {product.title}
      </h2>
      <div className="mb-6 text-2xl font-medium text-[#AEE2DB]">
        <Price
          amount={product.priceRange.maxVariantPrice.amount}
          currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          currencyCodeClassName="hidden"
        />
      </div>

      {product.descriptionHtml ? (
        <Prose
          className="mb-8 text-sm leading-relaxed text-neutral-400 [&_p]:text-neutral-400"
          html={product.descriptionHtml}
        />
      ) : product.description ? (
        <p className="mb-8 text-sm leading-relaxed text-neutral-400">
          {product.description}
        </p>
      ) : null}

      <LandingVariantSelector
        options={product.options}
        variants={product.variants}
      />

      <div className="mt-8">
        <AddToCart product={product} buttonVariant="landing" />
      </div>

      <TrustBadges />
    </div>
  );
}

export function ProductDisplay({ product }: { product: Product }) {
  const images = product.images.slice(0, 5).map((image) => ({
    src: image.url,
    altText: image.altText || product.title,
  }));

  return (
    <section id="product" className="scroll-mt-24 bg-[#0B0B0D] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Suspense
            fallback={
              <div className="aspect-square animate-pulse rounded-2xl bg-[#141418]" />
            }
          >
            <LandingGallery images={images} />
          </Suspense>

          <Suspense fallback={null}>
            <ProductDetailsInner product={product} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
