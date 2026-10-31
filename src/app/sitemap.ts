import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(site.lastUpdated),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
