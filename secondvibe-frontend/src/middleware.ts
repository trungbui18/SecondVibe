import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (
    !refreshToken &&
    (request.nextUrl.pathname.startsWith("/sell") ||
      request.nextUrl.pathname.startsWith("/cart"))
  ) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sell", "/sell/:path*", "/cart", "/cart/:path*"],
};
