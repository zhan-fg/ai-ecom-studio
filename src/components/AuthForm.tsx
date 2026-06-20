"use client";

import { useState } from "react";
import { getT, Locale } from "@/lib/i18n";

export default function AuthPageClient({
  params: initialParams,
  locale,
}: {
  params?: { locale: string };
  locale: Locale;
}) {
  const t = getT(locale);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <h1
        className="text-[26px] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[32px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {t.auth.welcomeBack}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{t.auth.subtitle}</p>

      {!submitted ? (
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              {t.auth.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-[#d9d6cf] bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[#101827] focus:ring-2 focus:ring-[#101827]/10"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-[#101827] py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-px hover:shadow-xl"
          >
            {t.auth.continue}
          </button>
        </form>
      ) : (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <span className="text-2xl">📧</span>
          <p className="mt-2 text-sm font-medium text-emerald-800">
            {locale === "zh"
              ? `验证链接已发送至 ${email}`
              : `Magic link sent to ${email}`}
          </p>
          <p className="mt-1 text-xs text-emerald-600">
            {locale === "zh" ? "请检查收件箱" : "Check your inbox"}
          </p>
        </div>
      )}

      <div className="mt-6 text-center">
        <span className="text-xs text-muted-foreground">{t.auth.or}</span>
        <div className="mt-3 flex justify-center gap-3">
          {["Google", "GitHub"].map((provider) => (
            <button
              key={provider}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9d6cf] bg-white text-sm font-medium transition-all hover:-translate-y-px hover:shadow-sm"
              title={provider}
            >
              {provider[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
