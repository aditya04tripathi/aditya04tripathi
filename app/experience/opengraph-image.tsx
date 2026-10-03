import { ImageResponse } from "next/og"
import SocialImage, { socialImageSize } from "@/components/seo/SocialImage"

export const alt =
  "Aditya Tripathi — Software engineering experience and technical leadership"
export const size = socialImageSize
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <SocialImage
      title="Engineering experience"
      subtitle="From building to taking ownership"
      technology={["Frontend", "Full-stack", "Mobile", "Technical leadership"]}
      index="03"
    />,
    size
  )
}
