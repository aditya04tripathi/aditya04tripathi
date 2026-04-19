"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ShieldCheck, Lock, Share2 } from "lucide-react";

export interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

export function PrivacyPolicyClient({
  sections,
  lastUpdated,
}: {
  sections: Section[];
  lastUpdated: string;
}) {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-screen w-full bg-transparent py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="mx-auto mb-24 max-w-4xl text-center">
          <h2 className="text-primary text-base leading-7 font-semibold tracking-wide uppercase">
            Legal
          </h2>
          <h1 className="text-foreground mt-2 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mt-6 text-lg leading-8 text-balance">
            Detailed information on how we collect, protect, and use your
            personal data.
          </p>
          <div className="text-muted-foreground mt-8 flex items-center justify-center gap-3">
            <span className="bg-border h-px w-12"></span>
            <p className="text-xs font-semibold tracking-widest uppercase">
              Last Updated: {lastUpdated}
            </p>
            <span className="bg-border h-px w-12"></span>
          </div>
        </header>

        <div className="relative flex flex-col gap-12 lg:flex-row lg:gap-24">
          {/* Sidebar Navigation */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-32">
              <h4 className="text-muted-foreground mb-6 border-l-2 border-transparent pl-4 text-xs font-bold tracking-widest uppercase">
                Table of Contents
              </h4>
              <nav className="flex flex-col space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={cn(
                      "block truncate border-l-2 py-2 pl-4 text-sm transition-all",
                      activeSection === section.id
                        ? "border-primary text-foreground bg-primary/5 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:border-border border-transparent hover:pl-5",
                    )}
                  >
                    {section.title.split(". ")[1]}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="mx-auto max-w-3xl flex-1 space-y-24 lg:mx-0">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="group scroll-mt-32"
              >
                <div className="border-primary/20 relative border-l pl-6">
                  <h2 className="text-foreground group-hover:text-primary mb-6 text-2xl font-bold tracking-tight transition-colors">
                    {section.title}
                  </h2>
                  <div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
