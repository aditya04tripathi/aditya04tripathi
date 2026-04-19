<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "@/lib/utils";
	import { badgeVariants, type BadgeVariant } from "@/lib/ui-variants";

	let {
		variant = "default",
		class: className = "",
		children,
		...rest
	}: {
		variant?: BadgeVariant;
		class?: string;
		children: Snippet;
	} & Record<string, unknown> = $props();

	const classes = $derived(cn(badgeVariants({ variant }), className));
</script>

<span class={classes} {...rest}>{@render children()}</span>
