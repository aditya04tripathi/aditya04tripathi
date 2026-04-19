<script lang="ts">
	import { fly } from "svelte/transition";
	import Badge from "@/components/ui/Badge.svelte";
	import Button from "@/components/ui/Button.svelte";
	import { CREATOR_INFO, HERO_HEADLINE, HERO_PRODUCT_LINE } from "@/lib/constants";
	import { flyInParams } from "@/lib/motion";
</script>

<section class="py-6 sm:py-8">
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
		<div class="lg:col-span-8 flex flex-col gap-6">
			<div in:fly={flyInParams({ y: 20, duration: 500, opacity: 0 })}>
				<div class="flex items-center gap-3 mb-4">
					<span class="relative flex h-3 w-3">
						<span
							class="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-none opacity-75 bg-[var(--status-online-ring)]"
						></span>
						<span
							class="relative inline-flex rounded-none h-3 w-3 bg-[var(--status-online-core)]"
						></span>
					</span>
					<span class="font-mono text-xs text-muted-foreground uppercase tracking-widest">
						System Online
					</span>
				</div>

				<h1 class="type-h1 mb-4">{CREATOR_INFO.name}</h1>
				<h2 class="type-h3 text-muted-foreground mb-4">{HERO_HEADLINE}</h2>

				<p class="type-body max-w-2xl text-foreground/90 leading-relaxed font-medium">
					{HERO_PRODUCT_LINE}
				</p>
				<p class="type-body max-w-2xl text-foreground/80 leading-relaxed mt-4">
					I build real-world applications that prioritize performance, usability, and privacy.
				</p>
				<p class="type-body max-w-2xl text-foreground/80 leading-relaxed mt-2">
					My work spans production-ready apps and scalable backend systems.
				</p>
			</div>

			<div
				in:fly={flyInParams({ y: 10, duration: 500, opacity: 0, delay: 100 })}
				class="flex flex-wrap gap-4 mt-2"
			>
				<Button
					size="lg"
					href="/pennywise"
					class="rounded-none font-mono font-bold text-sm h-12 px-8 transition-shadow duration-200 shadow-md hover:shadow-lg"
				>
					PennyWise
				</Button>
				<Button
					variant="secondary"
					size="lg"
					href="/projects"
					class="rounded-none font-mono font-bold text-sm h-12 px-8 transition-shadow duration-200"
				>
					Projects
				</Button>
				<Button
					variant="outline"
					size="lg"
					href="mailto:me@adityatripathi.dev"
					class="rounded-none font-mono font-bold text-sm h-12 px-8 transition-colors duration-200 hover:bg-secondary/50"
				>
					Contact Me
				</Button>
			</div>
		</div>

		<div class="lg:col-span-4 space-y-8 pt-2 lg:pt-14">
			<div
				in:fly={flyInParams({ x: 20, duration: 500, opacity: 0, delay: 150 })}
				class="p-6 border border-border/60 bg-secondary/5 space-y-4"
			>
				<div class="space-y-1">
					<p class="type-small uppercase tracking-widest text-[10px]">Location</p>
					<p class="font-mono text-sm">{CREATOR_INFO.location}</p>
				</div>
				<div class="space-y-1">
					<p class="type-small uppercase tracking-widest text-[10px]">Education</p>
					<p class="font-mono text-sm">Monash University</p>
				</div>
				<div class="space-y-1">
					<p class="type-small uppercase tracking-widest text-[10px]">Core Stack</p>
					<div class="flex flex-wrap gap-1.5 pt-1">
						{#each ["Next.js", "TypeScript", "PostgreSQL", "AWS"] as tech (tech)}
							<Badge variant="outline" class="rounded-none text-[10px] border-border/60">{tech}</Badge>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
