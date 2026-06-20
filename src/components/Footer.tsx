import Link from "next/link";
import { getT, Locale } from "@/lib/i18n";
import { solutions } from "@/lib/solutions";

export function Footer({ locale }: { locale: Locale }) {
  const t = getT(locale);

  return (
    <footer className="border-t border-[#e8e6de] bg-[#faf9f7]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t.footer.product}</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href={`/${locale}/pricing`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.nav.pricing}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/ecom-studio`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.nav.studio}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t.footer.solutions}</h3>
            <ul className="mt-3 space-y-2">
              {solutions.map((s) => {
                const st = t.solutions[s.category as keyof typeof t.solutions];
                return (
                  <li key={s.slug}>
                    <Link
                      href={`/${locale}/solutions/${s.slug}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {st.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t.footer.legal}</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{t.site.name}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{t.site.description}</p>
          </div>
        </div>
        <div className="mt-12 border-t border-[#e8e6de] pt-6">
          <p className="text-sm text-muted-foreground">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
