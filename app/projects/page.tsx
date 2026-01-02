import { SiteHeader } from "@/components/layout/site-header";
import { ProjectsSection } from "@/components/sections/projects-section";

export const metadata = {
	title: "Projects | Aditya Tripathi",
	description: "Archive of software engineering projects and systems.",
};

import { FadeIn } from "@/components/ui/fade-in";

export default function ProjectsPage() {
	return (
		<div className="container mx-auto px-4 sm:px-6 max-w-4xl">
			<FadeIn>
				<div className="flex items-center gap-3 mb-8 border-b border-border/40 pb-4">
					<h1 className="type-h2">// Project_Archive</h1>
				</div>
				<ProjectsSection noTitle noLink />
			</FadeIn>
		</div>
	);
}
