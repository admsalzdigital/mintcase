import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const WORDMARK_ASPECT = 944 / 284;

export function MintCaseLogo({
  className,
  height = 36,
  href = "/",
  priority = false,
  variant = "wordmark",
}: {
  className?: string;
  height?: number;
  href?: string | null;
  priority?: boolean;
  variant?: "wordmark" | "full";
}) {
  const src =
    variant === "wordmark" ? "/mintcase-wordmark.png" : "/mintcase-logo.png";
  const aspect = variant === "wordmark" ? WORDMARK_ASPECT : 1;
  const width = Math.round(height * aspect);

  const image = (
    <Image
      src={src}
      alt="MintCase"
      width={width}
      height={height}
      priority={priority}
      className={clsx("h-auto w-auto object-contain object-left", className)}
      style={{ height: `${height}px`, width: "auto", maxWidth: "none" }}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 items-center">
        {image}
      </Link>
    );
  }

  return image;
}
