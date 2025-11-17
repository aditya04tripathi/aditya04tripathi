import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { CREATOR_INFO, SITE_CONFIG } from "@/lib/constants";
import LoadingComponent from "./loading";

const nunitoNunito_Sans = Nunito_Sans({
	variable: "--font-nunito-sans",
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
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
			<body className={`dark ${nunitoNunito_Sans.variable} antialiased`}>
				<Suspense fallback={<LoadingComponent />}>{children}</Suspense>
			</body>
		</html>
	);
}
