import Link from "next/link";
import { getT, Locale } from "@/lib/i18n";

export default async function EcomStudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale === "zh" ? "zh" : "en") as Locale;
  const t = getT(validLocale);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-4">
      <div className="max-w-md text-center">
        <span className="text-5xl">🚀</span>
        <h1
          className="mt-6 text-3xl font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t.nav.studio}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {validLocale === "zh"
            ? "AI 商品图生成工作台即将上线。注册即可第一时间获得体验资格。"
            : "The AI product image studio is coming soon. Sign up to get early access."}
        </p>
        <Link
          href={`/${validLocale}/auth`}
          className="mt-8 inline-flex h-[52px] items-center gap-2 rounded-xl bg-[#101827] px-9 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-px hover:shadow-xl"
        >
          {t.cta.tryFree}
        </Link>
      </div>
    </div>
  );
}
