<script lang="ts">
	import { GraduationCap } from "lucide-svelte";
	import Title from "@/components/Title.svelte";
	import TechBadge from "@/components/TechBadge.svelte";
	import { EDUCATION } from "@/lib/constants";
</script>

<section class="space-y-6 mb-12">
	<Title title="Education_Path">
		{#snippet icon()}
			<GraduationCap class="size-6 text-primary" />
		{/snippet}
	</Title>
	{#each EDUCATION as edu (`${edu.degree}${edu.institution}${edu.location}${edu.period}${edu.status}`)}
		<div
			class="border border-border/50 rounded-none p-5 bg-card/50 flex flex-col md:flex-row gap-4 justify-between md:items-center"
		>
			<div>
				<h3 class="type-h5 mb-1">{edu.degree}</h3>
				<div class="flex items-center gap-2 text-sm text-muted-foreground font-mono">
					<span>{edu.institution}</span>
					<span>//</span>
					<span>{edu.location}</span>
				</div>
				{#if edu.notes}
					<span class="text-xs text-primary text-muted-foreground font-mono">Notes: {edu.notes}</span>
				{/if}
			</div>

			<div class="flex flex-col md:items-end gap-1">
				<TechBadge variant="secondary" class="w-fit">{edu.period}</TechBadge>
				<span class="text-xs text-muted-foreground font-mono">Status: {edu.status}</span>
			</div>
		</div>
	{/each}
</section>
