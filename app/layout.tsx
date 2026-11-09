import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import Grain from "@/components/grain";
import MotionProvider from "@/components/motion-provider";
import Doodle from "@/components/doodle";
import Cursor from "@/components/machine/cursor";
import Binding from "@/components/binding";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tanmay-portfolio-mu.vercel.app"),
  title: {
    default: "Tanmay Tiwari — Silent Programmer",
    template: "%s — Tanmay Tiwari",
  },
  description:
    "Tanmay Tiwari is a full-stack engineer and security builder in Kanpur, India. 175 public repositories, top 1% on TryHackMe, and work spanning native systems, AI tooling and interface design.",
  keywords: [
    "Tanmay Tiwari",
    "Silent Programmer",
    "portfolio",
    "full stack developer Kanpur",
    "cybersecurity engineer India",
    "TryHackMe top 1%",
    "Next.js portfolio",
    "open source developer",
  ],
  authors: [{ name: "Tanmay Tiwari", url: "https://github.com/Tanmay-Tiwaricyber" }],
  creator: "Tanmay Tiwari",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Tanmay Tiwari",
    title: "Tanmay Tiwari — Silent Programmer",
    description:
      "Full-stack engineer & security builder. Top 1% on TryHackMe. Native systems, AI tooling, interfaces with a point of view.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanmay Tiwari — Silent Programmer",
    description: "Full-stack engineer & security builder. Top 1% on TryHackMe.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#05070a" },
    { media: "(prefers-color-scheme: dark)", color: "#05070a" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before paint: no flash of the wrong theme.
 * Paper is the default — the volume is designed on paper first — and only an
 * explicit choice by the visitor switches it to Ink.
 */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t='dark';}var r=document.documentElement;r.dataset.theme=t;r.classList.toggle('dark',t==='dark');r.dataset.intro='done';r.classList.toggle('machine',t==='dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark machine" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <MotionProvider>
          <Doodle />
          <Cursor />
          <Grain />
          <Binding />
          <SmoothScroll />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
