import Link from "next/link";
import { getT } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale === "zh" ? "zh" : "en") as "en" | "zh";
  const t = getT(validLocale);

  const platforms = [
    "Amazon", "TikTok Shop", "Shopify",
    validLocale === "zh" ? "淘宝" : "Taobao",
    validLocale === "zh" ? "天猫" : "Tmall",
    validLocale === "zh" ? "京东" : "JD.com",
  ];

  const cards = [
    { title: t.home.listingImages, desc: t.home.listingDesc, icon: "🖼️", delay: "100" },
    { title: t.home.photoEditing, desc: t.home.editingDesc, icon: "✨", delay: "200" },
    { title: t.home.videoDrafts, desc: t.home.videoDesc, icon: "🎬", delay: "300" },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 pb-20 pt-20 sm:px-6 sm:pt-32 lg:px-8"
        style={{ background: "var(--color-background)" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.06),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl text-center animate-fade-in">
          <h1
            className="text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[1.08] tracking-[-0.035em]"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}
          >
            {t.home.hero}
          </h1>
          <p
            className="mx-auto mt-7 max-w-[580px] text-base leading-8 sm:text-lg sm:leading-9"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            {t.home.subhero}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href={`/${validLocale}/ecom-studio`}
              className="inline-flex h-[52px] items-center gap-2 rounded-[1rem] border px-9 text-[15px] font-semibold shadow-lg transition-all hover:-translate-y-px hover:shadow-xl press-scale sm:h-14 sm:px-10 sm:text-base"
              style={{
                background: "var(--color-cta-bg)",
                color: "var(--color-cta-text)",
                borderColor: "var(--color-cta-bg)",
              }}
            >
              {t.home.startBuilding}
            </Link>
            <Link
              href={`/${validLocale}/pricing`}
              className="inline-flex h-[52px] items-center rounded-[1rem] border px-9 text-[15px] font-semibold transition-all hover:-translate-y-px hover:shadow-md press-scale sm:h-14 sm:px-10 sm:text-base"
              style={{
                borderColor: "var(--color-tag-border)",
                color: "var(--color-foreground)",
              }}
            >
              {t.nav.pricing}
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section
        className="px-4 pb-20 sm:px-6 lg:px-8"
        style={{ background: "var(--color-background)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-3">
            {cards.map((card, i) => (
              <div
                key={card.title}
                className={`animate-fade-in animate-delay-${card.delay} group relative overflow-hidden rounded-[1.75rem] border p-7 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg sm:p-8`}
                style={{
                  background: "var(--color-card)",
                  borderColor: "var(--color-card-border)",
                }}
              >
                <div className="relative">
                  <span className="text-3xl">{card.icon}</span>
                  <h3
                    className="mt-4 text-lg font-bold tracking-tight"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Tags */}
      <section
        className="px-4 pb-24 sm:px-6 lg:px-8"
        style={{ background: "var(--color-background)" }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {platforms.map((p) => (
              <span
                key={p}
                className="inline-flex h-9 items-center rounded-full border px-4 text-[13px] font-semibold shadow-sm transition-all hover:-translate-y-0.5 sm:h-10 sm:px-5 sm:text-[14px]"
                style={{
                  background: "var(--color-tag-bg)",
                  borderColor: "var(--color-tag-border)",
                  color: "var(--color-tag-text)",
                }}
              >
                {p}
              </span>
            ))}
          </div>
          <p
            className="mt-6 text-sm font-semibold tracking-wide sm:text-base"
            style={{ color: "var(--color-tag-text)" }}
          >
            {t.home.platformsSupported}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-4 pb-32 sm:px-6 lg:px-8"
        style={{ background: "var(--color-background)" }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-[clamp(2rem,4.2vw,3.8rem)] font-extrabold leading-[1.1] tracking-[-0.035em]"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}
          >
            {t.home.tryIt}
          </h2>
          <div className="mt-8">
            <Link
              href={`/${validLocale}/ecom-studio`}
              className="mx-auto inline-flex h-[54px] items-center gap-2 rounded-2xl px-9 text-base font-semibold shadow-lg transition-all hover:-translate-y-px hover:shadow-xl press-scale"
              style={{
                background: "var(--color-cta-bg)",
                color: "var(--color-cta-text)",
              }}
            >
              {t.cta.tryFree}
            </Link>
            <p className="mt-3 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
              {t.cta.noCard}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
