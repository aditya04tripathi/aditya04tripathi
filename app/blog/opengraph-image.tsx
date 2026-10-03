import { ImageResponse } from "next/og"
import SocialImage, { socialImageSize } from "@/components/seo/SocialImage"
import { profile } from "@/data/portfolio"

export const alt = "Original engineering writing by Aditya Tripathi"
export const size = socialImageSize
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <SocialImage
      title="Engineering notes"
      subtitle={`Writing / ${profile.name}`}
      technology={["Software", "Architecture", "Ideas", "Experiments"]}
      index="07"
    />,
    size
  )
}
