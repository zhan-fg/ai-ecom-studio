import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale === "zh" ? "zh" : "en") as "en" | "zh";

  return (
    <>
      <Header locale={validLocale} />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer locale={validLocale} />
    </>
  );
}
