import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://rodri-roots-tattoo-conceito.vercel.app/sitemap.xml",
    host: "https://rodri-roots-tattoo-conceito.vercel.app",
  };
}
