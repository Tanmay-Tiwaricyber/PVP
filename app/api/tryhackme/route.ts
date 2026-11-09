import { NextResponse } from "next/server";

/**
 * Thin, cached proxy for the public TryHackMe profile endpoint.
 * Server-side keeps CORS out of the browser and makes the username swappable.
 * Not available in the static export (STATIC_EXPORT=1) — the UI degrades to a link.
 */
export const revalidate = 3600;

const USERNAME = /^[A-Za-z0-9_.-]{2,40}$/;

export async function GET(request: Request) {
  // Static export has no server: keep the build green, let the UI fall back.
  if (process.env.STATIC_EXPORT === "1") {
    return NextResponse.json({ error: "static_export" }, { status: 501 });
  }

  const user = new URL(request.url).searchParams.get("u") ?? process.env.THM_USERNAME ?? "";

  if (!USERNAME.test(user)) {
    return NextResponse.json({ error: "invalid_username" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://tryhackme.com/api/v2/public-profile?username=${user}`, {
      headers: {
        accept: "application/json",
        "user-agent": "portfolio/1.0",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const json = (await res.json()) as { data?: Record<string, unknown> };
    const data = json?.data ?? {};

    return NextResponse.json(
      {
        score: typeof data.rankTotalScore === "number" ? data.rankTotalScore : undefined,
        rank: typeof data.rankTitle === "string" ? data.rankTitle : undefined,
        rooms: typeof data.badgesNumber === "number" ? data.badgesNumber : 0,
        topPercentage: data.topPercentage,
      },
      { headers: { "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch {
    return NextResponse.json({ error: "upstream_unavailable" }, { status: 502 });
  }
}
