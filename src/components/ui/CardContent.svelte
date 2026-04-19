<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "@/lib/utils";

	let {
		class: className = "",
		children,
		...rest
	}: { class?: string; children: Snippet } & Record<string, unknown> = $props();
</script>

<div class={cn("px-6", className)} {...rest}>{@render children()}</div>
