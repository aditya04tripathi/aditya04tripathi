import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"
import SocialImage, { socialImageSize } from "@/components/seo/SocialImage"
import { profile } from "@/data/portfolio"
import { articles } from "@/data/writing"

export const alt = "Technical article by Aditya Tripathi"
export const size = socialImageSize
export const contentType = "image/png"

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)
  if (!article) notFound()

  return new ImageResponse(
    <SocialImage
      title={article.title}
      subtitle="Writing / Engineering notes"
      technology={[profile.name, "Original technical writing"]}
      index={String(articles.indexOf(article) + 1).padStart(2, "0")}
    />,
    size
  )
}
