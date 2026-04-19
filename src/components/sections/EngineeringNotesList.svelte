<script lang="ts">
	import { format } from "date-fns";
	import { GitCommitVertical, Terminal, GitBranch } from "lucide-svelte";
	import Title from "@/components/Title.svelte";
	import Badge from "@/components/ui/Badge.svelte";
	import Card from "@/components/ui/Card.svelte";
	import CardContent from "@/components/ui/CardContent.svelte";
	import CardHeader from "@/components/ui/CardHeader.svelte";
	import CardTitle from "@/components/ui/CardTitle.svelte";

	interface EngineeringNoteSerialized {
		title: string;
		category: string;
		date: string;
		summary: string;
		decision: string;
		tradeoffs: string[];
	}

	let { notes }: { notes: EngineeringNoteSerialized[] } = $props();
</script>

<div class="container mx-auto px-4 sm:px-6 max-w-4xl">
	<div class="mb-12 border-b border-border/40 pb-6">
		<Title title="Engineering logs">
			{#snippet icon()}
				<GitCommitVertical class="size-8 text-primary" />
			{/snippet}
		</Title>
		<p class="text-muted-foreground max-w-2xl">
			A collection of architectural decisions, post-mortems, and technical tradeoffs encountered in production.
		</p>
	</div>

	<div class="space-y-8">
		{#each notes as note, index (note.title)}
			<Card
				class="border-border/60 backdrop-blur-sm group hover:border-primary/40 transition-all duration-300 rounded-none hover:-translate-y-1 hover:shadow-lg {index % 2 === 0
					? 'bg-card/50'
					: 'bg-card/40 border-t-2 border-t-primary/20'}"
			>
				<CardHeader class="pb-3 border-b border-border/50">
					<div class="flex justify-between items-start mb-2">
						<Badge variant="outline" class="rounded-none border-primary/20 text-primary">
							{note.category}
						</Badge>
						<span class="text-muted-foreground">{format(new Date(note.date), "LLLL yyyy")}</span>
					</div>
					<CardTitle class="type-h4 flex items-center gap-2">
						<span class="text-primary">{">"}</span>
						{note.title}
					</CardTitle>
				</CardHeader>
				<CardContent class="pt-4 space-y-4">
					<div class="space-y-2">
						<h4 class="type-h6 flex items-center gap-2">
							<Terminal class="size-4 text-primary" />
							Context summary
						</h4>
						<p class="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3 leading-relaxed">
							{note.summary}
						</p>
					</div>

					<div class="rounded-none bg-secondary/30 p-4 border border-border/50">
						<h4 class="type-h6 flex items-center gap-2 mb-2">
							<GitCommitVertical class="size-4 text-primary" />
							The decision
						</h4>
						<p class="text-sm">{note.decision}</p>
					</div>

					<div class="rounded-none bg-blue-500/5 p-4 border border-blue-500/20">
						<h4 class="type-h6 flex items-center gap-2 text-blue-400 mb-2">
							<GitBranch class="size-4" />
							Tradeoffs considered
						</h4>
						<ul class="list-disc list-inside space-y-1 text-sm text-muted-foreground">
							{#each note.tradeoffs as t (t)}
								<li>{t}</li>
							{/each}
						</ul>
					</div>
				</CardContent>
			</Card>
		{/each}
	</div>
</div>
