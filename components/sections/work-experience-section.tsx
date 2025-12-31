import { BriefcaseIcon } from "lucide-react";

import { WORK_EXPERIENCE } from "@/lib/constants";

export function WorkExperienceSection() {
	return (
		<section className="space-y-6 mb-12">
			<div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2 rounded-md">
				    <BriefcaseIcon className="size-6 text-primary" />
                </div>
				<h2 className="font-mono font-bold text-3xl tracking-tight">
					Experience_Log
				</h2>
			</div>

			<div className="relative border-l border-border/50 ml-3 space-y-8 pb-4">
				{[...WORK_EXPERIENCE].map((job, index) => (
                    <div key={index} className="pl-8 relative">
                         <div className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-primary ring-4 ring-background" />
                         
                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                             <h3 className="font-mono font-bold text-xl">{job.role}</h3>
                             <span className="font-mono text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                                 {job.period}
                             </span>
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

