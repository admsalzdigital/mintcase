import { ReactNode } from "react";

export const metadata = {
  title: "Coming Soon",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComingSoonLayout({ children }: { children: ReactNode }) {
  return children;
}
