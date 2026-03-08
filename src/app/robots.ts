import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/*.json$", "/*.map$"],
      },
    ],
    sitemap: "https://www.dsc-utp.site/sitemap.xml",
  };
}
