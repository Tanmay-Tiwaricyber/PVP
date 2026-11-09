import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import Cursor from "@/components/cursor";
import Preloader from "@/components/preloader";
import Grain from "@/components/grain";
import MotionProvider from "@/components/motion-provider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://tanmaytiwari.vercel.app",
  ),
  title: {
    default: "Tanmay Tiwari — Silent Programmer",
    template: "%s — Tanmay Tiwari",
  },
  description:
    "Tanmay Tiwari is a full-stack engineer and cybersecurity builder in Kanpur, India. 175 public repositories, 435 stars, shipped work in AI tooling, systems and interface design.",
  keywords: [
    "Tanmay Tiwari",
    "Silent Programmer",
    "portfolio",
    "full stack developer Kanpur",
    "cybersecurity engineer India",
    "Next.js portfolio",
    "open source developer",
  ],
  authors: [{ name: "Tanmay Tiwari", url: "https://github.com/Tanmay-Tiwaricyber" }],
  creator: "Tanmay Tiwari",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Tanmay Tiwari",
    title: "Tanmay Tiwari — Silent Programmer",
    description:
      "Full-stack engineer & cybersecurity builder. AI tooling, systems, and interfaces with a point of view.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanmay Tiwari — Silent Programmer",
    description: "Full-stack engineer & cybersecurity builder. Interfaces with a point of view.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MotionProvider>
          <Grain />
          <Cursor />
          <SmoothScroll />
          <Preloader />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
