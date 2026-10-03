import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"
import SocialImage, { socialImageSize } from "@/components/seo/SocialImage"
import { projects } from "@/data/portfolio"

export const alt =
  "Engineering project by Aditya Tripathi — system architecture and technology"
export const size = socialImageSize
export const contentType = "image/png"

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) notFound()

  return new ImageResponse(
    <SocialImage
      title={project.title}
      subtitle={project.category}
      technology={project.technology}
      index={String(projects.indexOf(project) + 1).padStart(2, "0")}
    />,
    size
  )
}
