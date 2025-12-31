import { FolderIcon, GitBranch, Globe, Server, Cpu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PROJECTS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";

// Add props interface
interface ProjectsSectionProps {
    limit?: number;
    className?: string;
    noTitle?: boolean;
    noLink?: boolean;
}

export function ProjectsSection({ limit, className, noTitle = false, noLink=false }: ProjectsSectionProps) {
    // ... (keep logic)

	return (
		<section className="space-y-6 mb-12" id="projects">
				{!noTitle && 
			<div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2 rounded-md">
				    <FolderIcon className="size-6 text-primary" />
                </div>
                <h2 className="type-h2">
					Featured_Systems
				</h2>
			</div>
                }

			<div className="grid gap-6 md:grid-cols-1">
				{PROJECTS.map((project) => (
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
                                         <Button variant="outline" size="sm" asChild className="h-8 font-mono text-xs">
                                            <Link href={`/projects/${project.slug}`}>
                                                Details
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" asChild className="h-8 font-mono text-xs">
                                            <Link href={project.github} target="_blank">
                                                <GitBranch className="size-3.5 mr-2" />
                                                Source
                                            </Link>
                                        </Button>
                                        <Button variant="default" size="sm" asChild className="h-8 font-mono text-xs">
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
                                        <h4 className="flex items-center gap-2 text-sm font-mono font-bold text-foreground mb-2">
                                            <Cpu className="size-4 text-primary" />
                                            Problem_Statement
                                        </h4>
                                        <p className="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3">
                                            {project.problem}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="flex items-center gap-2 text-sm font-mono font-bold text-foreground mb-2">
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
                                        <h4 className="text-sm font-mono font-bold text-foreground mb-2">
                                            Key_Metrics
                                        </h4>
                                        <div className="bg-secondary/50 p-3 rounded text-sm font-mono text-primary border border-border">
                                            {">"} {project.outcome}
                                        </div>
                                     </div>
    
                                     <div>
                                         <h4 className="text-sm font-mono font-bold text-foreground mb-2">
                                            Tech_Stack
                                        </h4>
                                         <div className="flex flex-wrap gap-1.5">
                                            {project.technologies.map(tech => (
                                                <Badge key={tech} variant="outline" className="rounded-md font-mono text-[10px] uppercase border-primary/20 bg-primary/5 text-primary">
                                                    {tech}
                                                </Badge>
                                            ))}
                                         </div>
                                     </div>
                                </div>
    						</CardContent>
    					</Card>
                    </FadeIn>
				))}
			</div>
            
            {!noLink && <div className="flex justify-center mt-4">
                 <Link href="/projects">
                     <Button variant="ghost" className="font-mono text-muted-foreground hover:text-primary">
                        View All Archives {">"}
                     </Button>
                 </Link>
            </div>}
		</section>
	);
}

