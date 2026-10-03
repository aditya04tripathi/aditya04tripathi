import type { MetadataRoute } from "next"
import { seo, shareColors } from "@/data/seo"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seo.title,
    short_name: "Aditya Tripathi",
    description: seo.description,
    start_url: "/",
    display: "browser",
    background_color: shareColors.background,
    theme_color: shareColors.background,
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  }
}
