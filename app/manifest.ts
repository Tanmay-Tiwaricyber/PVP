import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tanmay Tiwari — Silent Programmer",
    short_name: "Tanmay Tiwari",
    description: "Full-stack engineer & cybersecurity builder. Selected work, craft and contact.",
    start_url: "/",
    display: "standalone",
    background_color: "#07070a",
    theme_color: "#07070a",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
