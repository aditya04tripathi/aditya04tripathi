<script lang="ts">
	import { Mail } from "lucide-svelte";
	import Button from "@/components/ui/Button.svelte";
	import IconGithub from "@/components/icons/IconGithub.svelte";
	import { CREATOR_INFO, PENNYWISE_PRIVACY_PATH } from "@/lib/constants";
</script>

<section class="py-24 sm:py-32">
	<div class="flex flex-col items-center text-center space-y-8">
			<div class="space-y-4 max-w-3xl">
				<h2 class="type-h2">
					Let's_Build_Something
					<span class="block text-primary mt-2">Extraordinary</span>
				</h2>
				<p class="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
					I'm actively seeking software engineering opportunities and open to collaborations. Whether you have a
					project in mind, need help with development, or just want to connect, feel free to reach out!
				</p>
			</div>

			<div class="flex flex-wrap items-center justify-center gap-4">
				<Button size="lg" href="mailto:me@adityatripathi.dev" class="h-12 px-8 text-base font-mono font-bold">
					<Mail class="mr-2 size-5" />
					Get_In_Touch
				</Button>
				<Button
					variant="outline"
					size="lg"
					href={CREATOR_INFO.github}
					target="_blank"
					rel="noopener noreferrer"
					class="h-12 px-8 text-base font-mono"
				>
					<IconGithub class="mr-2 size-5" />
					GitHub
				</Button>
			</div>

			<div class="pt-12 text-sm text-muted-foreground font-mono space-y-2">
				<p>
					<a
						href={PENNYWISE_PRIVACY_PATH}
						class="text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary"
					>
						Privacy Policy (PennyWise)
					</a>
				</p>
				<p>
					Designed & Built by
					<a
						href={CREATOR_INFO.githubRepo}
						target="_blank"
						rel="noopener noreferrer"
						class="text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary"
					>
						{CREATOR_INFO.name}
					</a>
				</p>
				<p class="text-xs opacity-60">© {new Date().getFullYear()} • MIT License</p>
			</div>
		</div>
</section>
