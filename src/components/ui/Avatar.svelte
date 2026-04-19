<script lang="ts">
	import { cn } from "@/lib/utils";

	let {
		class: className = "",
		src = "",
		alt = "",
		fallback = "",
		...rest
	}: {
		class?: string;
		src?: string;
		alt?: string;
		fallback?: string;
	} & Record<string, unknown> = $props();

	let failed = $state(false);
</script>

<div
	class={cn(
		"group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none",
		className,
	)}
	{...rest}
>
	{#if src && !failed}
		<img
			{src}
			{alt}
			class="aspect-square size-full object-cover"
			onerror={() => (failed = true)}
		/>
	{:else}
		<div
			class="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm"
		>
			{fallback}
		</div>
	{/if}
</div>
