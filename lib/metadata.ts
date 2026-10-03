import type { Metadata } from "next"
import { profile } from "@/data/portfolio"
import { seo } from "@/data/seo"

export function metadataFor(
  title: string,
  description: string,
  path: string
): Metadata {
  const url = new URL(path, seo.url).toString()
  const socialTitle = title.includes(profile.name)
    ? title
    : `${title} | ${profile.name}`

  return {
    title: title.includes(profile.name) ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: socialTitle,
      description,
      siteName: `${profile.name} — ${profile.role}`,
      locale: "en_AU",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  }
}
