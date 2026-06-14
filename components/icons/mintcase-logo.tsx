import clsx from "clsx";

export default function MintCaseLogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      {...props}
      className={clsx("h-full w-full", props.className)}
    >
      <rect width="32" height="32" rx="8" fill="#AEE2DB" />
      <path
        d="M8 20C8 14 11 10 16 10C21 10 24 14 24 20"
        stroke="#0B0B0D"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="12" r="2" fill="#0B0B0D" />
    </svg>
  );
}
