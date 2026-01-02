import { CodeIcon } from "lucide-react";
import { TechBadge } from "@/components/tech-badge";
import Title from "@/components/title";
import { Badge } from "@/components/ui/badge";
import { SKILLS } from "@/lib/constants";

export function SkillsSection() {
	return (
		<section className="space-y-6 mb-12">
			<Title
				title="Tech_Stack"
				icon={<CodeIcon className="size-6 text-primary" />}
			/>

			<div className="grid gap-6 md:grid-cols-2">
				<div className="border border-border/50 rounded-none p-5 bg-card/50 transition-all duration-300 hover:border-primary/40 hover:shadow-md group">
					<h3 className="type-h5 mb-4 text-primary border-b border-border/50 pb-2">
						// Languages & Frameworks
					</h3>
					<div className="flex flex-wrap gap-2">
						{SKILLS.technical.map((skill) => (
							<TechBadge key={skill} variant="secondary">
								{skill}
							</TechBadge>
						))}
					</div>
				</div>

				<div className="border border-border/50 rounded-none p-5 bg-card/50 transition-all duration-300 hover:border-primary/40 hover:shadow-md group">
					<h3 className="type-h5 mb-4 text-primary border-b border-border/50 pb-2">
						// Capabilities
					</h3>
					<div className="flex flex-wrap gap-2">
						{SKILLS.soft.map((skill) => (
							<TechBadge
								key={skill}
								variant="outline"
								className="border-dashed"
							>
								{skill}
							</TechBadge>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
