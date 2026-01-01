import { MoveRight, Terminal } from "lucide-react";
import Link from "next/link";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";

export function EngineeringSection() {
	return (
		<section className="mb-12 border-y border-border/50 py-12 bg-secondary/5">
			<div className="flex flex-col items-start justify-between gap-6">
				<div className="space-y-3">
					<Button asChild size="lg" className="font-mono text-base h-12">
						<Link href="/engineering">
							Read Engineering Logs
							<MoveRight className="ml-2 size-4" />
						</Link>
					</Button>
					<p className="font-mono text-xs text-muted-foreground text-center md:text-right">
						Latest: "Implementing 'use cache' directive in Next.js 16"
					</p>
				</div>
			</div>
		</section>
	);
}
