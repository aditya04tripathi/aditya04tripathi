import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "play-lh.googleusercontent.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
