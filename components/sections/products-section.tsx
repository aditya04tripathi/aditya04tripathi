import { AppWindow, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Title from "@/components/title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { PENNYWISE_LOGO_URL, PROJECTS } from "@/lib/constants";

const pennyWise = PROJECTS.find((p) => p.name === "PennyWise");

export function ProductsSection() {
  if (!pennyWise?.link) return null;

  return (
    <section className="space-y-6 mb-12" id="products">
      <Title title="Products" icon={<AppWindow className="size-6 text-primary" />} />
      <FadeIn>
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden gap-0 py-0 shadow-sm group hover:border-primary/40 transition-all duration-300 rounded-none hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="border-b-0 py-5 sm:py-6">
            <div className="flex flex-row gap-4 sm:gap-6 items-start">
              <div className="relative size-[4.5rem] sm:size-24 shrink-0 overflow-hidden rounded-none border border-border/60 bg-secondary/30">
                <Image
                  src={PENNYWISE_LOGO_URL}
                  alt="PennyWise"
                  fill
                  className="object-contain p-1.5"
                  sizes="(max-width: 640px) 72px, 96px"
                  priority
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div>
                  <CardTitle className="type-h4 flex items-center gap-2 flex-wrap">
                    <span className="text-primary">{">"}</span> {pennyWise.name}
                  </CardTitle>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Private Offline Expense Tracker
                  </p>
                  <Badge
                    variant="outline"
                    className="rounded-none text-[10px] border-primary/30 bg-primary/5 text-primary mt-3"
                  >
                    Live on Google Play
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    asChild
                    className="h-8 font-mono text-xs"
                  >
                    <Link href="/pennywise">View Product</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="h-8 font-mono text-xs"
                  >
                    <Link href={pennyWise.link} target="_blank" rel="noopener noreferrer">
                      <Globe className="size-3.5 mr-2" />
                      Play Store
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </FadeIn>
    </section>
  );
}
