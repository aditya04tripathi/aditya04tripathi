<script lang="ts">
	import { format } from "date-fns";
	import { BookOpen, MoveRight } from "lucide-svelte";
	import Title from "@/components/Title.svelte";
	import Badge from "@/components/ui/Badge.svelte";
	import Card from "@/components/ui/Card.svelte";
	import CardContent from "@/components/ui/CardContent.svelte";
	import CardHeader from "@/components/ui/CardHeader.svelte";
	import CardTitle from "@/components/ui/CardTitle.svelte";
	import Button from "@/components/ui/Button.svelte";

	interface BlogPostSummary {
		slug: string;
		title: string;
		description: string;
		category?: string;
		date: string;
	}

	let { posts }: { posts: BlogPostSummary[] } = $props();
</script>

<div class="container mx-auto px-4 sm:px-6 max-w-4xl">
	<div class="mb-12 border-b border-border/40 pb-6">
		<Title title="Blog">
			{#snippet icon()}
				<BookOpen class="size-8 text-primary" />
			{/snippet}
		</Title>
		<p class="text-muted-foreground max-w-2xl">
			Technical writing on architecture, frontend systems, and shipping production software.
		</p>
	</div>

	<div class="space-y-8">
		{#each posts as post, index (post.slug)}
			<Card
				class="border-border/60 backdrop-blur-sm group hover:border-primary/40 transition-all duration-300 rounded-none hover:-translate-y-1 hover:shadow-lg {index % 2 === 0
					? 'bg-card/50'
					: 'bg-card/40 border-t-2 border-t-primary/20'}"
			>
				<CardHeader class="pb-3 border-b border-border/50">
					<div class="flex flex-wrap justify-between items-start gap-2 mb-2">
						{#if post.category}
							<Badge variant="outline" class="rounded-none border-primary/20 text-primary">
								{post.category}
							</Badge>
						{:else}
							<span></span>
						{/if}
						<span class="text-muted-foreground text-sm">{format(new Date(post.date), "LLLL d, yyyy")}</span>
					</div>
					<CardTitle class="type-h4 flex items-center gap-2">
						<span class="text-primary">{">"}</span>
						<a
							href={`/blog/${post.slug}`}
							class="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
						>
							{post.title}
						</a>
					</CardTitle>
				</CardHeader>
				<CardContent class="pt-4 space-y-4">
					<p class="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3 leading-relaxed">
						{post.description}
					</p>
					<Button variant="outline" size="sm" href={`/blog/${post.slug}`} class="rounded-none font-mono text-xs group/btn">
						Read post
						<MoveRight class="ml-2 size-3 transition-transform group-hover/btn:translate-x-0.5" />
					</Button>
				</CardContent>
			</Card>
		{/each}
	</div>
</div>
