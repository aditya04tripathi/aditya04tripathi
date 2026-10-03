import { ImageResponse } from "next/og"
import SocialImage, { socialImageSize } from "@/components/seo/SocialImage"
import { profile } from "@/data/portfolio"

export const alt =
  "About Aditya Tripathi — Software Engineer, Melbourne, Australia"
export const size = socialImageSize
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <SocialImage
      title={profile.name}
      subtitle="Profile / Software Engineer"
      technology={["Interfaces", "APIs", "Data", "Infrastructure", "AI"]}
      index="01"
    />,
    size
  )
}
