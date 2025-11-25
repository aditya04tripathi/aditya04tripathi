import { CREATOR_INFO } from "@/lib/constants";

export function AboutSection() {
	return (
		<>
			{/** biome-ignore lint/correctness/useUniqueElementIds: Used for scroll to anchor */}
			<section
				id="projects"
				className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12"
			>
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
		</>
	);
}

