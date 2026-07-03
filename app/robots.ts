import type { MetadataRoute } from "next";

const BASE_URL = "https://7zh8h5k3.insforge.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The registration API is not a crawlable page.
      disallow: "/api/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
