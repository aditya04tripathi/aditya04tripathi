<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "@/lib/utils";
	import Badge from "@/components/ui/Badge.svelte";
	import type { BadgeVariant } from "@/lib/ui-variants";

	let {
		variant = "secondary",
		class: className = "",
		children,
	}: {
		variant?: BadgeVariant;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<Badge variant={variant} class={cn("rounded-none font-mono text-xs", className)}>
	{@render children()}
</Badge>
