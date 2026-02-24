import { GitCommit, Terminal, GitBranch } from "lucide-react";
import { format } from "date-fns";
import Title from "@/components/title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ENGINEERING_NOTES } from "@/lib/constants";

export const metadata = {
  title: "Engineering Notes | Aditya Tripathi",
  description:
    "Deep dives into architectural decisions, tradeoffs, and system design choices.",
};

import { FadeIn } from "@/components/ui/fade-in";

export default function EngineeringPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
      <FadeIn className="mb-12 border-b border-border/40 pb-6">
        <Title
          title="Engineering_Logs"
          icon={<GitCommit className="size-8 text-primary" />}
        />
        <p className="text-muted-foreground max-w-2xl">
          A collection of architectural decisions, post-mortems, and technical
          tradeoffs encountered in production.
        </p>
      </FadeIn>

      <div className="space-y-8">
        {ENGINEERING_NOTES.map((note) => (
          <FadeIn key={note.title}>
            <Card className="border-border/60 bg-card/50 backdrop-blur-sm group hover:border-primary/40 transition-all duration-300 rounded-none hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="pb-3 border-b border-border/50">
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant="outline"
                    className="rounded-none border-primary/20 text-primary"
                  >
                    {note.category}
                  </Badge>
                  <span className="text-muted-foreground">
                    {format(new Date(note.date), "LLLL yyyy")}
                  </span>
                </div>
                <CardTitle className="type-h4 flex items-center gap-2">
                  <span className="text-primary">{">"}</span> {note.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="space-y-2">
                  <h4 className="type-h6 flex items-center gap-2">
                    <Terminal className="size-4 text-primary" />
                    Context_Summary
                  </h4>
                  <p className="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3 leading-relaxed">
                    {note.summary}
                  </p>
                </div>

                <div className="rounded-none bg-secondary/30 p-4 border border-border/50">
                  <h4 className="type-h6 flex items-center gap-2 mb-2">
                    <GitCommit className="size-4 text-primary" />
                    The_Decision
                  </h4>
                  <p className="text-sm">{note.decision}</p>
                </div>

                <div className="rounded-none bg-blue-500/5 p-4 border border-blue-500/20">
                  <h4 className="type-h6 flex items-center gap-2 text-blue-400 mb-2">
                    <GitBranch className="size-4" />
                    Tradeoffs_Considered
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {note.tradeoffs.map((t) => (
                      <li key={t}>{t}</li>
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
