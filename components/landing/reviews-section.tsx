import { StarIcon } from "@heroicons/react/24/solid";
import { REVIEWS, STATS } from "lib/landing";

function StarRating() {
  return (
    <div className="mb-3 flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="h-4 w-4 text-[#AEE2DB]" />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="border-t border-[#2A2A30] bg-[#141418] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Geliebt von über 1.000 Nutzern
          </h2>
          <p className="text-neutral-400">
            Das sagen unsere Kunden über ihre MintCase-Erfahrung.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <blockquote
              key={review.name}
              className="flex flex-col rounded-2xl border border-[#2A2A30] bg-[#0B0B0D] p-6"
            >
              <StarRating />
              <p className="mb-2 text-base font-medium text-white">
                &ldquo;{review.quote}&rdquo;
              </p>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-400">
                {review.body}
              </p>
              <footer className="border-t border-[#2A2A30] pt-4">
                <p className="text-sm font-medium text-white">{review.name}</p>
                <p className="text-xs text-neutral-500">{review.location}</p>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-[#2A2A30] pt-12 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold text-[#AEE2DB]">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
