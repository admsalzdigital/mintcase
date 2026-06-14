"use client";

import clsx from "clsx";
import { GridTileImage } from "components/grid/tile";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export function LandingGallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageIndex = searchParams.has("image")
    ? parseInt(searchParams.get("image")!)
    : 0;

  const updateImage = (index: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("image", index);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (!images.length) return null;

  return (
    <form>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[#2A2A30] bg-[#141418]">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-cover"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={images[imageIndex]?.src as string}
            priority
          />
        )}
      </div>

      {images.length > 1 ? (
        <ul className="mt-4 flex flex-wrap gap-3">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={`${image.src}-${index}`}>
                <button
                  formAction={() => updateImage(index.toString())}
                  aria-label="Produktbild auswählen"
                  className={clsx(
                    "h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors",
                    isActive
                      ? "border-[#AEE2DB]"
                      : "border-[#2A2A30] hover:border-neutral-500",
                  )}
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}
