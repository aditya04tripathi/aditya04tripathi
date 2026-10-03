import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { seo } from "@/data/seo"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: { default: seo.title, template: "%s | Aditya Tripathi" },
  description: seo.description,
  alternates: { canonical: "/" },
  authors: [{ name: "Aditya Tripathi", url: seo.url }],
  creator: "Aditya Tripathi",
  category: "Software Engineering",
  openGraph: {
    type: "website",
    url: seo.url,
    siteName: "Aditya Tripathi",
    title: seo.title,
    description: seo.description,
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
      {process.env.NODE_ENV === "production" &&
        measurementId &&
        /^G-[A-Z0-9]+$/.test(measurementId) && (
          <GoogleAnalytics gaId={measurementId} />
        )}
    </html>
  )
}
