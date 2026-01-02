import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CREATOR_INFO, SITE_CONFIG } from "@/lib/constants";
import { Providers } from "@/components/providers";

const googleSansCode = JetBrains_Mono({
	variable: "--font-google-sans-code",
	weight: ["300", "400", "500", "600", "700", "800"],
	subsets: ["latin"],
});

const googleSans = Inter({
	variable: "--font-google-sans",
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE_CONFIG.url),
	title: `${CREATOR_INFO.name} | Full-Stack Developer Portfolio`,
	description:
		"Full-stack developer specializing in Next.js, React, TypeScript, and MongoDB. Explore my projects and experience.",
	openGraph: {
		url: SITE_CONFIG.url,
		type: "website",
		title: `${CREATOR_INFO.name} | Full-Stack Developer Portfolio`,
		description:
			"Full-stack developer specializing in Next.js, React, TypeScript, and MongoDB. Explore my projects and experience.",
		images: [
			{
				url: `${SITE_CONFIG.url}${CREATOR_INFO.ogImage}`,
				width: 1200,
				height: 630,
				alt: `${CREATOR_INFO.name} - Full-Stack Developer`,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${CREATOR_INFO.name} | Full-Stack Developer Portfolio`,
		description:
			"Full-stack developer specializing in Next.js, React, TypeScript, and MongoDB. Explore my projects and experience.",
		images: [`${SITE_CONFIG.url}${CREATOR_INFO.ogImage}`],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${googleSans.variable} ${googleSansCode.variable} antialiased`}
			>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
