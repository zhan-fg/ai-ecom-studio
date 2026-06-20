"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { getT, Locale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const otherLocale = locale === "en" ? "zh" : "en";
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-colors"
      style={{
        background: "var(--color-header-bg)",
        borderColor: "var(--color-header-border)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}
        >
          <span className="text-xl">✦</span>
          {t.site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href={`/${locale}/solutions/ai-product-image-generator`}
            className="text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            {t.nav.solutions}
          </Link>
          <Link
            href={`/${locale}/pricing`}
            className="text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            {t.nav.pricing}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          )}
          <Link
            href={`/${otherLocale}`}
            className="text-xs font-medium transition-colors hover:opacity-80"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            {otherLocale === "en" ? "EN" : "中文"}
          </Link>
          <Link
            href={`/${locale}/auth`}
            className="inline-flex h-9 items-center rounded-[0.9rem] border px-4 text-sm font-semibold shadow-sm transition-all hover:-translate-y-px hover:shadow-md press-scale"
            style={{
              borderColor: "var(--color-tag-border)",
              background: "var(--color-cta-bg)",
              color: "var(--color-cta-text)",
            }}
          >
            {t.nav.startFree}
          </Link>
        </div>
      </div>
    </header>
  );
}
