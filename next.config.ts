import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/scam-shield",
        destination: "/projects/scamshield",
        permanent: true,
      },
      {
        source: "/projects/gnosis",
        destination: "/projects/gnosis-ai",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
