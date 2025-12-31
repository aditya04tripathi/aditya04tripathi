import { ArrowLeftIcon, ExternalLinkIcon, GithubIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import slugify from "slugify";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CREATOR_INFO, PROJECTS, SITE_CONFIG } from "@/lib/constants";
import { SiteHeader } from "@/components/layout/site-header";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const project = PROJECTS.find((p) => p.slug === slug);

	if (!project) {
		return {
			title: "Project Not Found",
		};
	}

	return {
		metadataBase: new URL(SITE_CONFIG.url),
		title: `${project.name} | ${CREATOR_INFO.name}`,
		description: `${project.description} Built with ${project.technologies.join(", ")}.`,
		openGraph: {
			title: `${project.name} | ${CREATOR_INFO.name}`,
			description: project.description,
			images: project.image
				? [`${SITE_CONFIG.url}${project.image}`]
				: [`${SITE_CONFIG.url}${CREATOR_INFO.ogImage}`],
			type: "article",
		},
		twitter: {
			card: "summary_large_image",
			title: `${project.name} | ${CREATOR_INFO.name}`,
			description: project.description,
			images: project.image
				? [`${SITE_CONFIG.url}${project.image}`]
				: [`${SITE_CONFIG.url}${CREATOR_INFO.ogImage}`],
		},
	};
}

import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

// ... (keep imports)

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const project = PROJECTS.find((p) => p.slug === slug);

	if (!project) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl pt-32 sm:pt-28">
            <SiteHeader />
			<FadeIn>
				<Link href="/projects" className="inline-block mb-6">
					<Button variant="ghost" className="font-mono text-xs text-muted-foreground hover:text-foreground pl-0 hover:pl-2 transition-all">
						<ArrowLeftIcon className="size-3 mr-2" />
						../back_to_archive
					</Button>
				</Link>
			</FadeIn>

			{/* Project Header */}
			<FadeIn className="mb-8 sm:mb-10 md:mb-12">
				<h1 className="type-h1 mb-4">
					{project.name}
				</h1>
				<p className="type-body text-muted-foreground leading-relaxed">
					{project.description}
				</p>
			</FadeIn>

			{/* Project Image */}
			{project.image && (
				<FadeIn className="mb-8 sm:mb-10 md:mb-12 rounded-sm overflow-hidden border bg-muted">
					<Image
						src={project.image}
						alt={project.name}
						width={1200}
						height={630}
						className="w-full h-auto object-cover"
						priority
					/>
				</FadeIn>
			)}

			{/* Action Buttons */}
			<FadeIn className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-10">
				{project.link && (
					<Link
						href={project.link}
						target="_blank"
						rel="noopener noreferrer"
						className="w-full sm:w-auto"
					>
						<Button className="w-full sm:w-auto">
							<ExternalLinkIcon className="size-4 mr-2" />
							View Live Project
						</Button>
					</Link>
				)}
				<Link
					href={project.github}
					target="_blank"
					rel="noopener noreferrer"
					className="w-full sm:w-auto"
				>
					<Button variant="outline" className="w-full sm:w-auto">
						<GithubIcon className="size-4 mr-2" />
						View on GitHub
					</Button>
				</Link>
			</FadeIn>

			<Separator className="my-8 sm:my-10 md:my-12" />

			{/* Technologies Section */}
			<FadeIn className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
				<h2 className="font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl">
					Technologies Used
				</h2>
				<div className="flex flex-wrap gap-2">
					{project.technologies.map((tech) => (
						<Badge key={tech} variant="default" className="text-xs px-2.5 py-1">
							{tech}
						</Badge>
					))}
				</div>
			</FadeIn>

			<Separator className="my-8 sm:my-10 md:my-12" />

			{/* Problem Statement */}
			<FadeIn className="space-y-4 mb-8 sm:mb-10 md:mb-12">
				<h2 className="font-mono font-bold tracking-tight text-2xl text-primary">
					// Problem_Statement
				</h2>
				<p className="text-muted-foreground leading-relaxed text-base sm:text-lg border-l-2 border-primary/20 pl-4">
					{project.problem}
				</p>
			</FadeIn>

			<Separator className="my-8 sm:my-10 md:my-12" />

			{/* Architecture */}
			<FadeIn className="space-y-4 mb-8 sm:mb-10 md:mb-12">
				<h2 className="font-mono font-bold tracking-tight text-2xl text-primary">
					// System_Architecture
				</h2>
				<p className="text-muted-foreground leading-relaxed text-base sm:text-lg border-l-2 border-primary/20 pl-4">
					{project.architecture}
				</p>
			</FadeIn>

			<Separator className="my-8 sm:my-10 md:my-12" />

			{/* Outcome */}
			<FadeIn className="space-y-4 mb-8 sm:mb-10 md:mb-12">
				<h2 className="font-mono font-bold tracking-tight text-2xl text-primary">
					// Outcome_&_Impact
				</h2>
				<div className="bg-secondary/10 p-6 rounded-lg border border-primary/10">
					<p className="text-foreground font-medium leading-relaxed text-base sm:text-lg">
						{">"} {project.outcome}
					</p>
				</div>
			</FadeIn>

			<Separator className="my-8 sm:my-10 md:my-12" />

			{/* Call to Action */}
			<FadeIn className="text-center space-y-5 sm:space-y-6 py-6 sm:py-8">
				<div>
					<h2 className="font-bold tracking-tight mb-2 text-2xl sm:text-3xl md:text-4xl">
						Interested in Working Together?
					</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-4">
						I&apos;m always open to discussing new projects, creative ideas, or
						opportunities to be part of your vision.
					</p>
				</div>
				<div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
					<Link href="/" className="w-full sm:w-auto">
						<Button variant="outline" className="w-full sm:w-auto">
							<ArrowLeftIcon className="size-4 mr-2" />
							Back to Portfolio
						</Button>
					</Link>
				</div>
			</FadeIn>
		</div>
	);
}
