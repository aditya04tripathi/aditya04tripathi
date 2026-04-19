<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "@/lib/utils";
	import {
		buttonVariants,
		type ButtonVariant,
		type ButtonSize,
	} from "@/lib/ui-variants";

	type Props = {
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		href?: string;
		type?: "button" | "submit" | "reset";
		children: Snippet;
	} & Record<string, unknown>;

	let {
		variant = "default",
		size = "default",
		class: className = "",
		href,
		type = "button",
		children,
		...rest
	}: Props = $props();

	const classes = $derived(cn(buttonVariants({ variant, size }), className));
</script>

{#if href}
	<a class={classes} {href} {...rest}>{@render children()}</a>
{:else}
	<button class={classes} {type} {...rest}>{@render children()}</button>
{/if}
