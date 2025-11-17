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

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const project = PROJECTS.find((p) => slugify(p.name).toLowerCase() === slug);

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

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const project = PROJECTS.find((p) => slugify(p.name).toLowerCase() === slug);

	if (!project) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
			<Link href="/" className="inline-block mb-6">
				<Button variant="ghost">
					<ArrowLeftIcon className="size-4 mr-2" />
					Back to Home
				</Button>
			</Link>

			{/* Project Header */}
			<div className="mb-8 sm:mb-10 md:mb-12">
				<h1 className="font-bold tracking-tight mb-4 text-3xl sm:text-4xl md:text-5xl">
					{project.name}
				</h1>
				<p className="text-sm sm:text-xl text-muted-foreground leading-relaxed">
					{project.description}
				</p>
			</div>

			{/* Project Image */}
			{project.image && (
				<div className="mb-8 sm:mb-10 md:mb-12 rounded-sm overflow-hidden border bg-muted">
					<Image
						src={project.image}
						alt={project.name}
						width={1200}
						height={630}
						className="w-full h-auto object-cover"
						priority
					/>
				</div>
			)}

			{/* Action Buttons */}
			<div className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-10">
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
			</div>

			<Separator className="my-8 sm:my-10 md:my-12" />

			{/* Technologies Section */}
			<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
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
			</section>

			<Separator className="my-8 sm:my-10 md:my-12" />

			{/* Key Features Section */}
			{project.features && project.features.length > 0 && (
				<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
					<h2 className="font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl">
						Key Features
					</h2>
					<ul className="list-disc list-inside space-y-3 text-muted-foreground text-base sm:text-sm">
						{project.features.map((feature, index) => (
							<li key={index}>{feature}</li>
						))}
					</ul>
				</section>
			)}

			{project.features && project.features.length > 0 && (
				<Separator className="my-8 sm:my-10 md:my-12" />
			)}

			{/* Technical Highlights Section */}
			{project.technicalHighlights &&
				project.technicalHighlights.length > 0 && (
					<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
						<h2 className="font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl">
							Technical Highlights
						</h2>
						<div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
							{project.technicalHighlights.map((highlight, index) => (
								<p key={index}>
									<strong className="text-foreground">
										{highlight.title}:
									</strong>{" "}
									{highlight.description}
								</p>
							))}
						</div>
					</section>
				)}

			<Separator className="my-8 sm:my-10 md:my-12" />

			{/* Call to Action */}
			<section className="text-center space-y-5 sm:space-y-6 py-6 sm:py-8">
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
			</section>
		</div>
	);
}
