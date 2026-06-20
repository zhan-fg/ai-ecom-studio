import { getT, Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `${locale === "zh" ? "隐私政策" : "Privacy Policy"} | EcomStudio AI`,
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale === "zh" ? "zh" : "en") as Locale;
  const isZh = validLocale === "zh";

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <h1
        className="text-[36px] font-semibold leading-[1.2] tracking-[-0.02em] sm:text-[48px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {isZh ? "隐私政策" : "Privacy Policy"}
      </h1>
      <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
        {isZh
          ? "本隐私政策说明 EcomStudio AI 如何收集、使用和保护与电商图片生成及编辑工作流相关的信息。"
          : "This Privacy Policy explains how EcomStudio AI collects, uses, and protects information related to ecommerce image generation and editing workflows."}
      </p>

      <div className="mt-12 space-y-10">
        {[
          {
            title: isZh ? "信息收集" : "Information Collection",
            content: isZh
              ? "我们可能收集账户信息、账单数据、上传的商品图片、生成的素材以及运营和保护服务所需的技术日志。我们还收集使用数据，如设备、浏览器和交互信息，以改善可靠性和产品体验。"
              : "We may collect account information, billing data, uploaded product images, generated assets, and technical logs needed to operate and secure the service. We also collect usage data such as device, browser, and interaction information to improve reliability and product experience.",
          },
          {
            title: isZh ? "信息使用" : "How We Use Information",
            content: isZh
              ? "我们使用收集的信息来验证用户身份、处理付款、生成和存储请求的输出、支持客户以及改进平台。我们可能分析聚合的使用模式以优化性能、模型路由和产品质量。"
              : "We use collected information to authenticate users, process payments, generate and store requested outputs, support customers, and improve the platform. We may analyze aggregated usage patterns to optimize performance, model routing, and product quality.",
          },
          {
            title: isZh ? "数据安全" : "Data Security",
            content: isZh
              ? "我们采用合理的技术和组织措施来保护存储的数据。任何互联网服务都无法保证绝对安全。"
              : "We apply reasonable technical and organizational safeguards to protect stored data. No internet service can guarantee absolute security.",
          },
          {
            title: isZh ? "数据保留" : "Data Retention",
            content: isZh
              ? "我们仅在运营、法律、计费或安全目的所需的时间内保留信息，或在支持的情况下根据删除请求予以删除。"
              : "We retain information only as long as necessary for operational, legal, billing, or security purposes, or until deletion is requested where supported.",
          },
        ].map((section) => (
          <div key={section.title}>
            <h2 className="text-2xl font-semibold tracking-tight">
              {section.title}
            </h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-16 text-sm text-muted-foreground">
        {isZh ? "© 2026 EcomStudio AI. 保留所有权利。" : `© 2026 EcomStudio AI. All rights reserved.`}
      </p>
    </div>
  );
}
