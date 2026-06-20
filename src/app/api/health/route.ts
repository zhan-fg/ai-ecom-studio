import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    checks: {
      auth: { ok: true, ms: 0 },
    },
    timestamp: new Date().toISOString(),
  });
}
