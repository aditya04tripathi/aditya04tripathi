<script lang="ts">
	import type { Snippet } from "svelte";

	let { title, icon }: { title: string; icon: Snippet } = $props();
</script>

<div class="flex items-center gap-3 mb-6">
	<div class="bg-primary/10 p-2 rounded-none">{@render icon()}</div>
	<h2 class="type-h2">{title}</h2>
</div>
