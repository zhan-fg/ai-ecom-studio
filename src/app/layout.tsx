import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "EcomStudio AI",
    template: "%s | EcomStudio AI",
  },
  description:
    "AI Product Image Generator for Ecommerce Sellers — Create product images for Amazon, Shopify, TikTok Shop, Taobao, and more.",
  metadataBase: new URL("https://ai-ecom-studio.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "EcomStudio AI",
    title: "EcomStudio AI — AI Product Image Generator",
    description:
      "Create product images for Amazon, Shopify, TikTok Shop, Taobao, and ecommerce listings from product photos.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcomStudio AI",
    description:
      "Create product images for Amazon, Shopify, TikTok Shop, Taobao, and ecommerce listings from product photos.",
  },
  robots: { index: true, follow: true },
  alternates: {
    languages: {
      en: "/en",
      zh: "/zh",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
