import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "zh"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && locales.includes(cookie)) return cookie;
  const acceptLang = request.headers.get("accept-language") || "";
  if (acceptLang.includes("zh")) return "zh";
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/static") || pathname.includes(".")) {
    return NextResponse.next();
  }
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  const response = NextResponse.redirect(newUrl);
  response.cookies.set("NEXT_LOCALE", locale, { maxAge: 31536000, sameSite: "lax" });
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico|robots.txt|sitemap.xml).*)"],
};
