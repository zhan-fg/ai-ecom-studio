import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
      style={{ background: "var(--color-background)" }}
    >
      <span className="text-6xl">🔍</span>
      <h1
        className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-foreground)",
        }}
      >
        404 — Page Not Found
      </h1>
      <p
        className="mt-4 max-w-md text-base leading-relaxed"
        style={{ color: "var(--color-muted-foreground)" }}
      >
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center rounded-xl px-8 text-sm font-semibold shadow-lg transition-all hover:-translate-y-px hover:shadow-xl"
        style={{
          background: "var(--color-cta-bg)",
          color: "var(--color-cta-text)",
        }}
      >
        Go home
      </Link>
    </div>
  );
}
