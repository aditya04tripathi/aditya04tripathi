import { ClockIcon, MailIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { CREATOR_INFO } from "@/lib/constants";

export function ContactSection() {
	return (
		<section className="space-y-6 sm:space-y-7 mb-8 sm:mb-10 md:mb-12">
			<div className="space-y-3 text-center">
				<p className="inline-flex items-center justify-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
					<MailIcon className="size-4" />
					Get in touch
				</p>
				<h2 className="type-h2">Let&apos;s build something remarkable</h2>
				<p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
					Share a bit about your project, the problems you&apos;re trying to
					solve, or the outcome you&apos;re aiming for. I&apos;ll review every
					detail and reply with next steps, ideas, and a realistic plan of
					attack.
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
				<ContactForm />

				<div className="space-y-4 rounded-xl border border-border bg-card/60 p-4 sm:p-6 shadow-sm">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
							Direct contact
						</p>
						<p className="mt-2 type-h5">{CREATOR_INFO.name}</p>
						<p className="text-sm text-muted-foreground">
							{CREATOR_INFO.title}
						</p>
					</div>

					<div className="space-y-3 text-sm">
						<div className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/60 p-3">
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

						<div className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/60 p-3">
							<div className="rounded-md bg-primary/10 p-2">
								<MapPinIcon className="size-4 text-primary" />
							</div>
							<div>
								<p className="text-xs uppercase tracking-wide text-muted-foreground">
									Location
								</p>
								<p className="font-medium">{CREATOR_INFO.location}</p>
								<p className="text-xs text-muted-foreground">
									Available for remote-friendly roles worldwide.
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/60 p-3">
							<div className="rounded-md bg-primary/10 p-2">
								<ClockIcon className="size-4 text-primary" />
							</div>
							<div>
								<p className="text-xs uppercase tracking-wide text-muted-foreground">
									Response time
								</p>
								<p className="font-medium">Within 24–48 hours</p>
								<p className="text-xs text-muted-foreground">
									Expect a thoughtful reply with next steps and estimates.
								</p>
							</div>
						</div>
					</div>

					<div className="space-y-2 text-sm text-muted-foreground">
						<p>Prefer social? Reach me on:</p>
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
		</section>
	);
}
