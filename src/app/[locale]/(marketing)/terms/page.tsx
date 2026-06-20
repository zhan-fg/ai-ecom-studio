import { getT, Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `${locale === "zh" ? "服务条款" : "Terms of Service"} | EcomStudio AI`,
  };
}

export default async function TermsPage({
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
        {isZh ? "服务条款" : "Terms of Service"}
      </h1>
      <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
        {isZh
          ? "本服务条款适用于 EcomStudio AI，包括 AI 电商商品图生成、编辑及相关工作流工具。"
          : "These Terms of Service govern access to EcomStudio AI, including AI ecommerce product image generation, editing, and related workflow tools."}
      </p>

      <div className="mt-12 space-y-10">
        <Section
          title={isZh ? "服务使用" : "Use of the Service"}
          content={
            isZh
              ? "您只能将 EcomStudio AI 用于合法的商业或创意目的。您对通过本服务上传、生成、编辑或发布的内容负责。不得利用平台侵犯知识产权、冒充他人或创建非法、欺骗性或有害内容。"
              : "You may use EcomStudio AI only for lawful business or creative purposes. You are responsible for the content you upload, generate, edit, or publish through the service. You must not use the platform to infringe intellectual property rights, impersonate others, or create illegal, deceptive, or harmful content."
          }
        />
        <Section
          title={isZh ? "账户与计费" : "Accounts and Billing"}
          content={
            isZh
              ? "您有责任维护账户凭证的机密性，并对账户下的所有活动负责。付费计划、积分和订阅受购买时显示的定价条款约束。已收取的费用通常不可退款，除非法律要求。"
              : "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Paid plans, credits, and subscriptions are governed by the pricing terms shown at purchase. Fees already charged are generally non-refundable unless required by law."
          }
        />
        <Section
          title={isZh ? "生成内容与可用性" : "Generated Content and Availability"}
          content={
            isZh
              ? "您有责任在使用前验证生成输出的准确性、商业适用性和平台政策合规性。我们可能根据需要更新、暂停或停止功能以维护安全性、性能或服务质量。"
              : "You retain responsibility for verifying that generated outputs are accurate, commercially suitable, and compliant with platform policies before use. We may update, suspend, or discontinue features when necessary to maintain security, performance, or service quality."
          }
        />
      </div>

      <p className="mt-16 text-sm text-muted-foreground">
        {isZh ? "© 2026 EcomStudio AI. 保留所有权利。" : `© 2026 EcomStudio AI. All rights reserved.`}
      </p>
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 text-base leading-8 text-muted-foreground">
        {content}
      </p>
    </div>
  );
}
