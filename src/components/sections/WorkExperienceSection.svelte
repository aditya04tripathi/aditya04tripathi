<script lang="ts">
	import { Briefcase } from "lucide-svelte";
	import Title from "@/components/Title.svelte";
	import TechBadge from "@/components/TechBadge.svelte";
	import { WORK_EXPERIENCE } from "@/lib/constants";
</script>

<section class="space-y-6 mb-12">
	<Title title="Experience log">
		{#snippet icon()}
			<Briefcase class="size-6 text-primary" />
		{/snippet}
	</Title>

	<div class="relative border-l border-border/50 ml-3 space-y-8 pb-4">
		{#each WORK_EXPERIENCE as job, index (index)}
			<div class="pl-8 relative">
				<div class="absolute -left-[5px] top-2 size-2.5 rounded-none bg-primary ring-4 ring-background"></div>

				<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
					<h3 class="type-h5">{job.role}</h3>
					<TechBadge variant="secondary" class="w-fit">{job.period}</TechBadge>
				</div>

				<div class="mb-3">
					<div class="text-sm font-mono text-primary mb-1">@ {job.company}</div>
					<div class="text-xs text-muted-foreground font-mono">{job.location}</div>
				</div>

				<p class="text-muted-foreground text-sm leading-relaxed max-w-2xl">{job.description}</p>
			</div>
		{/each}
	</div>
</section>
