import { BriefcaseIcon } from "lucide-react";
import { TechBadge } from "@/components/tech-badge";
import Title from "@/components/title";
import { WORK_EXPERIENCE } from "@/lib/constants";

export function WorkExperienceSection() {
	return (
		<section className="space-y-6 mb-12">
			<Title
				title="Experience_Log"
				icon={<BriefcaseIcon className="size-6 text-primary" />}
			/>

			<div className="relative border-l border-border/50 ml-3 space-y-8 pb-4">
				{[...WORK_EXPERIENCE].map((job, index) => (
					<div key={index} className="pl-8 relative">
						<div className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-primary ring-4 ring-background" />

						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
							<h3 className="type-h5">{job.role}</h3>
							<TechBadge variant="secondary" className="w-fit">
								{job.period}
							</TechBadge>
						</div>

						<div className="mb-3">
							<div className="text-sm font-mono text-primary mb-1">
								@ {job.company}
							</div>
							<div className="text-xs text-muted-foreground font-mono">
								{job.location}
							</div>
						</div>

						<p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
							{job.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
