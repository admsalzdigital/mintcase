import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { INSTAGRAM_IMAGES } from "lib/landing";
import Image from "next/image";
import Link from "next/link";

export function InstagramSection() {
  return (
    <section className="border-t border-[#2A2A30] bg-[#0B0B0D] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Folge unserer Reise
            </h2>
            <p className="text-neutral-400">
              So nutzt unsere Community MintCase im Alltag
            </p>
          </div>
          <Link
            href="https://instagram.com/mintcase"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#2A2A30] px-5 py-2.5 text-sm text-neutral-300 transition-colors hover:border-[#AEE2DB] hover:text-[#AEE2DB]"
          >
            @mintcase folgen
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {INSTAGRAM_IMAGES.map((image, index) => (
            <div
              key={`instagram-${index}-${image.alt}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-[#2A2A30] bg-[#141418]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-[#0B0B0D]/0 transition-colors group-hover:bg-[#0B0B0D]/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
