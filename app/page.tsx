import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EducationSection } from "@/components/sections/education-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { WhyChooseSection } from "@/components/sections/why-choose-section";
import { WorkExperienceSection } from "@/components/sections/work-experience-section";
import { Separator } from "@/components/ui/separator";
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

export default function AboutPage() {
	return (
		<div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
			<HeroSection />
			<SectionDivider />

			<AboutSection />
			<SectionDivider />

			<EducationSection />
			<SectionDivider />

			<WorkExperienceSection />
			<SectionDivider />

			<SkillsSection />
			<SectionDivider />

			<ProjectsSection />
			<SectionDivider />

			<WhyChooseSection />
			<SectionDivider />

			<FAQSection />
			<SectionDivider />

			<FinalCtaSection />
		</div>
	);
}

function SectionDivider() {
	return <Separator className="my-8 sm:my-10 md:my-12" />;
}
