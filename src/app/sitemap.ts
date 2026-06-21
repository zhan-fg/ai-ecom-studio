import type { MetadataRoute } from "next";
import { solutions } from "@/lib/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-ecom-studio.vercel.app";

  const marketingPages = [
    "",
    "/pricing",
    "/terms",
    "/privacy",
  ];
  const solutionSlugs = solutions.map((s) => `/solutions/${s.slug}`);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of ["en", "zh"]) {
    for (const path of [...marketingPages, ...solutionSlugs]) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/pricing" ? 0.8 : 0.65,
      });
    }
  }

  return entries;
}
