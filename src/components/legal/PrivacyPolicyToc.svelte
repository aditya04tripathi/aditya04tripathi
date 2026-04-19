<script lang="ts">
	import { onMount } from "svelte";
	import { cn } from "@/lib/utils";

	const CONTENT_SELECTOR = "#privacy-policy-sections";

	let navItems = $state<{ id: string; label: string }[]>([]);
	let activeSection = $state("");

	onMount(() => {
		const root = document.querySelector(CONTENT_SELECTOR);
		if (!root) return;

		const sections = Array.from(
			root.querySelectorAll<HTMLElement>("section[id]"),
		);
		navItems = sections.map((el) => {
			const h2 = el.querySelector("h2");
			const full = h2?.textContent?.trim() ?? el.id;
			const label = full.replace(/^\d+\.\s*/, "");
			return { id: el.id, label };
		});
		if (sections[0]) activeSection = sections[0].id;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				}
			},
			{ rootMargin: "-20% 0px -35% 0px" },
		);

		for (const el of sections) observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<aside class="hidden w-64 shrink-0 lg:block">
	<div class="sticky top-32">
		<h4
			class="text-muted-foreground mb-6 border-l-2 border-transparent pl-4 text-xs font-bold tracking-widest uppercase"
		>
			Table of Contents
		</h4>
		<nav class="flex flex-col space-y-1">
			{#each navItems as item (item.id)}
				<a
					href="#{item.id}"
					class={cn(
						"block truncate border-l-2 py-2 pl-4 text-sm transition-all",
						activeSection === item.id
							? "border-primary text-foreground bg-primary/5 font-medium"
							: "text-muted-foreground hover:text-foreground hover:border-border border-transparent hover:pl-5",
					)}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</aside>
