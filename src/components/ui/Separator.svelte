<script lang="ts">
	import { cn } from "@/lib/utils";

	let {
		class: className = "",
		orientation = "horizontal",
		...rest
	}: {
		class?: string;
		orientation?: "horizontal" | "vertical";
	} & Record<string, unknown> = $props();
</script>

<div
	role="separator"
	aria-orientation={orientation}
	class={cn(
		"bg-border shrink-0",
		orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
		className,
	)}
	{...rest}
></div>
