import { createClient } from "@/lib/supabase/server";
import { Locale } from "@/lib/i18n";
import { StudioPage } from "@/components/StudioPage";
import Link from "next/link";

export default async function EcomStudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale === "zh" ? "zh" : "en") as Locale;

  let user: { email?: string; user_metadata?: Record<string, unknown> } | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Auth not configured — show public page
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center" style={{ background: "var(--color-background)" }}>
        <span className="text-5xl">🔒</span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}>
          {validLocale === "zh" ? "请先登录" : "Sign in required"}
        </h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed" style={{ color: "var(--color-muted-foreground)" }}>
          {validLocale === "zh" ? "登录后即可使用商品图工作室" : "Sign in to access the product image studio"}
        </p>
        <Link href={`/${validLocale}/auth`}
          className="mt-8 inline-flex h-[52px] items-center rounded-xl px-9 text-sm font-semibold shadow-lg transition-all hover:-translate-y-px hover:shadow-xl"
          style={{ background: "var(--color-cta-bg)", color: "var(--color-cta-text)" }}>
          {validLocale === "zh" ? "去登录" : "Sign in"}
        </Link>
      </div>
    );
  }

  return <StudioPage locale={validLocale} user={user} />;
}
