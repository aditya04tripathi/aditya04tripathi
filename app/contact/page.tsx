import { ArrowLeftIcon, ClockIcon, MailIcon, MapPinIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

export default function ContactPage() {
	return (
		<div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
			<div className="mb-6">
				<Button variant="ghost" size="sm" asChild className="gap-2">
					<Link href="/">
						<ArrowLeftIcon className="size-4" />
						Back to home
					</Link>
				</Button>
			</div>

			<div className="space-y-4 text-center sm:text-left">
				<p className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
					<MailIcon className="size-4" />
					Contact
				</p>
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
					Ready to build your next launch, MVP, or product iteration?
				</h1>
				<p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
					Share a quick overview of your goals, budget range, and ideal
					timeline. I’ll review every detail personally and reply with scope
					suggestions, next steps, and how we can partner together.
				</p>
			</div>

			<Separator className="my-8 sm:my-10" />

			<div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
				<ContactForm />

				<div className="space-y-4 rounded-xl border border-border bg-card/80 p-4 sm:p-6 shadow-sm">
					<div>
						<p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
							Direct contact
						</p>
						<p className="mt-2 text-lg font-semibold">{CREATOR_INFO.name}</p>
						<p className="text-sm text-muted-foreground">
							{CREATOR_INFO.title}
						</p>
					</div>

					<div className="space-y-3 text-sm">
						<div className="flex items-start gap-3 rounded-lg border border-border/70 bg-background/60 p-3">
							<div className="rounded-md bg-primary/10 p-2">
								<MailIcon className="size-4 text-primary" />
							</div>
							<div>
								<p className="text-xs uppercase tracking-wide text-muted-foreground">
									Email
								</p>
								<Link
									href={`mailto:${CREATOR_INFO.email}`}
									className="font-medium hover:text-foreground"
								>
									{CREATOR_INFO.email}
								</Link>
							</div>
						</div>

						<div className="flex items-start gap-3 rounded-lg border border-border/70 bg-background/60 p-3">
							<div className="rounded-md bg-primary/10 p-2">
								<MapPinIcon className="size-4 text-primary" />
							</div>
							<div>
								<p className="text-xs uppercase tracking-wide text-muted-foreground">
									Location
								</p>
								<p className="font-medium">{CREATOR_INFO.location}</p>
								<p className="text-xs text-muted-foreground">
									Remote-friendly across AU/EU/US time zones.
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3 rounded-lg border border-border/70 bg-background/60 p-3">
							<div className="rounded-md bg-primary/10 p-2">
								<ClockIcon className="size-4 text-primary" />
							</div>
							<div>
								<p className="text-xs uppercase tracking-wide text-muted-foreground">
									Response time
								</p>
								<p className="font-medium">Within 24–48 hours</p>
								<p className="text-xs text-muted-foreground">
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
				</div>
			</div>
		</div>
	);
}
