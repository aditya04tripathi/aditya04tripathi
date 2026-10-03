import { ImageResponse } from "next/og"
import { shareColors } from "@/data/seo"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: shareColors.background,
        color: shareColors.text,
        fontSize: 76,
        fontWeight: 700,
        letterSpacing: -5,
      }}
    >
      AT<span style={{ color: shareColors.accent }}>.</span>
    </div>,
    size
  )
}
