import { MetadataRoute } from "next";
import { departments } from "@/data/departments";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.dsc-utp.site";
  const lastModified = new Date("2026-03-08");

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...departments.map((department) => ({
      url: `${baseUrl}/departamentos/${department.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
