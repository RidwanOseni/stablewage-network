import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const COOKIE_NAME = "swn_user"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // Public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/auth/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/public/")
  ) {
    return NextResponse.next()
  }

  const cookie = request.cookies.get(COOKIE_NAME)?.value
  let user: { role: "freelancer" | "employer" | "admin"; kycComplete: boolean } | null = null
  try {
    user = cookie ? JSON.parse(cookie) : null
  } catch {
    user = null
  }

  if (!user) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/signin"
    return NextResponse.redirect(url)
  }

  // Route role-based redirects if hitting generic dashboard
  if (pathname === "/dashboard") {
    const url = request.nextUrl.clone()
    if (user.role === "employer") url.pathname = "/employer"
    else if (user.role === "admin") url.pathname = "/admin"
    else url.pathname = "/dashboard"
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)",
  ],
}

