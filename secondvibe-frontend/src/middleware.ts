import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken && request.nextUrl.pathname.startsWith("/sell")) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Chỉ chạy middleware cho các route cần bảo vệ
export const config = {
  matcher: ["/sell/:path*"],
};
