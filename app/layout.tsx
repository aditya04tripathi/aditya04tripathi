import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { CREATOR_INFO, SITE_CONFIG } from "@/lib/constants";
import LoadingComponent from "./loading";

const googleSansCode = Google_Sans_Code({
	variable: "--font-google-sans-code",
	weight: ["300", "400", "500", "600", "700", "800"],
});

const googleSans = Google_Sans({
	variable: "--font-google-sans",
	weight: ["400", "500", "600", "700"],
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
				className={`dark ${googleSans.variable} ${googleSansCode.variable} antialiased`}
			>
				<Suspense fallback={<LoadingComponent />}>{children}</Suspense>
				<Toaster />
			</body>
		</html>
	);
}
