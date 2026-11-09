import type { NextConfig } from "next";

/**
 * Two deployment modes:
 *  - default  → Node/Vercel runtime (`next build` / `next start`)
 *  - STATIC_EXPORT=1 → fully static `out/` folder (GitHub Pages, Netlify, any CDN)
 */
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: isStatic,
    remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }],
  },
  ...(isStatic ? { output: "export" as const, trailingSlash: true } : {}),
  async headers() {
    if (isStatic) return [];
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
