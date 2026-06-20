import AuthForm from "@/components/AuthForm";
import { Locale } from "@/lib/i18n";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale === "zh" ? "zh" : "en") as Locale;

  return <AuthForm locale={validLocale} />;
}
