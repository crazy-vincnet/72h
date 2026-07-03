import type { MetadataRoute } from "next";

const BASE_URL = "https://7zh8h5k3.insforge.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/schedule", "/vision", "/prayer-guide", "/register"];
  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
