import { Locale } from "@/lib/i18n";
import { StudioPage } from "@/components/StudioPage";

export default async function EcomStudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale === "zh" ? "zh" : "en") as Locale;

  return <StudioPage locale={validLocale} />;
}
