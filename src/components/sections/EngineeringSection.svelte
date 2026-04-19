<script lang="ts">
	import { MoveRight } from "lucide-svelte";
	import Button from "@/components/ui/Button.svelte";
</script>

<section class="mb-12 border-y border-border/50 py-12 bg-secondary/5">
	<div class="flex flex-col items-start justify-between md:items-center gap-6">
		<div class="space-y-3 w-full md:w-2xl">
			<Button size="lg" href="/engineering" class="w-full font-mono text-base h-12">
				Read Engineering Logs
				<MoveRight class="ml-2 size-4" />
			</Button>
			<p class="font-mono text-xs text-muted-foreground text-center md:text-right">
				Latest: "Implementing 'use cache' directive in Next.js 16"
			</p>
		</div>
	</div>
</section>
