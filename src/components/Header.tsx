import Link from "next/link";
import { getT, Locale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const otherLocale = locale === "en" ? "zh" : "en";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-white/[0.65] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-xl">✦</span>
          {t.site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href={`/${locale}/solutions/ai-product-image-generator`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.solutions}
          </Link>
          <Link
            href={`/${locale}/pricing`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.nav.pricing}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${otherLocale}`}
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            {otherLocale === "en" ? "EN" : "中文"}
          </Link>
          <Link
            href={`/${locale}/auth`}
            className="inline-flex h-9 items-center rounded-[0.9rem] border border-[#d9d6cf] bg-[#101827] px-4 text-sm font-semibold text-[#f8f4ee] shadow-sm transition-all hover:-translate-y-px hover:shadow-md"
          >
            {t.nav.startFree}
          </Link>
        </div>
      </div>
    </header>
  );
}
