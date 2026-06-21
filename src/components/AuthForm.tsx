"use client";

import { useState } from "react";
import { signUp, signInWithPassword, signInWithMagicLink, signInWithGoogle, signInWithGitHub } from "@/lib/auth/actions";

type Tab = "signin" | "signup";

export default function AuthForm({ locale }: { locale: "en" | "zh" }) {
  const [tab, setTab] = useState<Tab>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const t = locale === "zh" ? zh : en;

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const res = await signInWithPassword(formData);
    if (res?.error) setMessage({ type: "error", text: res.error });
    else if (res?.success) window.location.href = `/${locale}/ecom-studio`;
    setLoading(false);
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: t.passwordsDontMatch });
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("locale", locale);
    const res = await signUp(formData);
    if (res?.error) setMessage({ type: "error", text: res.error });
    else setMessage({ type: "success", text: res.message || t.checkEmail });
    setLoading(false);
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("locale", locale);
    const res = await signInWithMagicLink(formData);
    if (res?.error) setMessage({ type: "error", text: res.error });
    else setMessage({ type: "success", text: res.message || t.checkEmail });
    setLoading(false);
  }

  return (
    <div className="w-full max-w-sm animate-fade-in">
      {/* Tab Switcher */}
      <div className="mb-8 flex rounded-xl border p-1" style={{ borderColor: "var(--color-input-border)" }}>
        {(["signin", "signup"] as Tab[]).map((tabName) => (
          <button
            key={tabName}
            onClick={() => { setTab(tabName); setMessage(null); }}
            className="flex-1 rounded-[0.6rem] py-2.5 text-sm font-semibold transition-all"
            style={tab === tabName
              ? { background: "var(--color-cta-bg)", color: "var(--color-cta-text)" }
              : { color: "var(--color-muted-foreground)" }
            }
          >
            {tabName === "signin" ? t.signIn : t.signUp}
          </button>
        ))}
      </div>

      <h1 className="text-[26px] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[32px]"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}>
        {tab === "signin" ? t.welcomeBack : t.createAccount}
      </h1>
      <p className="mt-2 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
        {tab === "signin" ? t.signInSub : t.signUpSub}
      </p>

      {/* OAuth */}
      <div className="mt-6 space-y-3">
        <button onClick={() => signInWithGoogle(locale)}
          className="flex w-full items-center justify-center gap-3 rounded-xl border py-3 text-sm font-medium transition-all hover:-translate-y-px hover:shadow-md"
          style={{ borderColor: "var(--color-input-border)", background: "var(--color-input-bg)", color: "var(--color-foreground)" }}>
          <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Google
        </button>
        <button onClick={() => signInWithGitHub(locale)}
          className="flex w-full items-center justify-center gap-3 rounded-xl border py-3 text-sm font-medium transition-all hover:-translate-y-px hover:shadow-md"
          style={{ borderColor: "var(--color-input-border)", background: "var(--color-input-bg)", color: "var(--color-foreground)" }}>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </button>
      </div>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: "var(--color-input-border)" }} />
        <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>{t.orContinue}</span>
        <div className="h-px flex-1" style={{ background: "var(--color-input-border)" }} />
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-4 rounded-xl p-4 text-sm ${
          message.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800" :
          "bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
        }`}>
          {message.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={tab === "signin" ? handlePasswordLogin : handleSignUp} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-foreground)" }}>
            {t.email}
          </label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/20"
            style={{ background: "var(--color-input-bg)", borderColor: "var(--color-input-border)", color: "var(--color-foreground)" }}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-foreground)" }}>
            {t.password}
          </label>
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" required minLength={6}
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/20"
            style={{ background: "var(--color-input-bg)", borderColor: "var(--color-input-border)", color: "var(--color-foreground)" }}
          />
        </div>

        {tab === "signup" && (
          <div>
            <label className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-foreground)" }}>
              {t.confirmPassword}
            </label>
            <input
              type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••" required minLength={6}
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/20"
              style={{ background: "var(--color-input-bg)", borderColor: "var(--color-input-border)", color: "var(--color-foreground)" }}
            />
          </div>
        )}

        <button type="submit" disabled={loading}
          className="w-full rounded-xl py-3 text-sm font-semibold shadow-lg transition-all hover:-translate-y-px hover:shadow-xl press-scale disabled:opacity-60"
          style={{ background: "var(--color-cta-bg)", color: "var(--color-cta-text)" }}>
          {loading ? t.loading : tab === "signin" ? t.signIn : t.createAccount}
        </button>
      </form>

      {/* Magic link shortcut (signin only) */}
      {tab === "signin" && (
        <form onSubmit={handleMagicLink} className="mt-3">
          <button type="submit" disabled={loading || !email}
            className="w-full py-2.5 text-xs font-medium underline-offset-2 hover:underline transition-colors disabled:opacity-40"
            style={{ color: "var(--color-muted-foreground)" }}>
            {t.magicLink}
          </button>
        </form>
      )}
    </div>
  );
}

const en = {
  signIn: "Sign in",
  signUp: "Sign up",
  welcomeBack: "Welcome back",
  createAccount: "Create account",
  signInSub: "Enter your credentials to access the studio",
  signUpSub: "Start creating product images in seconds",
  email: "Email address",
  password: "Password",
  confirmPassword: "Confirm password",
  loading: "Please wait...",
  checkEmail: "Check your email to confirm your account",
  passwordsDontMatch: "Passwords don't match",
  orContinue: "or continue with email",
  magicLink: "Send a magic link instead",
};

const zh = {
  signIn: "登录",
  signUp: "注册",
  welcomeBack: "欢迎回来",
  createAccount: "创建账号",
  signInSub: "输入账号密码进入工作室",
  signUpSub: "几秒钟创建账号，开始创作",
  email: "邮箱地址",
  password: "密码",
  confirmPassword: "确认密码",
  loading: "请稍候...",
  checkEmail: "请检查邮箱完成注册验证",
  passwordsDontMatch: "两次密码不一致",
  orContinue: "或使用邮箱继续",
  magicLink: "发送免密登录链接",
};
