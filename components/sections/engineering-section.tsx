import { Terminal, MoveRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EngineeringSection() {
	return (
		<section className="mb-12 border-y border-border/50 py-12 bg-secondary/5">
			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-xl">
                    <div className="flex items-center gap-3">
                         <div className="bg-primary/10 p-2 rounded-md">
                            <Terminal className="size-6 text-primary" />
                         </div>
                         <h2 className="font-mono font-bold text-3xl tracking-tight">
                            Engineering_Insights
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        I don't just write code; I make decisions. Explore my technical logs on architecture, tradeoffs, and system design.
                    </p>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto">
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
