import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, GitCommit } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { ENGINEERING_NOTES } from "@/lib/constants";

export const metadata = {
    title: "Engineering Notes | Aditya Tripathi",
    description: "Deep dives into architectural decisions, tradeoffs, and system design choices.",
};

import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/fade-in";

export default function EngineeringPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl min-h-screen sm:pt-28">
            <SiteHeader />
            <FadeIn className="mb-12 border-b border-border/40 pb-6">
                <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all font-mono text-muted-foreground mb-4">
                    <Link href="/">
                        <ArrowLeft className="mr-2 size-4" />
                        Back_to_Terminal
                    </Link>
                </Button>
                <div className="flex items-center gap-3">
                    <GitCommit className="size-8 text-primary" />
                    <h1 className="type-h2 text-foreground">
                        Engineering_Logs
                    </h1>
                </div>
                <p className="text-muted-foreground max-w-2xl text-lg">
                    A collection of architectural decisions, post-mortems, and technical tradeoffs encountered in production.
                </p>
            </FadeIn>

            <div className="space-y-8">
                {ENGINEERING_NOTES.map((note, index) => (
                    <FadeIn key={index}>
                        <Card className="border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline" className="font-mono text-xs border-primary/20 text-primary">
                                        {note.category}
                                    </Badge>
                                    <span className="font-mono text-xs text-muted-foreground">
                                        {note.date}
                                    </span>
                                </div>
                                <CardTitle className="font-mono text-xl sm:text-2xl">
                                    {note.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                                    <p className="leading-relaxed">
                                        {note.summary}
                                    </p>
                                </div>
                                
                                <div className="rounded-md bg-secondary/30 p-4 border border-border/50">
                                    <h4 className="flex items-center gap-2 font-mono font-bold text-sm text-foreground mb-2">
                                        <GitCommit className="size-4 text-primary" />
                                        The_Decision
                                    </h4>
                                    <p className="text-sm">
                                        {note.decision}
                                    </p>
                                </div>

                                 <div className="rounded-md bg-blue-500/5 p-4 border border-blue-500/20">
                                    <h4 className="flex items-center gap-2 font-mono font-bold text-sm text-blue-400 mb-2">
                                        Tradeoffs_Considered
                                    </h4>
                                    <ul className="list-disc list-inside text-sm space-y-1">
                                        {note.tradeoffs.map((t, i) => (
                                            <li key={i}>{t}</li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                ))}
            </div>
        </div>
    );
}

