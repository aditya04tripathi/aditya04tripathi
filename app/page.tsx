import {
	BriefcaseIcon,
	ClockIcon,
	CodeIcon,
	FolderIcon,
	GithubIcon,
	GraduationCapIcon,
	LinkedinIcon,
	MailIcon,
	MapPinIcon,
	ShieldCheckIcon,
	SparklesIcon,
	TargetIcon,
	UsersIcon,
	ZapIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	CREATOR_INFO,
	EDUCATION,
	PROJECTS,
	SKILLS,
	SITE_CONFIG,
	WORK_EXPERIENCE,
} from "@/lib/constants";

export const metadata: Metadata = {
	title: `${CREATOR_INFO.name} | Full-Stack Developer & Software Engineer`,
	description: `Full-stack developer specializing in Next.js, React, TypeScript, and MongoDB. Software Engineering student at Monash University. View my portfolio and projects.`,
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
				url: CREATOR_INFO.ogImage,
				width: 1200,
				height: 630,
				alt: `${CREATOR_INFO.name} - Full-Stack Developer`,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${CREATOR_INFO.name} | Full-Stack Developer`,
		description: `Full-stack developer specializing in Next.js, React, TypeScript, and MongoDB. View my portfolio and projects.`,
		images: [CREATOR_INFO.ogImage],
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
			<div className="mb-8 sm:mb-10 md:mb-12">
				<div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
					<Avatar className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48">
						<AvatarImage src={CREATOR_INFO.avatar} />
						<AvatarFallback>
							{CREATOR_INFO.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>

					<div className="flex-1 space-y-3 sm:space-y-4 text-center md:text-left">
						<div>
							<h1 className="font-bold tracking-tight mb-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
								{CREATOR_INFO.name}
							</h1>
							<p className="text-lg sm:text-xl text-muted-foreground">
								{CREATOR_INFO.title}
							</p>
						</div>

						<div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<MapPinIcon className="size-4" />
								<span>{CREATOR_INFO.location}</span>
							</div>
							<div className="flex items-center gap-2">
								<MailIcon className="size-4" />
								<Link
									href={`mailto:${CREATOR_INFO.email}`}
									className="hover:text-foreground transition-colors"
								>
									{CREATOR_INFO.email}
								</Link>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
							<Link
								href={CREATOR_INFO.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full sm:w-auto"
							>
								<Button variant="outline" className="w-full sm:w-auto">
									<LinkedinIcon className="size-4 mr-2" />
									LinkedIn
								</Button>
							</Link>
							<Link
								href={CREATOR_INFO.github}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full sm:w-auto"
							>
								<Button variant="outline" className="w-full sm:w-auto">
									<GithubIcon className="size-4 mr-2" />
									GitHub
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<Separator className="my-8 sm:my-10 md:my-12" />

			<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
				<h2 className="font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl">
					About Me
				</h2>
				<div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
					<p>{CREATOR_INFO.bio}</p>
					<p>
						I&apos;m currently seeking software engineering opportunities while
						continuing my studies at Monash University. I bring a unique
						perspective from diverse work experience, focusing on user
						experience and practical problem-solving. I believe in continuous
						learning, writing clean code, and building applications that solve
						real problems.
					</p>
				</div>
			</section>

			<Separator className="my-8 sm:my-10 md:my-12" />

			<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
				<h2 className="font-bold tracking-tight flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl">
					<BriefcaseIcon className="size-5 sm:size-6" />
					Work Experience
				</h2>
				<div className="space-y-5 sm:space-y-6">
					{[...WORK_EXPERIENCE]
						.sort((a, b) => {
							const getEndDate = (period: string) => {
								const parts = period.split(" - ");
								const endPart = parts.length > 1 ? parts[1] : parts[0];

								if (endPart.toLowerCase().includes("present")) {
									return new Date();
								}

								return new Date(endPart);
							};

							return (
								getEndDate(b.period).getTime() - getEndDate(a.period).getTime()
							);
						})
						.map((job) => (
							<article
								key={`${job.role}-${job.company}-${job.location}-${job.period}`}
								className="space-y-2"
							>
								<h3 className="font-semibold text-base sm:text-lg">
									{job.role}
								</h3>
								<h4 className="text-muted-foreground text-sm sm:text-base">
									{job.company}
								</h4>
								<div className="flex flex-wrap gap-2 items-center text-xs sm:text-sm text-muted-foreground">
									<span>{job.location}</span>
									<span>•</span>
									<span>{job.period}</span>
								</div>
								<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
									{job.description}
								</p>
							</article>
						))}
				</div>
			</section>

			<Separator className="my-8 sm:my-10 md:my-12" />

			<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
				<h2 className="font-bold tracking-tight flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl">
					<CodeIcon className="size-5 sm:size-6" />
					Technical Skills
				</h2>
				<div className="space-y-5 sm:space-y-6">
					<article>
						<h3 className="font-semibold mb-3 text-base sm:text-lg">
							Development
						</h3>
						<div className="flex flex-wrap gap-1.5 sm:gap-2">
							{SKILLS.technical.map((skill) => (
								<Badge
									key={skill}
									variant="default"
									className="text-xs px-2.5 py-1"
								>
									{skill}
								</Badge>
							))}
						</div>
					</article>
					<article>
						<h3 className="font-semibold mb-3 text-base sm:text-lg">
							Professional Skills
						</h3>
						<div className="flex flex-wrap gap-1.5 sm:gap-2">
							{SKILLS.soft.map((skill) => (
								<Badge
									key={skill}
									variant="outline"
									className="text-xs px-2.5 py-1"
								>
									{skill}
								</Badge>
							))}
						</div>
					</article>
				</div>
			</section>

			<Separator className="my-8 sm:my-10 md:my-12" />

			<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
				<h2 className="flex items-center gap-2 font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl">
					<FolderIcon className="size-5 sm:size-6" />
					Projects
				</h2>
				{PROJECTS.map((project) => (
					<article
						key={project.name + project.description}
						className="space-y-3 sm:space-y-4"
					>
						<div>
							<h3 className="flex items-start justify-between font-semibold mb-2 text-base sm:text-lg">
								{project.name}

								<Button variant={"default"} asChild>
									<Link
										href={`/projects/${project.slug}`}
										className="w-fit sm:mt-0"
									>
										Know More
									</Link>
								</Button>
							</h3>
							<p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
								{project.description}
							</p>
						</div>
					</article>
				))}
			</section>

			<Separator className="my-8 sm:my-10 md:my-12" />

			<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
				<h2 className="font-bold tracking-tight flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl">
					<GraduationCapIcon className="size-5 sm:size-6" />
					Education
				</h2>
				{EDUCATION.map((edu) => (
					<article
						key={
							edu.degree +
							edu.institution +
							edu.location +
							edu.period +
							edu.status
						}
						className="space-y-2"
					>
						<h3 className="font-semibold text-base sm:text-lg">{edu.degree}</h3>
						<h4 className="text-muted-foreground text-sm sm:text-base">
							{edu.institution}
						</h4>
						<div className="flex flex-wrap gap-2 items-center text-xs sm:text-sm text-muted-foreground">
							<span>{edu.location}</span>
							<span>•</span>
							<span>{edu.period}</span>
							<span>•</span>
							<Badge variant="secondary" className="text-xs px-2.5 py-1">
								{edu.status}
							</Badge>
						</div>
					</article>
				))}
			</section>

			<Separator className="my-8 sm:my-10 md:my-12" />

			<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
				<h2 className="font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl">
					Why Choose Me?
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
					<Card>
						<CardHeader>
							<div className="flex items-center gap-3 mb-2">
								<div className="rounded-lg bg-primary/10 p-2">
									<ZapIcon className="size-5 text-primary" />
								</div>
								<CardTitle className="text-lg">Fast Delivery</CardTitle>
							</div>
							<CardDescription>
								Efficient development process ensuring timely project completion
								without compromising quality.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<div className="flex items-center gap-3 mb-2">
								<div className="rounded-lg bg-primary/10 p-2">
									<ShieldCheckIcon className="size-5 text-primary" />
								</div>
								<CardTitle className="text-lg">Quality Code</CardTitle>
							</div>
							<CardDescription>
								Clean, maintainable, and well-documented code following industry
								best practices and standards.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<div className="flex items-center gap-3 mb-2">
								<div className="rounded-lg bg-primary/10 p-2">
									<ClockIcon className="size-5 text-primary" />
								</div>
								<CardTitle className="text-lg">24/7 Support</CardTitle>
							</div>
							<CardDescription>
								Ongoing maintenance and support to keep your application running
								smoothly at all times.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<div className="flex items-center gap-3 mb-2">
								<div className="rounded-lg bg-primary/10 p-2">
									<TargetIcon className="size-5 text-primary" />
								</div>
								<CardTitle className="text-lg">Goal-Oriented</CardTitle>
							</div>
							<CardDescription>
								Focused on understanding your business objectives and delivering
								solutions that drive results.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<div className="flex items-center gap-3 mb-2">
								<div className="rounded-lg bg-primary/10 p-2">
									<UsersIcon className="size-5 text-primary" />
								</div>
								<CardTitle className="text-lg">Collaborative</CardTitle>
							</div>
							<CardDescription>
								Strong communication skills and experience working with
								cross-functional teams to deliver exceptional results.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<div className="flex items-center gap-3 mb-2">
								<div className="rounded-lg bg-primary/10 p-2">
									<SparklesIcon className="size-5 text-primary" />
								</div>
								<CardTitle className="text-lg">Innovative Solutions</CardTitle>
							</div>
							<CardDescription>
								Leveraging cutting-edge technologies and creative
								problem-solving to build modern, scalable applications.
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</section>

			<Separator className="my-8 sm:my-10 md:my-12" />

			<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
				<h2 className="font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl">
					Frequently Asked Questions
				</h2>
				<Accordion type="single" collapsible className="w-full space-y-3">
					<AccordionItem
						value="item-1"
						className="rounded-lg border border-border bg-card px-4"
					>
						<AccordionTrigger className="text-left">
							What technologies do you specialize in?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							I specialize in modern web development technologies including
							Next.js, React, TypeScript, Node.js, and MongoDB. I also have
							experience with Tailwind CSS, shadcn/ui, REST APIs, and cloud
							services like Cloudinary. I&apos;m always learning and adapting to
							new technologies to stay current with industry best practices.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem
						value="item-2"
						className="rounded-lg border border-border bg-card px-4"
					>
						<AccordionTrigger className="text-left">
							How long does it take to develop a web application?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							The timeline depends on the project scope, complexity, and
							requirements. A simple portfolio website might take 1-2 weeks,
							while a full-stack application with authentication, database
							integration, and advanced features could take 4-8 weeks or more.
							I&apos;ll provide a detailed timeline estimate after understanding
							your specific needs and requirements.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem
						value="item-3"
						className="rounded-lg border border-border bg-card px-4"
					>
						<AccordionTrigger className="text-left">
							Do you provide ongoing maintenance and support?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Yes, I offer ongoing maintenance and support services. This
							includes bug fixes, security updates, feature enhancements,
							performance optimization, and technical support. We can discuss a
							maintenance plan that fits your needs and budget.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem
						value="item-4"
						className="rounded-lg border border-border bg-card px-4"
					>
						<AccordionTrigger className="text-left">
							Can you work with existing codebases or only start from scratch?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							I can work with both! I&apos;m comfortable diving into existing
							codebases, understanding legacy code, and making improvements or
							additions. Whether you need help refactoring, adding features, or
							migrating to modern technologies, I can adapt to your existing
							project structure and requirements.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem
						value="item-5"
						className="rounded-lg border border-border bg-card px-4"
					>
						<AccordionTrigger className="text-left">
							What is your development process?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							My development process follows best practices: starting with
							requirements gathering and planning, creating a technical roadmap,
							setting up the project structure, and then building iteratively
							with regular communication. I emphasize clean code, testing, and
							documentation throughout the process to ensure maintainable and
							scalable solutions.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem
						value="item-6"
						className="rounded-lg border border-border bg-card px-4"
					>
						<AccordionTrigger className="text-left">
							Do you offer hosting and deployment services?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							I can help you deploy your application to platforms like Vercel,
							Netlify, or other cloud providers. I&apos;ll guide you through the
							deployment process and can set up CI/CD pipelines for automated
							deployments. However, hosting costs are typically handled
							separately by the client.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem
						value="item-7"
						className="rounded-lg border border-border bg-card px-4"
					>
						<AccordionTrigger className="text-left">
							What is your pricing model?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Pricing varies based on project scope, complexity, and timeline. I
							offer both fixed-price contracts for well-defined projects and
							hourly rates for ongoing work or flexible requirements. Let&apos;s
							discuss your project needs, and I&apos;ll provide a transparent
							quote that fits your budget.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem
						value="item-8"
						className="rounded-lg border border-border bg-card px-4"
					>
						<AccordionTrigger className="text-left">
							How do you ensure code quality and best practices?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							I follow industry best practices including TypeScript for type
							safety, ESLint for code quality, proper error handling, responsive
							design principles, and accessibility standards. I write clean,
							readable, and well-documented code. Code reviews, testing, and
							continuous refactoring are integral parts of my development
							workflow.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</section>

			<Separator className="my-8 sm:my-10 md:my-12" />

			<section className="text-center space-y-5 sm:space-y-6 py-6 sm:py-8">
				<div className="space-y-4">
					<h2 className="font-bold tracking-tight mb-2 text-2xl sm:text-3xl md:text-4xl">
						Let&apos;s Work Together
					</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-4">
						I&apos;m actively seeking software engineering opportunities and
						open to collaborations. Whether you have a project in mind, need
						help with development, or just want to connect, feel free to reach
						out!
					</p>

					<p className="text-sm">
						Made with ❤️ for the community by{" "}
						<Link
							href={CREATOR_INFO.githubRepo}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-foreground transition-colors"
						>
							{CREATOR_INFO.name}
						</Link>
					</p>
				</div>
			</section>
		</div>
	);
}
