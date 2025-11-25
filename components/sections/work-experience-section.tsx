import { BriefcaseIcon } from "lucide-react";

import { WORK_EXPERIENCE } from "@/lib/constants";

export function WorkExperienceSection() {
	return (
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

						return getEndDate(b.period).getTime() - getEndDate(a.period).getTime();
					})
					.map((job) => (
						<article
							key={`${job.role}-${job.company}-${job.location}-${job.period}`}
							className="space-y-2"
						>
							<h3 className="font-semibold text-base sm:text-lg">{job.role}</h3>
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
	);
}

