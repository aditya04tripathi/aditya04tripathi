<script lang="ts">
	import { onMount } from "svelte";
	import Button from "@/components/ui/Button.svelte";
	import { textSizeState, setTextSize, type TextSize } from "@/lib/text-size.svelte";

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});

	function pickSize(s: TextSize) {
		setTextSize(s);
	}
</script>

{#if mounted}
	<div
		role="toolbar"
		aria-label="Display settings"
		class="flex items-center gap-1 border border-border/40 rounded-none p-1 bg-background/85"
	>
		<Button
			variant={textSizeState.size === "small" ? "secondary" : "ghost"}
			size="icon"
			type="button"
			class="min-h-11 min-w-11 h-11 w-11"
			aria-label="Small text size"
			aria-pressed={textSizeState.size === "small"}
			onclick={() => pickSize("small")}
		>
			<span class="text-xs font-bold">A</span>
		</Button>
		<Button
			variant={textSizeState.size === "normal" ? "secondary" : "ghost"}
			size="icon"
			type="button"
			class="min-h-11 min-w-11 h-11 w-11"
			aria-label="Normal text size"
			aria-pressed={textSizeState.size === "normal"}
			onclick={() => pickSize("normal")}
		>
			<span class="text-sm font-bold">A</span>
		</Button>
		<Button
			variant={textSizeState.size === "large" ? "secondary" : "ghost"}
			size="icon"
			type="button"
			class="min-h-11 min-w-11 h-11 w-11"
			aria-label="Large text size"
			aria-pressed={textSizeState.size === "large"}
			onclick={() => pickSize("large")}
		>
			<span class="text-lg font-bold">A</span>
		</Button>
	</div>
{/if}
