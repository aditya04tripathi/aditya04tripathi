<script lang="ts">
	import { onMount } from "svelte";
	import { Search } from "lucide-svelte";
	import { getCommandDefinitions, type CommandDefinition } from "@/lib/command-registry";
	import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";
	import { toggleTheme } from "@/lib/theme.svelte";

	let open = $state(false);
	let query = $state("");
	let selected = $state(0);
	let inputEl: HTMLInputElement | undefined = $state();
	let dialogEl: HTMLDivElement | undefined = $state();
	let lastFocus: Element | null = null;

	const all = getCommandDefinitions();

	function filterCommands(q: string): CommandDefinition[] {
		const s = q.trim().toLowerCase();
		if (!s) return all;
		return all.filter(
			(c) =>
				c.label.toLowerCase().includes(s) ||
				c.keywords.toLowerCase().includes(s) ||
				c.id.toLowerCase().includes(s),
		);
	}

	let visible = $derived(filterCommands(query));

	function focusablesInDialog(): HTMLElement[] {
		if (!dialogEl) return [];
		const nodes = dialogEl.querySelectorAll<HTMLElement>(
			'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
		);
		return Array.from(nodes).filter((el) => !el.hasAttribute("hidden") && el.tabIndex !== -1);
	}

	function close() {
		open = false;
		query = "";
		selected = 0;
		queueMicrotask(() => {
			if (lastFocus instanceof HTMLElement) lastFocus.focus();
			lastFocus = null;
		});
	}

	async function exec(c: CommandDefinition) {
		try {
			if (c.kind === "nav") {
				try {
					const { navigate } = await import("astro:transitions/client");
					await navigate(c.href);
				} catch {
					window.location.assign(c.href);
				}
			} else if (c.kind === "external") {
				window.open(c.href, "_blank", "noopener,noreferrer");
			} else if (c.kind === "mailto") {
				window.location.href = c.href;
			} else if (c.kind === "theme") {
				toggleTheme();
			}
		} finally {
			close();
		}
	}

	$effect(() => {
		if (!open) return;
		lockBodyScroll();
		return () => unlockBodyScroll();
	});

	$effect(() => {
		if (visible.length > 0 && selected > visible.length - 1) {
			selected = visible.length - 1;
		}
	});

	$effect(() => {
		if (!open) return;
		const id = visible[selected]?.id;
		if (!id) return;
		queueMicrotask(() => {
			document.getElementById(`cmd-${id}`)?.scrollIntoView({ block: "nearest" });
		});
	});

	onMount(() => {
		const onKey = (e: KeyboardEvent) => {
			const t = e.target as HTMLElement | null;
			const inPalette = t?.closest?.("[data-command-palette-root]");

			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				if (open) {
					close();
					return;
				}
				const inOtherField =
					t &&
					!t.closest?.("[data-command-palette-root]") &&
					(t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
				if (inOtherField) return;
				lastFocus = document.activeElement;
				open = true;
				query = "";
				selected = 0;
				queueMicrotask(() => inputEl?.focus());
				return;
			}

			if (!open) return;

			if (inPalette && e.key === "Escape") {
				e.preventDefault();
				close();
				return;
			}

			if (!inPalette) return;

			if (e.key === "Tab") {
				const els = focusablesInDialog();
				if (els.length === 0) return;
				e.preventDefault();
				const i = els.indexOf(document.activeElement as HTMLElement);
				if (e.shiftKey) {
					const next = i <= 0 ? els.length - 1 : i - 1;
					els[next]?.focus();
				} else {
					const next = i < 0 || i >= els.length - 1 ? 0 : i + 1;
					els[next]?.focus();
				}
				return;
			}

			if (e.key === "ArrowDown") {
				e.preventDefault();
				selected = Math.min(selected + 1, Math.max(visible.length - 1, 0));
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				selected = Math.max(selected - 1, 0);
			} else if (e.key === "Enter") {
				const tag = (e.target as HTMLElement)?.tagName;
				if (tag !== "INPUT") return;
				e.preventDefault();
				const c = visible[selected];
				if (c) void exec(c);
			}
		};

		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});
</script>

{#if open}
	<div
		class="fixed inset-0 z-200 flex items-start justify-center overscroll-none bg-background/80 px-4 pt-[15vh] sm:pt-[12vh]"
		data-command-palette-root
		role="presentation"
		onclick={(e) => {
			if (e.target === e.currentTarget) close();
		}}
	>
		<div
			bind:this={dialogEl}
			data-command-palette-dialog
			role="dialog"
			aria-modal="true"
			aria-label="Command palette"
			class="command-palette-panel flex max-h-[min(85vh,32rem)] w-full max-w-lg flex-col border border-border bg-background shadow-lg rounded-none"
		>
			<div class="flex shrink-0 items-center gap-2 border-b border-border px-3 py-2">
				<span aria-hidden="true"><Search class="size-4 shrink-0 text-muted-foreground" /></span>
				<input
					bind:this={inputEl}
					bind:value={query}
					type="search"
					autocomplete="off"
					spellcheck="false"
					aria-controls="command-list"
					aria-activedescendant={visible[selected] ? `cmd-${visible[selected].id}` : undefined}
					placeholder="Search pages and actions"
					class="h-10 w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-0"
				/>
			</div>
			<ul id="command-list" role="listbox" class="min-h-0 flex-1 overflow-y-auto overscroll-contain py-1">
				{#each visible as item, i (item.id)}
					<li role="presentation">
						<button
							type="button"
							id="cmd-{item.id}"
							role="option"
							aria-selected={i === selected}
							class="flex w-full min-w-0 px-3 py-2.5 text-left text-sm font-medium text-foreground/90 outline-none transition-colors [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 break-words hover:bg-secondary/80 {i ===
							selected
								? 'bg-primary/15 text-foreground'
								: ''}"
							onclick={() => void exec(item)}
							onmouseenter={() => (selected = i)}
						>
							{item.label}
						</button>
					</li>
				{:else}
					<li class="px-3 py-6 text-center text-sm text-muted-foreground">No results match your search.</li>
				{/each}
			</ul>
			{#if visible.length === 0 && query.trim().length > 0}
				<span class="sr-only" role="status" aria-live="polite">No results match your search.</span>
			{/if}
			<div
				class="flex shrink-0 flex-wrap gap-x-4 gap-y-1 border-t border-border px-3 py-2 text-[10px] font-mono uppercase tracking-wide text-muted-foreground"
			>
				<span
					><kbd class="rounded border border-border px-1">↑</kbd><kbd class="rounded border border-border px-1">↓</kbd>
					Move</span
				>
				<span><kbd class="rounded border border-border px-1">↵</kbd> Open</span>
				<span><kbd class="rounded border border-border px-1">Tab</kbd> Focus</span>
				<span><kbd class="rounded border border-border px-1">Esc</kbd> Close</span>
			</div>
		</div>
	</div>
{/if}

<style>
	@media (prefers-reduced-motion: no-preference) {
		.command-palette-panel {
			animation: command-palette-in 180ms cubic-bezier(0.25, 1, 0.5, 1) both;
		}
	}

	@keyframes command-palette-in {
		from {
			opacity: 0;
			transform: translateY(-0.5rem) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>
