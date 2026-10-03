import { profile } from "@/data/portfolio"
import { shareColors } from "@/data/seo"

export const socialImageSize = { width: 1200, height: 630 }

export default function SocialImage({
  title,
  subtitle,
  technology,
  index = "00",
}: {
  title: string
  subtitle: string
  technology: string[]
  index?: string
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "54px 64px",
        background: shareColors.background,
        color: shareColors.text,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ fontSize: 34, fontWeight: 700 }}>AT.</span>
          <span
            style={{
              fontSize: 15,
              letterSpacing: 3,
              color: shareColors.secondaryText,
            }}
          >
            ENGINEERING JOURNEY
          </span>
        </div>
        <span style={{ fontSize: 18, color: shareColors.secondaryText }}>
          {index} / SYSTEM
        </span>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 140,
          right: 42,
          width: 390,
          height: 340,
        }}
      >
        <svg width="390" height="340" viewBox="0 0 390 340">
          <circle
            cx="197"
            cy="167"
            r="125"
            fill="none"
            stroke={shareColors.border}
          />
          <ellipse
            cx="197"
            cy="167"
            rx="164"
            ry="69"
            transform="rotate(-34 197 167)"
            fill="none"
            stroke={shareColors.orbit}
            strokeWidth="2"
          />
          <path
            d="M70 210 197 167 323 76M126 57 197 167 271 274M46 121 197 167 346 225"
            fill="none"
            stroke={shareColors.line}
            strokeWidth="2"
          />
          <path
            d="m197 121 40 23v46l-40 23-40-23v-46z"
            fill={shareColors.core}
            stroke={shareColors.highlight}
            strokeWidth="3"
          />
          <path
            d="m157 144 40 23 40-23m-40 23v46"
            fill="none"
            stroke={shareColors.primary}
          />
          <circle cx="70" cy="210" r="7" fill={shareColors.cyan} />
          <circle cx="323" cy="76" r="7" fill={shareColors.primary} />
          <circle cx="126" cy="57" r="5" fill={shareColors.secondaryText} />
          <circle cx="271" cy="274" r="6" fill={shareColors.signal} />
          <circle cx="46" cy="121" r="4" fill={shareColors.secondaryText} />
          <circle cx="346" cy="225" r="5" fill={shareColors.primary} />
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: 735 }}>
        <span
          style={{
            fontSize: 17,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: shareColors.accent,
            marginBottom: 24,
          }}
        >
          {subtitle}
        </span>
        <span
          style={{
            fontSize: title.length > 22 ? 72 : 94,
            fontWeight: 700,
            lineHeight: 1.03,
            letterSpacing: -4,
            maxWidth: 760,
          }}
        >
          {title}
        </span>
        <span
          style={{
            display: "flex",
            fontSize: 19,
            color: shareColors.mutedText,
            marginTop: 30,
          }}
        >
          {technology.slice(0, 5).join("  ·  ")}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 24,
          borderTop: `1px solid ${shareColors.border}`,
          fontSize: 17,
          color: shareColors.secondaryText,
        }}
      >
        <span>
          {profile.name} · {profile.location}
        </span>
        <span>adityatripathi.dev</span>
      </div>
    </div>
  )
}
