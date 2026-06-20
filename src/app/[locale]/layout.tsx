import { PostHogProvider } from "@/components/PostHogProvider";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PostHogProvider>{children}</PostHogProvider>;
}
