import { FolderIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/lib/constants";

export function ProjectsSection() {
	return (
		<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
			<h2 className="flex items-center gap-2 font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl">
				<FolderIcon className="size-5 sm:size-6" />
				Projects
			</h2>
			{PROJECTS.map((project) => (
				<article key={project.name + project.description} className="space-y-3 sm:space-y-4">
					<div>
						<h3 className="flex items-start justify-between font-semibold mb-2 text-base sm:text-lg">
							{project.name}

							<Button variant="default" asChild>
								<Link href={`/projects/${project.slug}`} className="w-fit sm:mt-0">
									Know More
								</Link>
							</Button>
						</h3>
						<p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
							{project.description}
						</p>
					</div>
				</article>
			))}
		</section>
	);
}

