import { ImageResponse } from "next/og"
import SocialImage, { socialImageSize } from "@/components/seo/SocialImage"
import { profile } from "@/data/portfolio"

export const alt =
  "Contact Aditya Tripathi — Build systems, ship products, solve hard problems"
export const size = socialImageSize
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <SocialImage
      title="The next system"
      subtitle={`Contact / ${profile.name}`}
      technology={["Build systems", "Ship products", "Solve hard problems"]}
      index="06"
    />,
    size
  )
}
