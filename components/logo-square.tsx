import { MintCaseLogo } from "components/mintcase-logo";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return <MintCaseLogo height={size === "sm" ? 24 : 32} href="/" />;
}
