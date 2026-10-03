import { ImageResponse } from "next/og"
import SocialImage, { socialImageSize } from "@/components/seo/SocialImage"
import { profile } from "@/data/portfolio"

export const alt =
  "Aditya Tripathi, Software Engineer in Melbourne — engineering journey"
export const size = socialImageSize
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <SocialImage
      title={profile.name}
      subtitle={profile.role}
      technology={["Full-stack", "Cloud", "AI", "Systems"]}
    />,
    size
  )
}
