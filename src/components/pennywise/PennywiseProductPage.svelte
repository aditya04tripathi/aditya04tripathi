<script lang="ts">
	import { CircleCheck, Globe, Shield } from "lucide-svelte";
	import Title from "@/components/Title.svelte";
	import Button from "@/components/ui/Button.svelte";
	import Card from "@/components/ui/Card.svelte";
	import CardContent from "@/components/ui/CardContent.svelte";
	import CardHeader from "@/components/ui/CardHeader.svelte";
	import CardTitle from "@/components/ui/CardTitle.svelte";
	import SectionDivider from "@/components/ui/SectionDivider.svelte";
	import { PENNYWISE_LOGO_URL, PENNYWISE_PRIVACY_PATH, type Project } from "@/lib/constants";

	const features = [
		{
			title: "Offline-first",
			body: "Record income, expenses, and budgets without a network connection.",
		},
		{
			title: "On-device storage",
			body: "Financial data stays in SQLite on your phone — not on our servers.",
		},
		{
			title: "Receipts and recurring",
			body: "Attach receipts, schedule recurring transactions, export to CSV when you need portability.",
		},
		{
			title: "Biometric lock",
			body: "Optional PIN and biometric unlock so your ledger stays private if you share the device.",
		},
	];

	let { pennyWise }: { pennyWise: Project } = $props();
</script>

{#if pennyWise.link}
	<div class="container mx-auto px-4 sm:px-6 max-w-4xl">
		<div class="pt-8 pb-12 border-b border-border/40">
			<div class="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
				<div
					class="vt-morph vt-pennywise-mark relative size-[4.5rem] sm:size-24 shrink-0 overflow-hidden rounded-none border border-border/60 bg-secondary/30"
				>
					<img
						src={PENNYWISE_LOGO_URL}
						alt="PennyWise app icon"
						width="384"
						height="768"
						class="absolute inset-0 size-full object-contain p-1.5"
						loading="eager"
						decoding="async"
					/>
				</div>
				<div class="min-w-0 flex-1">
					<p class="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Product</p>
					<h1 class="type-h1 mb-4">PennyWise</h1>
					<p class="type-h3 text-muted-foreground mb-6">Private Offline Expense Tracker</p>
					<p class="type-body max-w-2xl leading-relaxed text-foreground/90">
						Track your finances with full privacy. No cloud. No account. No data leaving your device.
					</p>
					<div class="flex flex-wrap gap-3 mt-8">
						<Button
							size="lg"
							class="rounded-none font-mono font-bold h-12 px-8"
							href={pennyWise.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Globe class="size-4 mr-2" />
							View on Play Store
						</Button>
						<Button
							variant="outline"
							size="lg"
							class="rounded-none font-mono font-bold h-12 px-8"
							href={PENNYWISE_PRIVACY_PATH}
						>
							Privacy Policy
						</Button>
					</div>
				</div>
			</div>
		</div>

		<SectionDivider />

		<section class="py-12 space-y-6">
			<Title title="Features">
				{#snippet icon()}
					<CircleCheck class="size-6 text-primary" />
				{/snippet}
			</Title>
			<div class="grid gap-4 sm:grid-cols-2">
				{#each features as f (f.title)}
					<Card class="rounded-none border-border/60 bg-card/50">
						<CardHeader class="pb-2">
							<CardTitle class="type-h6 font-mono">{f.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p class="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
						</CardContent>
					</Card>
				{/each}
			</div>
		</section>

		<SectionDivider />

		<section class="py-12 space-y-4">
			<Title title="Privacy">
				{#snippet icon()}
					<Shield class="size-6 text-primary" />
				{/snippet}
			</Title>
			<Card class="rounded-none border-border/60 bg-secondary/5">
				<CardContent class="pt-6 pb-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>PennyWise is built with a local-first architecture.</p>
					<p>Your financial data stays on your device and is not stored on PennyWise servers.</p>
					<p>The app may display ads using Google AdMob, which may collect limited device-level data.</p>
					<p>
						<a
							href={PENNYWISE_PRIVACY_PATH}
							class="text-primary font-mono underline underline-offset-4 hover:text-primary/90"
						>
							Read the full privacy policy →
						</a>
					</p>
				</CardContent>
			</Card>
		</section>

		<SectionDivider />

		<section class="py-12 space-y-4 mb-12">
			<Title title="Trust">
				{#snippet icon()}
					<CircleCheck class="size-6 text-primary" />
				{/snippet}
			</Title>
			<ul class="space-y-3 text-sm text-muted-foreground">
				<li class="flex gap-2">
					<span class="text-primary font-mono">{">"}</span>
					No account required
				</li>
				<li class="flex gap-2">
					<span class="text-primary font-mono">{">"}</span>
					No bank connection
				</li>
				<li class="flex gap-2">
					<span class="text-primary font-mono">{">"}</span>
					Offline-first by design
				</li>
			</ul>
		</section>
	</div>
{/if}
