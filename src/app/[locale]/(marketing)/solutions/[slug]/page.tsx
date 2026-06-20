import Link from "next/link";
import type { Metadata } from "next";
import { getT, Locale } from "@/lib/i18n";
import { solutions } from "@/lib/solutions";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["en", "zh"]) {
    for (const s of solutions) {
      params.push({ locale, slug: s.slug });
    }
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
    title: `${data.title} | ${t.site.name}`,
    description: data.description,
    alternates: {
      canonical: `/${validLocale}/solutions/${slug}`,
      languages: {
        en: `/en/solutions/${slug}`,
        zh: `/zh/solutions/${slug}`,
      },
    },
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
  if (!solution) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h1 className="text-2xl font-bold">404 — Solution not found</h1>
      </div>
    );
  }

  const data = t.solutions[solution.category as keyof typeof t.solutions];

  const steps = [
    { title: (data as { step1: string }).step1, desc: (data as { step1Desc: string }).step1Desc },
    { title: (data as { step2: string }).step2, desc: (data as { step2Desc: string }).step2Desc },
    { title: (data as { step3: string }).step3, desc: (data as { step3Desc: string }).step3Desc },
  ];

  return (
    <>
      {/* Hero */}
      <section className="px-4 pb-12 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="text-[clamp(2.45rem,6vw,5.25rem)] font-extrabold leading-[1.04] tracking-[-0.035em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {data.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
            {data.description}
          </p>
        </div>
      </section>

      {/* Best For */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2
            className="text-3xl font-extrabold tracking-[-0.025em] sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {validLocale === "zh" ? "适合场景" : "Best for"}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              validLocale === "zh" ? "电商卖家" : "Ecommerce sellers",
              validLocale === "zh" ? "品牌运营" : "Brand operators",
              validLocale === "zh" ? "内容创作者" : "Content creators",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#e8e6de] bg-white/60 p-6 text-center text-sm font-medium text-foreground backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2
            className="text-3xl font-extrabold tracking-[-0.025em] sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {validLocale === "zh" ? "使用流程" : "How it works"}
          </h2>
          <div className="mt-8 space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#101827] text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-3xl font-extrabold tracking-[-0.025em] sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {validLocale === "zh" ? "上传你的商品试试" : "Try it with your own product"}
          </h2>
          <div className="mt-8">
            <Link
              href={`/${validLocale}/auth`}
              className="mx-auto inline-flex h-[54px] items-center gap-2 rounded-2xl px-9 text-base font-semibold text-white transition-all hover:-translate-y-px hover:shadow-lg"
              style={{
                background: "#101827",
                boxShadow:
                  "0 2px 8px rgba(16,24,39,0.08), 0 14px 34px -12px rgba(16,24,39,0.35)",
              }}
            >
              {t.cta.tryFree}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
