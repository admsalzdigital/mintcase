"use client";

import Image from "next/image";

export function HeroSection() {
  const scrollToProduct = () => {
    document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1920&q=80"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D] via-[#0B0B0D]/90 to-[#0B0B0D]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-[#0B0B0D]/60" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#AEE2DB]">
            MintCase
          </p>
          <h1 className="mb-6 text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            Mint gehört
            <br />
            hierher.
          </h1>
          <p className="mb-10 max-w-lg text-lg leading-relaxed text-neutral-400">
            Fragt nicht nach Platz — erledigt einfach seinen Job. Diskret,
            kompakt und immer bereit.
          </p>
          <button
            onClick={scrollToProduct}
            className="rounded-full bg-[#AEE2DB] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[#0B0B0D] transition-colors hover:bg-[#8FD4CB]"
          >
            Case entdecken
          </button>
        </div>
      </div>
    </section>
  );
}
