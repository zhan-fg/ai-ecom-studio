"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getT, Locale } from "@/lib/i18n";
import { signOut } from "@/lib/auth/actions";

interface StudioPageProps {
  locale: Locale;
  user: { email?: string; user_metadata?: { full_name?: string; avatar_url?: string } };
}

export function StudioPage({ locale, user }: StudioPageProps) {
  const t = getT(locale);
  const router = useRouter();
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...dropped]);
  }, []);

  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || (locale === "zh" ? "用户" : "User");

  return (
    <div className="min-h-screen px-4 pb-20 pt-24 sm:px-6 lg:px-8" style={{ background: "var(--color-background)" }}>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl" style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}>
              {locale === "zh" ? "商品图工作室" : "Product Image Studio"}
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
              {locale === "zh" ? `欢迎回来，${displayName}` : `Welcome back, ${displayName}`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/pricing`}
              className="inline-flex h-10 items-center rounded-xl border px-5 text-sm font-medium transition-all hover:-translate-y-px"
              style={{ borderColor: "var(--color-tag-border)", color: "var(--color-foreground)" }}
            >
              {locale === "zh" ? "升级套餐" : "Upgrade plan"}
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex h-10 items-center rounded-xl border px-4 text-sm font-medium transition-all hover:-translate-y-px"
                style={{ borderColor: "var(--color-tag-border)", color: "var(--color-muted-foreground)" }}
              >
                {locale === "zh" ? "退出" : "Sign out"}
              </button>
            </form>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative rounded-[1.5rem] border-2 border-dashed p-12 text-center transition-all duration-200 ${dragOver ? "scale-[1.02] border-indigo-400 bg-indigo-50/30" : ""}`}
          style={{ borderColor: dragOver ? undefined : "var(--color-card-border)", background: "var(--color-card)" }}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => { const selected = Array.from(e.target.files || []); setFiles((prev) => [...prev, ...selected]); }}
          />
          <span className="text-4xl">📸</span>
          <h3 className="mt-4 text-lg font-semibold" style={{ color: "var(--color-foreground)" }}>
            {locale === "zh" ? "拖拽或点击上传商品照片" : "Drag & drop or click to upload"}
          </h3>
          <p className="mt-2 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
            {locale === "zh" ? "支持 JPG、PNG、WebP，任意角度和光线均可" : "Supports JPG, PNG, WebP — any angle, any lighting"}
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--color-foreground)" }}>
              {locale === "zh" ? "已上传" : "Uploaded"} ({files.length})
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {files.map((file, i) => (
                <div key={`${file.name}-${i}`} className="group relative overflow-hidden rounded-xl border" style={{ borderColor: "var(--color-card-border)" }}>
                  <img src={URL.createObjectURL(file)} alt={file.name} className="aspect-square w-full object-cover" />
                  <button onClick={() => removeFile(i)} className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">✕</button>
                  <p className="truncate p-2 text-xs" style={{ color: "var(--color-muted-foreground)" }}>{file.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--color-foreground)" }}>
              {locale === "zh" ? "选择输出方向" : "Choose output direction"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: "🖼️", title: locale === "zh" ? "电商主图" : "Hero Image", desc: locale === "zh" ? "适配各平台尺寸规范" : "Platform-optimized" },
                { icon: "📋", title: locale === "zh" ? "详情页" : "Detail Page", desc: locale === "zh" ? "多模块批量生成" : "Multi-module batch" },
                { icon: "🎬", title: locale === "zh" ? "商品视频" : "Product Video", desc: locale === "zh" ? "Seedance 2.0" : "Seedance 2.0" },
              ].map((opt) => (
                <button
                  key={opt.title}
                  className="rounded-[1.25rem] border p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{ borderColor: "var(--color-card-border)", background: "var(--color-card)" }}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <h3 className="mt-3 text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>{opt.title}</h3>
                  <p className="mt-1 text-xs" style={{ color: "var(--color-muted-foreground)" }}>{opt.desc}</p>
                </button>
              ))}
            </div>
            <button
              className="mt-8 w-full rounded-xl py-4 text-sm font-semibold shadow-lg transition-all hover:-translate-y-px hover:shadow-xl press-scale"
              style={{ background: "var(--color-cta-bg)", color: "var(--color-cta-text)" }}
              onClick={() => alert(locale === "zh" ? "AI 生图功能即将上线！" : "AI image generation coming soon!")}
            >
              {locale === "zh" ? "开始生成 →" : "Generate →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
