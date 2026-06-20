import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const locales = ["en", "zh"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && locales.includes(cookie)) return cookie;
  const acceptLang = request.headers.get("accept-language") || "";
  if (acceptLang.includes("zh")) return "zh";
  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/static") || pathname.includes(".")) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  // Supabase: refresh session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  await supabase.auth.getUser();

  // i18n: redirect to locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (pathnameHasLocale) return response;

  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  const redirectResponse = NextResponse.redirect(newUrl);
  redirectResponse.cookies.set("NEXT_LOCALE", locale, { maxAge: 31536000, sameSite: "lax" });

  // Copy any cookies Supabase set
  response.cookies.getAll().forEach((c) => redirectResponse.cookies.set(c.name, c.value, { ...c }));
  return redirectResponse;
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico|robots.txt|sitemap.xml).*)"],
};
