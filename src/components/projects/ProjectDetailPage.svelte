<script lang="ts">
	import { ArrowLeft, ExternalLink } from "lucide-svelte";
	import TechBadge from "@/components/TechBadge.svelte";
	import IconGithub from "@/components/icons/IconGithub.svelte";
	import Button from "@/components/ui/Button.svelte";
	import Separator from "@/components/ui/Separator.svelte";
	import type { Project } from "@/lib/constants";

	let { project }: { project: Project } = $props();
</script>

<div class="container mx-auto px-4 sm:px-6 max-w-4xl">
	<div class="mb-6">
		<Button
			variant="ghost"
			class="hover:text-foreground pl-0 hover:pl-2 transition-colors duration-200"
			href="/projects"
		>
			<ArrowLeft class="size-3 mr-2 shrink-0" />
			Back to all projects
		</Button>
	</div>

	<div class="mb-8 sm:mb-10 md:mb-12">
		<h1 class="type-h1 mb-4 break-words">{project.name}</h1>
		<p class="type-body break-words text-muted-foreground">{project.description}</p>
	</div>

	{#if project.image}
		<div class="mb-8 sm:mb-10 md:mb-12">
			<div
				class="vt-morph rounded-none overflow-hidden border bg-muted"
				style="view-transition-name: vt-project-{project.slug};"
			>
				<img
					src={project.image}
					alt={project.name}
					width="1200"
					height="630"
					class="w-full h-auto object-cover"
					loading="eager"
					decoding="async"
				/>
			</div>
		</div>
	{/if}

	<div class="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-10">
		{#if project.link}
			<Button class="w-full sm:w-auto" href={project.link} target="_blank" rel="noopener noreferrer">
				<ExternalLink class="size-4 mr-2" />
				View Live Project
			</Button>
		{/if}
		{#if project.github}
			<Button
				variant="outline"
				class="w-full sm:w-auto"
				href={project.github}
				target="_blank"
				rel="noopener noreferrer"
			>
				<IconGithub class="size-4 mr-2" />
				View on GitHub
			</Button>
		{/if}
	</div>

	<Separator class="my-8 sm:my-10 md:my-12" />

	<div class="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
		<h2 class="type-h2">Technologies Used</h2>
		<div class="flex flex-wrap gap-2">
			{#each project.technologies as tech (tech)}
				<TechBadge variant="default" class="px-2.5 py-1">{tech}</TechBadge>
			{/each}
		</div>
	</div>

	<Separator class="my-8 sm:my-10 md:my-12" />

	<div class="space-y-4 mb-8 sm:mb-10 md:mb-12">
		<h2 class="type-h3 text-primary">// Problem_Statement</h2>
		<p class="text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-4">{project.problem}</p>
	</div>

	<Separator class="my-8 sm:my-10 md:my-12" />

	<div class="space-y-4 mb-8 sm:mb-10 md:mb-12">
		<h2 class="type-h3 text-primary">// System_Architecture</h2>
		<p class="text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-4">{project.architecture}</p>
	</div>

	<Separator class="my-8 sm:my-10 md:my-12" />

	<div class="space-y-4 mb-8 sm:mb-10 md:mb-12">
		<h2 class="type-h3 text-primary">// Outcome_&_Impact</h2>
		<div class="bg-secondary/10 p-6 rounded-none border border-primary/10">
			<p class="text-foreground font-medium leading-relaxed">
				{">"}
				{project.outcome}
			</p>
		</div>
	</div>

	<Separator class="my-8 sm:my-10 md:my-12" />

	<div class="text-center space-y-5 sm:space-y-6 py-6 sm:py-8">
		<div>
			<h2 class="type-h2 mb-2">Interested in Working Together?</h2>
			<p class="text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
				I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
			</p>
		</div>
		<div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
			<Button variant="outline" href="/" class="w-full sm:w-auto">
				<ArrowLeft class="size-4 mr-2" />
				Back to Portfolio
			</Button>
		</div>
	</div>
</div>
