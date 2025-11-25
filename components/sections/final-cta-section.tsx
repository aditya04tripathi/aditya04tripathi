import Link from "next/link";

import { CREATOR_INFO } from "@/lib/constants";

export function FinalCtaSection() {
	return (
		<section className="text-center space-y-5 sm:space-y-6 py-6 sm:py-8">
			<div className="space-y-4">
				<h2 className="font-bold tracking-tight mb-2 text-2xl sm:text-3xl md:text-4xl">
					Let&apos;s Work Together
				</h2>
				<p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-4">
					I&apos;m actively seeking software engineering opportunities and open
					to collaborations. Whether you have a project in mind, need help with
					development, or just want to connect, feel free to reach out!
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
	);
}
