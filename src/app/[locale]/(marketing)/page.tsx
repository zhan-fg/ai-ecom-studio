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
    "Amazon",
    "TikTok Shop",
    "Shopify",
    validLocale === "zh" ? "淘宝" : "Taobao",
    validLocale === "zh" ? "天猫" : "Tmall",
    validLocale === "zh" ? "京东" : "JD.com",
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-20 sm:px-6 sm:pt-32 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.06),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1
            className="text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[1.08] tracking-[-0.035em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.home.hero}
          </h1>
          <p className="mx-auto mt-7 max-w-[580px] text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
            {t.home.subhero}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href={`/${validLocale}/auth`}
              className="inline-flex h-[52px] items-center gap-2 rounded-[1rem] border border-[#171d2a] bg-[#101827] px-9 text-[15px] font-semibold text-[#f8f4ee] shadow-lg transition-all hover:-translate-y-px hover:shadow-xl sm:h-14 sm:px-10 sm:text-base"
            >
              {t.home.startBuilding}
            </Link>
            <Link
              href={`/${validLocale}/pricing`}
              className="inline-flex h-[52px] items-center rounded-[1rem] border border-[#d9d6cf] bg-white px-9 text-[15px] font-semibold text-foreground transition-all hover:-translate-y-px hover:shadow-md sm:h-14 sm:px-10 sm:text-base"
            >
              {t.nav.pricing}
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: t.home.listingImages,
                desc: t.home.listingDesc,
                color: "from-indigo-500/10 to-indigo-500/5",
                icon: "🖼️",
              },
              {
                title: t.home.photoEditing,
                desc: t.home.editingDesc,
                color: "from-teal-500/10 to-teal-500/5",
                icon: "✨",
              },
              {
                title: t.home.videoDrafts,
                desc: t.home.videoDesc,
                color: "from-purple-500/10 to-purple-500/5",
                icon: "🎬",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`group relative overflow-hidden rounded-[1.75rem] border border-white/30 bg-white/[0.45] p-7 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/50 hover:shadow-lg sm:p-8`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative">
                  <span className="text-3xl">{card.icon}</span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Tags */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {platforms.map((p) => (
              <span
                key={p}
                className="inline-flex h-9 items-center rounded-full border border-[#d9d6cf] bg-[#fffdf9] px-4 text-[13px] font-semibold text-[#4a5463] shadow-sm sm:h-10 sm:px-5 sm:text-[14px]"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold tracking-wide text-[#687180] sm:text-base">
            {t.home.platformsSupported}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-[clamp(2rem,4.2vw,3.8rem)] font-extrabold leading-[1.1] tracking-[-0.035em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.home.tryIt}
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
            <p className="mt-3 text-sm text-muted-foreground">
              {t.cta.noCard}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
