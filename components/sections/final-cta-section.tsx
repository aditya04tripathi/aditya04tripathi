import { GithubIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { CREATOR_INFO } from "@/lib/constants";

export function FinalCtaSection() {
	return (
		<section className="py-24 sm:py-32">
			<FadeIn>
				<div className="flex flex-col items-center text-center space-y-8">
					<div className="space-y-4 max-w-3xl">
						<h2 className="type-h2">
							Let's_Build_Something
							<span className="block text-primary mt-2">Extraordinary</span>
						</h2>
						<p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
							I&apos;m actively seeking software engineering opportunities and
							open to collaborations. Whether you have a project in mind, need
							help with development, or just want to connect, feel free to reach
							out!
						</p>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-4">
						<Button
							size="lg"
							className="h-12 px-8 text-base font-mono font-bold"
							asChild
						>
							<Link href="/contact">
								<MailIcon className="mr-2 size-5" />
								Get_In_Touch
							</Link>
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="h-12 px-8 text-base font-mono"
							asChild
						>
							<Link href={CREATOR_INFO.github} target="_blank">
								<GithubIcon className="mr-2 size-5" />
								GitHub
							</Link>
						</Button>
					</div>

					<div className="pt-12 text-sm text-muted-foreground font-mono">
						<p>
							Designed & Built by{" "}
							<Link
								href={CREATOR_INFO.githubRepo}
								target="_blank"
								rel="noopener noreferrer"
								className="text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary"
							>
								{CREATOR_INFO.name}
							</Link>
						</p>
						<p className="mt-2 text-xs opacity-60">
							© {new Date().getFullYear()} • MIT License
						</p>
					</div>
				</div>
			</FadeIn>
		</section>
	);
}
