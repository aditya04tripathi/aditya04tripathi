import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Globe, Shield } from "lucide-react";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionDivider } from "@/components/ui/section-divider";
import {
  CREATOR_INFO,
  PENNYWISE_PRIVACY_PATH,
  PROJECTS,
  SITE_CONFIG,
} from "@/lib/constants";

const pennyWise = PROJECTS.find((p) => p.name === "PennyWise");

export const metadata: Metadata = {
  title: `PennyWise | ${CREATOR_INFO.name}`,
  description:
    "Private offline expense tracker. Local-first finance on your device — no account, no cloud storage of your transactions.",
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: { canonical: "/pennywise" },
  openGraph: {
    title: "PennyWise — Private Offline Expense Tracker",
    description:
      "Track your finances with full privacy. No cloud. No account. No data leaving your device.",
    url: `${SITE_CONFIG.url}/pennywise`,
    ...(pennyWise
      ? {
          images: [
            { url: `${SITE_CONFIG.url}${pennyWise.image}`, width: 1200, height: 630 },
          ],
        }
      : {}),
  },
};

const features = [
  {
    title: "Offline-first",
    body: "Record income, expenses, and budgets without a network connection.",
  },
  {
    title: "On-device storage",
    body: "Financial data stays in SQLite on your phone — not on our servers.",
  },
  {
    title: "Receipts and recurring",
    body: "Attach receipts, schedule recurring transactions, export to CSV when you need portability.",
  },
  {
    title: "Biometric lock",
    body: "Optional PIN and biometric unlock so your ledger stays private if you share the device.",
  },
];

export default function PennyWisePage() {
  if (!pennyWise?.link) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
      <FadeIn className="pt-8 pb-12 border-b border-border/40">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
          Product
        </p>
        <h1 className="type-h1 mb-4">PennyWise</h1>
        <p className="type-h3 text-muted-foreground mb-6">
          Private Offline Expense Tracker
        </p>
        <p className="type-body max-w-2xl text-foreground/80 leading-relaxed">
          Track your finances with full privacy. No cloud. No account. No data
          leaving your device.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Button size="lg" className="rounded-none font-mono font-bold h-12 px-8" asChild>
            <Link href={pennyWise.link} target="_blank" rel="noopener noreferrer">
              <Globe className="size-4 mr-2" />
              View on Play Store
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-none font-mono font-bold h-12 px-8"
            asChild
          >
            <Link href={PENNYWISE_PRIVACY_PATH}>Privacy Policy</Link>
          </Button>
        </div>
      </FadeIn>

      <SectionDivider />

      <section className="py-12 space-y-6">
        <Title
          title="Features"
          icon={<CheckCircle2 className="size-6 text-primary" />}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <FadeIn key={f.title}>
              <Card className="rounded-none border-border/60 bg-card/50">
                <CardHeader className="pb-2">
                  <CardTitle className="type-h6 font-mono">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="py-12 space-y-4">
        <Title title="Privacy" icon={<Shield className="size-6 text-primary" />} />
        <FadeIn>
          <Card className="rounded-none border-border/60 bg-secondary/5">
            <CardContent className="pt-6 pb-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                PennyWise is built with a local-first architecture.
              </p>
              <p>
                Your financial data stays on your device and is not stored on
                PennyWise servers.
              </p>
              <p>
                The app may display ads using Google AdMob, which may collect
                limited device-level data.
              </p>
              <p>
                <Link
                  href={PENNYWISE_PRIVACY_PATH}
                  className="text-primary font-mono underline underline-offset-4 hover:text-primary/90"
                >
                  Read the full privacy policy →
                </Link>
              </p>
            </CardContent>
          </Card>
        </FadeIn>
      </section>

      <SectionDivider />

      <section className="py-12 space-y-4 mb-12">
        <Title title="Trust" icon={<CheckCircle2 className="size-6 text-primary" />} />
        <FadeIn>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary font-mono">{">"}</span>
              No account required
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-mono">{">"}</span>
              No bank connection
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-mono">{">"}</span>
              Offline-first by design
            </li>
          </ul>
        </FadeIn>
      </section>
    </div>
  );
}
