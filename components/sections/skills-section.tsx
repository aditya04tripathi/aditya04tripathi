import { CodeIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SKILLS } from "@/lib/constants";

export function SkillsSection() {
	return (
		<section className="space-y-6 mb-12">
			<div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2 rounded-md">
				    <CodeIcon className="size-6 text-primary" />
                </div>
				<h2 className="type-h2">
					Tech_Stack
				</h2>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<div className="border border-border/50 rounded-lg p-5 bg-card/50 transition-all duration-300 hover:border-primary/40 hover:shadow-md group">
					<h3 className="type-h5 mb-4 text-primary border-b border-border/50 pb-2">
                        // Languages & Frameworks
                    </h3>
					<div className="flex flex-wrap gap-2">
						{SKILLS.technical.map((skill) => (
							<Badge key={skill} variant="secondary" className="font-mono text-xs rounded-sm">
								{skill}
							</Badge>
						))}
					</div>
				</div>
                
				<div className="border border-border/50 rounded-lg p-5 bg-card/50 transition-all duration-300 hover:border-primary/40 hover:shadow-md group">
					<h3 className="type-h5 mb-4 text-primary border-b border-border/50 pb-2">
                        // Capabilities
                    </h3>
					<div className="flex flex-wrap gap-2">
						{SKILLS.soft.map((skill) => (
							<Badge key={skill} variant="outline" className="font-mono text-xs rounded-sm border-dashed">
								{skill}
							</Badge>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

