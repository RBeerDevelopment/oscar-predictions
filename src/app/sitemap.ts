import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.oscar-predictions.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.oscar-predictions.com/imprint",
      lastModified: new Date("2025-01-26"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
