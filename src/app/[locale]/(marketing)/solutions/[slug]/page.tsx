import Link from "next/link";
import type { Metadata } from "next";
import { getT, Locale } from "@/lib/i18n";
import { solutions } from "@/lib/solutions";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["en", "zh"]) {
    for (const s of solutions) params.push({ locale, slug: s.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale = (locale === "zh" ? "zh" : "en") as Locale;
  const t = getT(validLocale);
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return { title: "Not Found" };
  const data = t.solutions[solution.category as keyof typeof t.solutions];
  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `/${validLocale}/solutions/${slug}`, languages: { en: `/en/solutions/${slug}`, zh: `/zh/solutions/${slug}` } },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const validLocale = (locale === "zh" ? "zh" : "en") as Locale;
  const t = getT(validLocale);
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return <div className="flex min-h-[60vh] items-center justify-center"><h1 className="text-2xl font-bold" style={{ color: "var(--color-foreground)" }}>404 — Solution not found</h1></div>;

  const data = t.solutions[solution.category as keyof typeof t.solutions] as { title: string; description: string; step1: string; step1Desc: string; step2: string; step2Desc: string; step3: string; step3Desc: string };
  const steps = [
    { title: data.step1, desc: data.step1Desc },
    { title: data.step2, desc: data.step2Desc },
    { title: data.step3, desc: data.step3Desc },
  ];

  return (
    <div style={{ background: "var(--color-background)" }}>
      {/* Hero */}
      <section className="px-4 pb-12 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-4xl text-center animate-fade-in">
          <h1
            className="text-[clamp(2.45rem,6vw,5.25rem)] font-extrabold leading-[1.04] tracking-[-0.035em]"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}
          >
            {data.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 sm:text-lg sm:leading-9" style={{ color: "var(--color-muted-foreground)" }}>
            {data.description}
          </p>
        </div>
      </section>

      {/* Best For */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-extrabold tracking-[-0.025em] sm:text-4xl" style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}>
            {validLocale === "zh" ? "适合场景" : "Best for"}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[validLocale === "zh" ? "电商卖家" : "Ecommerce sellers", validLocale === "zh" ? "品牌运营" : "Brand operators", validLocale === "zh" ? "内容创作者" : "Content creators"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border p-6 text-center text-sm font-medium backdrop-blur"
                style={{ borderColor: "var(--color-card-border)", background: "var(--color-card)", color: "var(--color-foreground)" }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-extrabold tracking-[-0.025em] sm:text-4xl" style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}>
            {validLocale === "zh" ? "使用流程" : "How it works"}
          </h2>
          <div className="mt-8 space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ background: "var(--color-cta-bg)", color: "var(--color-cta-text)" }}>
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--color-foreground)" }}>{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-muted-foreground)" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-[-0.025em] sm:text-4xl" style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}>
            {validLocale === "zh" ? "上传你的商品试试" : "Try it with your own product"}
          </h2>
          <div className="mt-8">
            <Link
              href={`/${validLocale}/ecom-studio`}
              className="mx-auto inline-flex h-[54px] items-center gap-2 rounded-2xl px-9 text-base font-semibold shadow-lg transition-all hover:-translate-y-px hover:shadow-xl press-scale"
              style={{ background: "var(--color-cta-bg)", color: "var(--color-cta-text)" }}
            >
              {t.cta.tryFree}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
