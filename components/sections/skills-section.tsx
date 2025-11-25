import { CodeIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SKILLS } from "@/lib/constants";

export function SkillsSection() {
	return (
		<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
			<h2 className="font-bold tracking-tight flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl">
				<CodeIcon className="size-5 sm:size-6" />
				Technical Skills
			</h2>
			<div className="space-y-5 sm:space-y-6">
				<article>
					<h3 className="font-semibold mb-3 text-base sm:text-lg">Development</h3>
					<div className="flex flex-wrap gap-1.5 sm:gap-2">
						{SKILLS.technical.map((skill) => (
							<Badge key={skill} variant="default" className="text-xs px-2.5 py-1">
								{skill}
							</Badge>
						))}
					</div>
				</article>
				<article>
					<h3 className="font-semibold mb-3 text-base sm:text-lg">
						Professional Skills
					</h3>
					<div className="flex flex-wrap gap-1.5 sm:gap-2">
						{SKILLS.soft.map((skill) => (
							<Badge key={skill} variant="outline" className="text-xs px-2.5 py-1">
								{skill}
							</Badge>
						))}
					</div>
				</article>
			</div>
		</section>
	);
}

