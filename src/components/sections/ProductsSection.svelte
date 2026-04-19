<script lang="ts">
	import { AppWindow, Globe } from "lucide-svelte";
	import Title from "@/components/Title.svelte";
	import Button from "@/components/ui/Button.svelte";
	import Card from "@/components/ui/Card.svelte";
	import CardHeader from "@/components/ui/CardHeader.svelte";
	import CardTitle from "@/components/ui/CardTitle.svelte";
	import Badge from "@/components/ui/Badge.svelte";
	import { PENNYWISE_LOGO_URL, PROJECTS } from "@/lib/constants";

	const pennyWise = PROJECTS.find((p) => p.name === "PennyWise");
</script>

{#if pennyWise?.link}
	<section class="space-y-6 mb-12" id="products">
		<Title title="Products">
			{#snippet icon()}
				<AppWindow class="size-6 text-primary" />
			{/snippet}
		</Title>
		<Card
			class="border-border/60 bg-card/80 overflow-hidden gap-0 py-0 shadow-sm group hover:border-primary/40 transition-[transform,box-shadow,border-color] duration-300 rounded-none hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0"
		>
			<CardHeader class="border-b-0 py-5 sm:py-6">
					<div class="flex flex-row gap-4 sm:gap-6 items-start">
						<div
							class="vt-morph vt-pennywise-mark relative size-[4.5rem] sm:size-24 shrink-0 overflow-hidden rounded-none border border-border/60 bg-secondary/30"
						>
							<img
								src={PENNYWISE_LOGO_URL}
								alt="PennyWise"
								width="384"
								height="768"
								class="absolute inset-0 size-full object-contain p-1.5"
								loading="eager"
								decoding="async"
							/>
						</div>
						<div class="flex min-w-0 flex-1 flex-col gap-3">
							<div>
								<CardTitle class="type-h4 flex items-center gap-2 flex-wrap">
									<span class="text-primary">{">"}</span>
									{pennyWise.name}
								</CardTitle>
								<p class="text-muted-foreground mt-1 text-sm">Private Offline Expense Tracker</p>
								<Badge
									variant="outline"
									class="rounded-none text-[10px] border-primary/30 bg-primary/5 text-primary mt-3"
								>
									Live on Google Play
								</Badge>
							</div>
							<div class="flex flex-wrap items-center gap-2">
								<Button size="sm" href="/pennywise" class="h-8 font-mono text-xs">View Product</Button>
								<Button
									variant="outline"
									size="sm"
									href={pennyWise.link}
									target="_blank"
									rel="noopener noreferrer"
									class="h-8 font-mono text-xs"
								>
									<Globe class="size-3.5 mr-2" />
									Play Store
								</Button>
							</div>
						</div>
					</div>
			</CardHeader>
		</Card>
	</section>
{/if}
