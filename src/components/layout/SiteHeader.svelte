<script lang="ts">
	import { Menu, X } from "lucide-svelte";
	import { fly, fade } from "svelte/transition";
	import { onMount } from "svelte";
	import Avatar from "@/components/ui/Avatar.svelte";
	import Button from "@/components/ui/Button.svelte";
	import SettingsWidget from "@/components/SettingsWidget.svelte";
	import IconGithub from "@/components/icons/IconGithub.svelte";
	import IconLinkedin from "@/components/icons/IconLinkedin.svelte";
	import { CREATOR_INFO } from "@/lib/constants";
	import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";
	import { initTextSize } from "@/lib/text-size.svelte";
	import { flyInParams, prefersReducedMotion } from "@/lib/motion";

	let isMobileMenuOpen = $state(false);

	onMount(() => {
		initTextSize();
	});

	$effect(() => {
		if (!isMobileMenuOpen) return;
		lockBodyScroll();
		return () => unlockBodyScroll();
	});

	$effect(() => {
		if (typeof document === "undefined" || !isMobileMenuOpen) return;

		const menu = document.getElementById("mobile-menu");
		if (!menu) return;

		const focusable = menu.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
		);
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		first?.focus();

		const onKeydown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				isMobileMenuOpen = false;
				document.getElementById("mobile-menu-button")?.focus();
				return;
			}
			if (e.key !== "Tab" || focusable.length === 0) return;
			if (e.shiftKey) {
				if (document.activeElement === first) {
					e.preventDefault();
					last?.focus();
				}
			} else if (document.activeElement === last) {
				e.preventDefault();
				first?.focus();
			}
		};

		document.addEventListener("keydown", onKeydown);
		return () => document.removeEventListener("keydown", onKeydown);
	});

	const menuFade = $derived(prefersReducedMotion() ? { duration: 0 } : { duration: 200 });
	const menuFly = $derived(prefersReducedMotion() ? { duration: 0, y: 0 } : { y: -20, duration: 200 });
</script>

<header
	class="fixed top-0 left-0 right-0 w-full z-50 flex justify-center px-6 py-6 pointer-events-none"
>
	<div
		in:fly={flyInParams({ y: -100, duration: 400, opacity: 0 })}
		class="w-full max-w-5xl flex items-center justify-between pointer-events-auto bg-background/85 border border-border/40 px-2 py-2 shadow-sm relative z-50"
	>
		<a
			href="/"
			class="flex items-center gap-3 group px-2"
			onclick={() => (isMobileMenuOpen = false)}
		>
			<Avatar
				class="h-9 w-9 rounded-none border border-border/50"
				src={CREATOR_INFO.avatar}
				alt={`${CREATOR_INFO.name} — profile photo`}
				fallback={CREATOR_INFO.name.charAt(0)}
			/>
			<div class="flex flex-col pr-2">
				<span class="font-mono font-bold text-sm leading-none tracking-tight">{CREATOR_INFO.name}</span>
				<span
					class="text-[10px] text-muted-foreground font-mono leading-none mt-0.5 group-hover:text-primary transition-colors"
				>
					Software Engineer
				</span>
			</div>
		</a>

		<div class="md:hidden">
			<Button
				id="mobile-menu-button"
				variant="ghost"
				size="icon"
				type="button"
				aria-expanded={isMobileMenuOpen}
				aria-controls="mobile-menu"
				aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
				onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				class="rounded-none hover:bg-secondary/50 min-h-11 min-w-11"
			>
				{#if isMobileMenuOpen}
					<span aria-hidden="true"><X class="size-5" /></span>
				{:else}
					<span aria-hidden="true"><Menu class="size-5" /></span>
				{/if}
			</Button>
		</div>

		<div class="hidden md:flex items-center gap-1">
			<Button
				variant="ghost"
				size="sm"
				href="/pennywise"
				class="font-mono text-xs hover:bg-secondary/80 transition-colors duration-200"
			>
				PennyWise
			</Button>
			<Button
				variant="ghost"
				size="sm"
				href="/projects"
				class="font-mono text-xs hover:bg-secondary/80 transition-colors duration-200"
			>
				Projects
			</Button>
			<Button
				variant="ghost"
				size="sm"
				href="/blog"
				class="font-mono text-xs hover:bg-secondary/80 transition-colors duration-200"
			>
				Blog
			</Button>

			<div class="w-px h-4 bg-border/50 mx-1"></div>

			<Button
				variant="ghost"
				size="icon"
				href={CREATOR_INFO.github}
				class="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors duration-200"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub profile"
			>
				<span aria-hidden="true"><IconGithub class="size-4" /></span>
			</Button>
			<Button
				variant="ghost"
				size="icon"
				href={CREATOR_INFO.linkedin}
				class="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors duration-200"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn profile"
			>
				<span aria-hidden="true"><IconLinkedin class="size-4" /></span>
			</Button>

			<div class="ml-1 mr-1">
				<SettingsWidget />
			</div>

			<Button
				size="sm"
				href="mailto:me@adityatripathi.dev"
				class="h-8 px-4 text-xs font-mono font-bold ml-1 transition-shadow duration-200 hover:shadow-md"
			>
				Contact
			</Button>
		</div>
	</div>

	{#if isMobileMenuOpen}
		<div
			id="mobile-menu"
			role="dialog"
			aria-modal="true"
			aria-label="Site navigation"
			transition:fade={menuFade}
			class="fixed inset-0 top-0 left-0 w-full h-screen bg-background/95 z-40 flex flex-col items-center justify-center pointer-events-auto md:hidden"
		>
			<nav class="flex flex-col items-center gap-6 p-6" transition:fly={menuFly}>
				<a href="/pennywise" onclick={() => (isMobileMenuOpen = false)}>
					<span class="text-2xl font-mono font-bold hover:text-primary transition-colors">PennyWise</span>
				</a>
				<a href="/projects" onclick={() => (isMobileMenuOpen = false)}>
					<span class="text-2xl font-mono font-bold hover:text-primary transition-colors">Projects</span>
				</a>
				<a href="/blog" onclick={() => (isMobileMenuOpen = false)}>
					<span class="text-2xl font-mono font-bold hover:text-primary transition-colors">Blog</span>
				</a>
				<a href="mailto:me@adityatripathi.dev" onclick={() => (isMobileMenuOpen = false)}>
					<span class="text-2xl font-mono font-bold hover:text-primary transition-colors">Contact</span>
				</a>

				<div class="w-16 h-px bg-border my-4"></div>

				<div class="flex items-center gap-6">
					<a
						href={CREATOR_INFO.github}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub profile"
					>
						<span aria-hidden="true">
							<IconGithub class="size-6 text-muted-foreground hover:text-foreground transition-colors" />
						</span>
					</a>
					<a
						href={CREATOR_INFO.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn profile"
					>
						<span aria-hidden="true">
							<IconLinkedin class="size-6 text-muted-foreground hover:text-foreground transition-colors" />
						</span>
					</a>
				</div>

				<div class="mt-4">
					<SettingsWidget />
				</div>
			</nav>
		</div>
	{/if}
</header>
