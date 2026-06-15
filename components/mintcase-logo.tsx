import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/logo.png";
const LOGO_ASPECT = 1629 / 543;

export function MintCaseLogo({
  className,
  height = 36,
  href = "/",
  priority = false,
}: {
  className?: string;
  height?: number;
  href?: string | null;
  priority?: boolean;
}) {
  const width = Math.round(height * LOGO_ASPECT);

  const image = (
    <Image
      src={LOGO_SRC}
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
