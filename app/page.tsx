import type { Metadata } from "next";
import { EducationSection } from "@/components/sections/education-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { WorkExperienceSection } from "@/components/sections/work-experience-section";
import { SectionDivider } from "@/components/ui/section-divider";
import { CREATOR_INFO, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
	title: `${CREATOR_INFO.name} | Full-Stack Developer Portfolio`,
	description: `Full-stack developer specializing in Next.js, React, TypeScript, and MongoDB. Explore my projects and experience.`,
	keywords: [
		CREATOR_INFO.name,
		"Software Engineer",
		"Full-Stack Developer",
		"Next.js Developer",
		"React Developer",
		"TypeScript",
		"MongoDB",
		"Web Development",
		"Portfolio",
		"Monash University",
		"Melbourne Developer",
		"Australia",
	],
	authors: [{ name: CREATOR_INFO.name, url: CREATOR_INFO.github }],
	creator: CREATOR_INFO.name,
	publisher: CREATOR_INFO.name,
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL(SITE_CONFIG.url),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: SITE_CONFIG.url,
		title: `${CREATOR_INFO.name} | Full-Stack Developer Portfolio`,
		description: `Full-stack developer specializing in Next.js, React, TypeScript, and MongoDB. Explore my projects and experience.`,
		siteName: SITE_CONFIG.name,
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
		description: `Full-stack developer specializing in Next.js, React, TypeScript, and MongoDB. Explore my projects and experience.`,
		images: [`${SITE_CONFIG.url}${CREATOR_INFO.ogImage}`],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

import { EngineeringSection } from "@/components/sections/engineering-section";

import { FadeIn } from "@/components/ui/fade-in";

export default function AboutPage() {
	return (
		<div className="container mx-auto px-4 sm:px-6 max-w-4xl">
			<HeroSection />

			<FadeIn>
				<ProjectsSection limit={1} />
			</FadeIn>

			<FadeIn>
				<EngineeringSection />
			</FadeIn>

			<FadeIn>
				<SkillsSection />
			</FadeIn>
			<SectionDivider />

			<FadeIn>
				<WorkExperienceSection />
			</FadeIn>
			<SectionDivider />

			<FadeIn>
				<EducationSection />
			</FadeIn>
			<SectionDivider />

			<FadeIn>
				<FinalCtaSection />
			</FadeIn>
		</div>
	);
}
