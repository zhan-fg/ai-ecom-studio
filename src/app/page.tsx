"use client";

import { useEffect } from "react";

function getLocale(): string {
  if (typeof window === "undefined") return "en";
  // Check cookie first
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("NEXT_LOCALE="))
    ?.split("=")[1];
  if (cookie === "en" || cookie === "zh") return cookie;
  // Check browser language
  if (navigator.language.includes("zh")) return "zh";
  return "en";
}

export default function Home() {
  useEffect(() => {
    const locale = getLocale();
    window.location.replace(`/${locale}`);
  }, []);

  return null;
}
