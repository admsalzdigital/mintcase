import { normalizeCheckoutUrl } from "lib/checkout";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith("/cart/c/")) {
    const target = normalizeCheckoutUrl(
      `https://${request.nextUrl.host}${pathname}${search}`,
    );
    return NextResponse.redirect(target);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/cart/:path*",
};
