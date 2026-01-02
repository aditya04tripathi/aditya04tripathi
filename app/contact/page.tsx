import { ArrowLeftIcon, ClockIcon, MailIcon, MapPinIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { CREATOR_INFO, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
	title: `Contact ${CREATOR_INFO.name} | ${SITE_CONFIG.name}`,
	description:
		"Start a project, request a collaboration, or talk through your idea. Expect a thoughtful response with timelines, pricing ranges, and next steps.",
	openGraph: {
		title: `Contact ${CREATOR_INFO.name} | ${SITE_CONFIG.name}`,
		description:
			"Start a project, request a collaboration, or talk through your idea. Expect a thoughtful response with timelines, pricing ranges, and next steps.",
		url: `${SITE_CONFIG.url}/contact`,
		type: "website",
	},
};

import { FadeIn } from "@/components/ui/fade-in";

export default function ContactPage() {
	return (
		<div className="container mx-auto px-4 sm:px-6 max-w-4xl">
			<FadeIn className="mb-6">
				<Button
					variant="ghost"
					size="sm"
					asChild
					className="gap-2 pl-0 hover:pl-2 transition-all"
				>
					<Link href="/">
						<ArrowLeftIcon className="size-3" />
						../return_home
					</Link>
				</Button>
			</FadeIn>

			<div className="space-y-4 text-center sm:text-left">
				<FadeIn delay={0.1}>
					<Title
						title="Initialize_Connection"
						icon={<MailIcon className="size-6 text-primary" />}
					/>
					<p className="type-body text-muted-foreground max-w-3xl leading-relaxed">
						Ready to deploy your next idea? Share your parameters, budget
						constraints, and timeline. I'll execute a feasibility check and
						return a detailed response.
					</p>
				</FadeIn>
			</div>

			<div className="my-8 sm:my-10" />

			<div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
				<FadeIn>
					<ContactForm />
				</FadeIn>

				<FadeIn className="space-y-4 border border-border bg-card/80 p-4 sm:p-6 shadow-sm">
					<div>
						<p className="text-muted-foreground">Direct contact</p>
						<p className="mt-2 type-h5">{CREATOR_INFO.name}</p>
						<p className="text-muted-foreground">{CREATOR_INFO.title}</p>
					</div>

					<div className="space-y-3 text-sm">
						<div className="flex items-start gap-3 border border-border/70 bg-background/60 p-3">
							<div className="bg-primary/10 p-2">
								<MailIcon className="size-4 text-primary" />
							</div>
							<div>
								<p className="text-muted-foreground">Email</p>
								<Link
									href={`mailto:${CREATOR_INFO.email}`}
									className="font-medium hover:text-foreground"
								>
									{CREATOR_INFO.email}
								</Link>
							</div>
						</div>

						<div className="flex items-start gap-3 border border-border/70 bg-background/60 p-3">
							<div className="bg-primary/10 p-2">
								<MapPinIcon className="size-4 text-primary" />
							</div>
							<div>
								<p className="text-muted-foreground">Location</p>
								<p className="font-medium">{CREATOR_INFO.location}</p>
								<p className="text-muted-foreground">
									Remote-friendly across AU/EU/US time zones.
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3 border border-border/70 bg-background/60 p-3">
							<div className="bg-primary/10 p-2">
								<ClockIcon className="size-4 text-primary" />
							</div>
							<div>
								<p className="text-muted-foreground">Response time</p>
								<p className="font-medium">Within 24–48 hours</p>
								<p className="text-muted-foreground">
									Includes follow-up questions and proposed next steps.
								</p>
							</div>
						</div>
					</div>

					<div className="space-y-2 text-sm text-muted-foreground">
						<p>Prefer social?</p>
						<div className="flex gap-3">
							<Link
								href={CREATOR_INFO.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="text-foreground underline-offset-4 hover:underline"
							>
								LinkedIn
							</Link>
							<Link
								href={CREATOR_INFO.github}
								target="_blank"
								rel="noopener noreferrer"
								className="text-foreground underline-offset-4 hover:underline"
							>
								GitHub
							</Link>
						</div>
					</div>
				</FadeIn>
			</div>
		</div>
	);
}
