<script lang="ts">
	import { Cpu, Folder, GitBranch, Globe, Server } from "lucide-svelte";
	import Title from "@/components/Title.svelte";
	import TechBadge from "@/components/TechBadge.svelte";
	import Button from "@/components/ui/Button.svelte";
	import Card from "@/components/ui/Card.svelte";
	import CardHeader from "@/components/ui/CardHeader.svelte";
	import CardContent from "@/components/ui/CardContent.svelte";
	import CardTitle from "@/components/ui/CardTitle.svelte";
	import type { Project } from "@/lib/constants";

	let {
		projects,
		noTitle = false,
		noLink = false,
		title = "Engineering_Projects",
		description = null as string | null,
		sectionId = "engineering-projects",
	}: {
		projects: Project[];
		noTitle?: boolean;
		noLink?: boolean;
		title?: string;
		description?: string | null;
		sectionId?: string;
	} = $props();
</script>

<section class="space-y-6 mb-12" id={sectionId}>
	{#if !noTitle}
		<div class="space-y-3 mb-2">
			<Title {title}>
				{#snippet icon()}
					<Folder class="size-6 text-primary" />
				{/snippet}
			</Title>
			{#if description}
				<p class="text-muted-foreground max-w-2xl text-sm md:text-base leading-relaxed">{description}</p>
			{/if}
		</div>
	{/if}

	<div class="space-y-8">
		{#each projects as project (project.slug)}
			<Card
				class="border-border/60 bg-card/80 overflow-hidden group hover:border-primary/40 transition-[transform,box-shadow,border-color] duration-300 rounded-none hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0"
			>
				<CardHeader class="pb-3 border-b border-border/50">
						<div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
							<div class="flex flex-col sm:flex-row gap-4 min-w-0 flex-1 items-start">
								<div
									class="vt-morph relative aspect-video w-full sm:w-40 sm:aspect-auto sm:h-28 shrink-0 overflow-hidden rounded-none border border-border/60 bg-muted"
									style="view-transition-name: vt-project-{project.slug};"
								>
									<img
										src={project.image}
										alt=""
										width="800"
										height="450"
										class="absolute inset-0 size-full object-cover"
										loading="lazy"
										decoding="async"
									/>
								</div>
								<div class="min-w-0 overflow-hidden">
									<CardTitle class="type-h4 flex flex-wrap items-center gap-2 break-words">
										<span class="text-primary shrink-0">{">"}</span>
										<span>{project.name}</span>
									</CardTitle>
									<p class="mt-1 max-w-[65ch] text-sm leading-relaxed break-words text-muted-foreground">
										{project.description}
									</p>
								</div>
							</div>
							<div class="flex items-center gap-2 shrink-0">
								<Button size="sm" href={`/projects/${project.slug}`} class="h-8 font-mono text-xs"
									>Details</Button
								>
								{#if project.github}
									<Button
										variant="outline"
										size="sm"
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										class="h-8 font-mono text-xs"
									>
										<GitBranch class="size-3.5 mr-2" />
										Source
									</Button>
								{/if}
								{#if project.link}
									<Button
										size="sm"
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
										class="h-8 font-mono text-xs"
									>
										<Globe class="size-3.5 mr-2" />
										Deploy
									</Button>
								{/if}
							</div>
						</div>
				</CardHeader>
				<CardContent class="pt-4 grid md:grid-cols-2 gap-6">
					<div class="space-y-4">
						<div>
							<h4 class="type-h6 mb-2 flex items-center gap-2">
								<Cpu class="size-4 text-primary" />
								Problem_Statement
							</h4>
							<p class="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3">
								{project.problem}
							</p>
						</div>
						<div>
							<h4 class="type-h6 mb-2 flex items-center gap-2">
								<Server class="size-4 text-primary" />
								Architecture
							</h4>
							<p class="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3">
								{project.architecture}
							</p>
						</div>
					</div>

					<div class="space-y-4 flex flex-col justify-between">
						<div>
							<h4 class="type-h6 mb-2">Key_Metrics</h4>
							<div class="bg-secondary/50 p-3 rounded text-sm font-mono text-primary border border-border">
								{">"}
								{project.outcome}
							</div>
						</div>

						<div>
							<h4 class="type-h6 mb-2">Tech_Stack</h4>
							<div class="flex flex-wrap gap-1.5">
								{#each project.technologies as tech (tech)}
									<TechBadge variant="outline" class="uppercase border-primary/20 bg-primary/5 text-primary">
										{tech}
									</TechBadge>
								{/each}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		{/each}
	</div>

	{#if !noLink}
		<div class="flex justify-center mt-4">
			<Button variant="ghost" href="/projects" class="font-mono text-muted-foreground hover:text-primary">
				View All Archives {">"}
			</Button>
		</div>
	{/if}
</section>
