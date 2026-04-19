<script lang="ts">
	import { Code } from "lucide-svelte";
	import Title from "@/components/Title.svelte";
	import TechBadge from "@/components/TechBadge.svelte";
	import { SKILLS } from "@/lib/constants";
</script>

<section class="space-y-6 mb-12">
	<Title title="Tech_Stack">
		{#snippet icon()}
			<Code class="size-6 text-primary" />
		{/snippet}
	</Title>

	<div class="grid gap-6 md:grid-cols-2">
		<div
			class="border border-border/50 rounded-none p-5 bg-card/50 transition-all duration-300 hover:border-primary/40 hover:shadow-md group"
		>
			<h3 class="type-h5 mb-4 text-primary border-b border-border/50 pb-2">
				// Languages & Frameworks
			</h3>
			<div class="flex flex-wrap gap-2">
				{#each SKILLS.technical as skill (skill)}
					<TechBadge variant="secondary">{skill}</TechBadge>
				{/each}
			</div>
		</div>

		<div
			class="border border-border/50 rounded-none p-5 bg-card/50 transition-all duration-300 hover:border-primary/40 hover:shadow-md group"
		>
			<h3 class="type-h5 mb-4 text-primary border-b border-border/50 pb-2">// Capabilities</h3>
			<div class="flex flex-wrap gap-2">
				{#each SKILLS.soft as skill (skill)}
					<TechBadge variant="outline" class="border-dashed">{skill}</TechBadge>
				{/each}
			</div>
		</div>
	</div>
</section>
