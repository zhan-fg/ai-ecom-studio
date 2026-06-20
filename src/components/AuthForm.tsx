"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getT, Locale } from "@/lib/i18n";
import { signIn, signInWithGoogle, signInWithGitHub } from "@/lib/auth/actions";

export default function AuthForm({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("locale", locale);
    const result = await signIn(formData);
    setLoading(false);
    if (result?.success) setSubmitted(true);
  }

  return (
    <div className="w-full max-w-sm animate-fade-in">
      <h1
        className="text-[26px] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[32px]"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}
      >
        {t.auth.welcomeBack}
      </h1>
      <p className="mt-2 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
        {t.auth.subtitle}
      </p>

      {!submitted ? (
        <>
          {/* OAuth Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => signInWithGoogle(locale)}
              className="flex w-full items-center justify-center gap-3 rounded-xl border py-3 text-sm font-medium transition-all hover:-translate-y-px hover:shadow-md"
              style={{ borderColor: "var(--color-input-border)", background: "var(--color-input-bg)", color: "var(--color-foreground)" }}
            >
              <span className="text-lg">G</span> Google
            </button>
            <button
              onClick={() => signInWithGitHub(locale)}
              className="flex w-full items-center justify-center gap-3 rounded-xl border py-3 text-sm font-medium transition-all hover:-translate-y-px hover:shadow-md"
              style={{ borderColor: "var(--color-input-border)", background: "var(--color-input-bg)", color: "var(--color-foreground)" }}
            >
              <span className="text-lg">⌘</span> GitHub
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: "var(--color-input-border)" }} />
            <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>{t.auth.or}</span>
            <div className="h-px flex-1" style={{ background: "var(--color-input-border)" }} />
          </div>

          {/* Email Form */}
          <form className="space-y-4" onSubmit={handleEmail}>
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-foreground)" }}>
                {t.auth.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/20"
                style={{ background: "var(--color-input-bg)", borderColor: "var(--color-input-border)", color: "var(--color-foreground)" }}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3 text-sm font-semibold shadow-lg transition-all hover:-translate-y-px hover:shadow-xl press-scale disabled:opacity-60"
              style={{ background: "var(--color-cta-bg)", color: "var(--color-cta-text)" }}
            >
              {loading ? (locale === "zh" ? "发送中..." : "Sending...") : t.auth.continue}
            </button>
          </form>
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-800 dark:bg-emerald-900/20">
          <span className="text-2xl">📧</span>
          <p className="mt-2 text-sm font-medium text-emerald-800 dark:text-emerald-400">
            {locale === "zh" ? `验证链接已发送至 ${email}` : `Magic link sent to ${email}`}
          </p>
          <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-500">
            {locale === "zh" ? "请检查收件箱" : "Check your inbox"}
          </p>
        </div>
      )}
    </div>
  );
}
