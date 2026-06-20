import Link from "next/link";
import type { Metadata } from "next";
import { getT, Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = (locale === "zh" ? "zh" : "en") as Locale;
  return {
    title: `${validLocale === "zh" ? "定价" : "Pricing"} | EcomStudio AI`,
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale === "zh" ? "zh" : "en") as Locale;
  const t = getT(validLocale);

  const plans = [
    {
      name: t.pricing.oneTime,
      badge: t.pricing.off50,
      features: [
        t.pricing.features.canvas,
        t.pricing.features.aiEdit,
        t.pricing.features.standardModel,
        t.pricing.features.bestFor,
        t.pricing.creditsNeverExpire,
      ],
      cta: t.cta.tryFree,
      popular: false,
    },
    {
      name: "Pro",
      badge: undefined,
      features: [
        t.pricing.features.canvas,
        t.pricing.features.textReplace,
        t.pricing.features.layers,
        t.pricing.features.heroImage,
        t.pricing.features.highRes,
      ],
      cta: t.cta.tryFree,
      popular: true,
    },
    {
      name: "Team",
      badge: t.pricing.teamOffer,
      features: [
        t.pricing.features.canvas,
        t.pricing.features.textReplace,
        t.pricing.features.layers,
        t.pricing.features.heroImage,
        t.pricing.features.highRes,
        t.pricing.features.videoGen,
        t.pricing.features.team,
      ],
      cta: validLocale === "zh" ? "联系销售" : "Contact sales",
      popular: false,
    },
  ];

  return (
    <>
      <section className="px-4 pb-12 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.site.name}
          </span>
          <h1
            className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.pricing.title}
          </h1>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#101827] px-4 py-2">
            <span className="text-sm font-bold text-white">
              {t.pricing.subtitle}
            </span>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-[1.75rem] border p-8 backdrop-blur-xl transition-all hover:-translate-y-1.5 ${
                plan.popular
                  ? "border-indigo-200 bg-white shadow-lg ring-1 ring-indigo-500/10"
                  : "border-white/30 bg-white/[0.45] shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-5 right-5 rounded-full bg-indigo-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                  Popular
                </div>
              )}
              {plan.badge && (
                <span className="mb-4 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-emerald-700 ring-1 ring-emerald-200">
                  {plan.badge}
                </span>
              )}
              <h2 className="mt-1.5 text-xl font-bold">{plan.name}</h2>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${validLocale}/auth`}
                className={`mt-8 flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold transition-all hover:-translate-y-px ${
                  plan.popular
                    ? "bg-[#101827] text-white shadow-lg hover:shadow-xl"
                    : "border border-[#d9d6cf] bg-white text-foreground hover:shadow-md"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
