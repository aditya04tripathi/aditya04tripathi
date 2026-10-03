import type { MetadataRoute } from "next"
import { projects } from "@/data/portfolio"
import { articles } from "@/data/writing"
import { seo } from "@/data/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/experience",
    "/education",
    "/contact",
  ]

  return [
    ...routes.map((path) => ({
      url: `${seo.url}${path}`,
      priority: path === "" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${seo.url}/projects/${project.slug}`,
      priority: 0.9,
    })),
    ...articles.map((article) => ({
      url: `${seo.url}/blog/${article.slug}`,
      priority: 0.7,
    })),
  ]
}
