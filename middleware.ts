import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_COOKIE = "mintcase-access";

function isComingSoonEnabled() {
  return process.env.COMING_SOON !== "false";
}

function isPublicPath(pathname: string) {
  return (
    pathname.startsWith("/coming-soon") ||
    pathname.startsWith("/api/site-access") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    /\.(?:ico|png|jpg|jpeg|svg|webp|avif)$/.test(pathname)
  );
}

function withPathname(request: NextRequest, response: NextResponse) {
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isComingSoonEnabled()) {
    return withPathname(request, NextResponse.next());
  }

  if (isPublicPath(pathname)) {
    return withPathname(request, NextResponse.next());
  }

  const access = request.cookies.get(ACCESS_COOKIE)?.value;
  if (access === "granted") {
    return withPathname(request, NextResponse.next());
  }

  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  if (pathname !== "/") {
    url.searchParams.set("from", pathname);
  }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
