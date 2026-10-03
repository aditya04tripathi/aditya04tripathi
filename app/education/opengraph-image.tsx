import { ImageResponse } from "next/og"
import SocialImage, { socialImageSize } from "@/components/seo/SocialImage"

export const alt =
  "Aditya Tripathi — Education journey, foundations and progression"
export const size = socialImageSize
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <SocialImage
      title="From learning to building"
      subtitle="Education / Foundations & progression"
      technology={["Monash University", "Amity University", "Manav Rachna"]}
      index="05"
    />,
    size
  )
}
