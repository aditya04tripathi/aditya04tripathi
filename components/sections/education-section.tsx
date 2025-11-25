import { GraduationCapIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { EDUCATION } from "@/lib/constants";

export function EducationSection() {
	return (
		<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
			<h2 className="font-bold tracking-tight flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl">
				<GraduationCapIcon className="size-5 sm:size-6" />
				Education
			</h2>
			{EDUCATION.map((edu) => (
				<article
					key={`${edu.degree}${edu.institution}${edu.location}${edu.period}${edu.status}`}
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
	);
}

