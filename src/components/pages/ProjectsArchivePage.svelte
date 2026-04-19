<script lang="ts">
	import { Folder } from "lucide-svelte";
	import Title from "@/components/Title.svelte";
	import ProductsSection from "@/components/sections/ProductsSection.svelte";
	import ProjectsSection from "@/components/sections/ProjectsSection.svelte";
	import { ENGINEERING_PROJECTS_INTRO, engineeringProjectsList } from "@/lib/constants";
</script>

<div class="container mx-auto px-4 sm:px-6 max-w-4xl">
	<ProductsSection />
	<div class="mb-12 border-b border-border/40 pb-6">
		<Title title="Engineering projects">
			{#snippet icon()}
				<Folder class="size-8 text-primary" />
			{/snippet}
		</Title>
		<p class="text-muted-foreground max-w-2xl">{ENGINEERING_PROJECTS_INTRO}</p>
	</div>
	<ProjectsSection
		projects={engineeringProjectsList()}
		noLink
		noTitle
		sectionId="engineering-projects-archive"
	/>
</div>
