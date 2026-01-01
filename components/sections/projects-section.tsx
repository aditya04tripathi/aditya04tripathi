import { Cpu, FolderIcon, GitBranch, Globe, Server } from "lucide-react";
import Link from "next/link";
import { TechBadge } from "@/components/tech-badge";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { PROJECTS } from "@/lib/constants";

// Add props interface
interface ProjectsSectionProps {
	limit?: number;
	className?: string;
	noTitle?: boolean;
	noLink?: boolean;
}

export function ProjectsSection({
	limit,
	noTitle = false,
	noLink = false,
}: ProjectsSectionProps) {
	let projectsToShow = [];

	if (limit) {
		projectsToShow = PROJECTS.slice(0, limit);
	} else {
		projectsToShow = PROJECTS;
	}

	return (
		<section className="space-y-6 mb-12" id="projects">
			{!noTitle && (
				<Title
					title="Featured_Systems"
					icon={<FolderIcon className="size-6 text-primary" />}
				/>
			)}

			<div className="grid gap-6 md:grid-cols-1">
				{projectsToShow.map((project) => (
					<FadeIn key={project.name}>
						<Card className="border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
							<CardHeader className="pb-3 border-b border-border/50 bg-secondary/20">
								<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
									<div>
										<CardTitle className="type-h4 flex items-center gap-2">
											<span className="text-primary">{">"}</span> {project.name}
										</CardTitle>
										<p className="text-muted-foreground mt-1 text-sm md:w-[80%]">
											{project.description}
										</p>
									</div>
									<div className="flex items-center gap-2 shrink-0">
										<Button
											variant="outline"
											size="sm"
											asChild
											className="h-8 font-mono text-xs"
										>
											<Link href={`/projects/${project.slug}`}>Details</Link>
										</Button>
										<Button
											variant="outline"
											size="sm"
											asChild
											className="h-8 font-mono text-xs"
										>
											<Link href={project.github} target="_blank">
												<GitBranch className="size-3.5 mr-2" />
												Source
											</Link>
										</Button>
										<Button
											variant="default"
											size="sm"
											asChild
											className="h-8 font-mono text-xs"
										>
											<Link href={project.link} target="_blank">
												<Globe className="size-3.5 mr-2" />
												Deploy
											</Link>
										</Button>
									</div>
								</div>
							</CardHeader>
							<CardContent className="pt-4 grid md:grid-cols-2 gap-6">
								<div className="space-y-4">
									<div>
										<h4 className="type-h6 mb-2 flex items-center gap-2">
											<Cpu className="size-4 text-primary" />
											Problem_Statement
										</h4>
										<p className="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3">
											{project.problem}
										</p>
									</div>
									<div>
										<h4 className="type-h6 mb-2 flex items-center gap-2">
											<Server className="size-4 text-primary" />
											Architecture
										</h4>
										<p className="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3">
											{project.architecture}
										</p>
									</div>
								</div>

								<div className="space-y-4 flex flex-col justify-between">
									<div>
										<h4 className="type-h6 mb-2">Key_Metrics</h4>
										<div className="bg-secondary/50 p-3 rounded text-sm font-mono text-primary border border-border">
											{">"} {project.outcome}
										</div>
									</div>

									<div>
										<h4 className="type-h6 mb-2">Tech_Stack</h4>
										<div className="flex flex-wrap gap-1.5">
											{project.technologies.map((tech) => (
												<TechBadge
													key={tech}
													variant="outline"
													className="uppercase border-primary/20 bg-primary/5 text-primary"
												>
													{tech}
												</TechBadge>
											))}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</FadeIn>
				))}
			</div>

			{!noLink && (
				<div className="flex justify-center mt-4">
					<Link href="/projects">
						<Button
							variant="ghost"
							className="font-mono text-muted-foreground hover:text-primary"
						>
							View All Archives {">"}
						</Button>
					</Link>
				</div>
			)}
		</section>
	);
}
