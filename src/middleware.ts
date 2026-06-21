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

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/auth") || pathname.startsWith("/static") || pathname.includes(".")) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  // Supabase: refresh session (only if env vars are set)
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      });
      await supabase.auth.getUser();
    } catch {
      // Silently ignore — auth is optional
    }
  }

  // i18n: redirect to locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (pathnameHasLocale) return response;

  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  const redirectResponse = NextResponse.redirect(newUrl);
  redirectResponse.cookies.set("NEXT_LOCALE", locale, { maxAge: 31536000, sameSite: "lax" });

  response.cookies.getAll().forEach((c) => redirectResponse.cookies.set(c.name, c.value, { ...c }));
  return redirectResponse;
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico|robots.txt|sitemap.xml).*)"],
};
