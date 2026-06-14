import Footer from "components/layout/footer";
import { HeroSection } from "components/landing/hero-section";
import { InstagramSection } from "components/landing/instagram-section";
import { ProductSection } from "components/landing/product-section";
import { ReviewsSection } from "components/landing/reviews-section";
import { ValuePropositionSection } from "components/landing/value-proposition-section";
import { Suspense } from "react";

export const metadata = {
  description:
    "MintCase — das diskrete iPhone Case mit zwei Fächern für Mint. Premium-Materialien, schlankes Profil, geruchsblockierend.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense
        fallback={
          <div className="flex min-h-[600px] items-center justify-center bg-[#0B0B0D]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#AEE2DB] border-t-transparent" />
          </div>
        }
      >
        <ProductSection />
      </Suspense>
      <ValuePropositionSection />
      <ReviewsSection />
      <InstagramSection />
      <Footer />
    </>
  );
}
