import { GraduationCapIcon } from "lucide-react";
import { TechBadge } from "@/components/tech-badge";
import Title from "@/components/title";
import { Badge } from "@/components/ui/badge";
import { EDUCATION } from "@/lib/constants";

export function EducationSection() {
	return (
		<section className="space-y-6 mb-12">
			<Title
				title="Education_Path"
				icon={<GraduationCapIcon className="size-6 text-primary" />}
			/>
			{EDUCATION.map((edu) => (
				<div
					key={`${edu.degree}${edu.institution}${edu.location}${edu.period}${edu.status}`}
					className="border border-border/50 rounded-lg p-5 bg-card/50 flex flex-col md:flex-row gap-4 justify-between md:items-center"
				>
					<div>
						<h3 className="type-h5 mb-1">{edu.degree}</h3>
						<div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
							<span>{edu.institution}</span>
							<span>//</span>
							<span>{edu.location}</span>
						</div>
					</div>

					<div className="flex flex-col md:items-end gap-1">
						<TechBadge variant="secondary" className="w-fit">
							{edu.period}
						</TechBadge>
						<span className="text-xs text-muted-foreground font-mono">
							Status: {edu.status}
						</span>
					</div>
				</div>
			))}
		</section>
	);
}
