<script lang="ts">
	import HeroSection from "@/components/sections/HeroSection.svelte";
	import ProductsSection from "@/components/sections/ProductsSection.svelte";
	import ProjectsSection from "@/components/sections/ProjectsSection.svelte";
	import EngineeringSection from "@/components/sections/EngineeringSection.svelte";
	import SkillsSection from "@/components/sections/SkillsSection.svelte";
	import WorkExperienceSection from "@/components/sections/WorkExperienceSection.svelte";
	import EducationSection from "@/components/sections/EducationSection.svelte";
	import FinalCtaSection from "@/components/sections/FinalCtaSection.svelte";
	import SectionDivider from "@/components/ui/SectionDivider.svelte";
	import { ENGINEERING_PROJECTS_INTRO, engineeringProjectsList } from "@/lib/constants";
</script>

<div class="container mx-auto px-4 sm:px-6 max-w-4xl">
	<HeroSection />

	<ProductsSection />

	<ProjectsSection
		projects={engineeringProjectsList()}
		description={ENGINEERING_PROJECTS_INTRO}
	/>

	<EngineeringSection />

	<SkillsSection />
	<SectionDivider />

	<WorkExperienceSection />
	<SectionDivider />

	<EducationSection />
	<SectionDivider />

	<FinalCtaSection />
</div>
