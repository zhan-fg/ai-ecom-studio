"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function siteUrl(locale: string) {
  return `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${locale}`;
}

async function getSupabase() {
  try {
    return await createClient();
  } catch {
    return null;
  }
}

// ── 邮箱 + 密码 注册 ──
export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const locale = formData.get("locale") as string;

  if (!email || !password) return { error: "Email and password are required" };
  if (password.length < 6) return { error: "Password must be at least 6 characters" };

  const supabase = await getSupabase();
  if (!supabase) return { error: "Auth service not configured. Please add Supabase environment variables." };

  const { error } = await supabase.auth.signUp({
    email, password,
    options: { emailRedirectTo: `${siteUrl(locale)}/ecom-studio` },
  });

  if (error) return { error: error.message };
  return { success: true, message: "Check your email to confirm your account" };
}

// ── 邮箱 + 密码 登录 ──
export async function signInWithPassword(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) return { error: "Email and password are required" };

  const supabase = await getSupabase();
  if (!supabase) return { error: "Auth service not configured." };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

// ── Magic link ──
export async function signInWithMagicLink(formData: FormData) {
  const email = formData.get("email") as string;
  const locale = formData.get("locale") as string;
  if (!email) return { error: "Email is required" };

  const supabase = await getSupabase();
  if (!supabase) return { error: "Auth service not configured." };

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${siteUrl(locale)}/ecom-studio` },
  });
  if (error) return { error: error.message };
  return { success: true, message: "Magic link sent — check your inbox" };
}

// ── Google ──
export async function signInWithGoogle(locale: string) {
  const supabase = await getSupabase();
  if (!supabase) return { error: "Auth service not configured." };
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${siteUrl(locale)}/ecom-studio` },
  });
  if (error) return { error: error.message };
  if (data.url) redirect(data.url);
}

// ── GitHub ──
export async function signInWithGitHub(locale: string) {
  const supabase = await getSupabase();
  if (!supabase) return { error: "Auth service not configured." };
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: `${siteUrl(locale)}/ecom-studio` },
  });
  if (error) return { error: error.message };
  if (data.url) redirect(data.url);
}

// ── 退出 ──
export async function signOut() {
  const supabase = await getSupabase();
  if (supabase) await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
