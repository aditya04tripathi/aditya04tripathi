import { ProductsSection } from "@/components/sections/products-section";
import { ProjectsSection } from "@/components/sections/projects-section";

export const metadata = {
  title: "Engineering Projects | Aditya Tripathi",
  description:
    "Systems, tools, and infrastructure — scalable backends, web apps, and experiments.",
};

import { FadeIn } from "@/components/ui/fade-in";
import {
  ENGINEERING_PROJECTS_INTRO,
  engineeringProjectsList,
} from "@/lib/constants";

import { FolderIcon } from "lucide-react";
import Title from "@/components/title";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
      <FadeIn>
        <ProductsSection />
      </FadeIn>
      <FadeIn className="mb-12 border-b border-border/40 pb-6">
        <Title
          title="Engineering_Projects"
          icon={<FolderIcon className="size-8 text-primary" />}
        />
        <p className="text-muted-foreground max-w-2xl">
          {ENGINEERING_PROJECTS_INTRO}
        </p>
      </FadeIn>
      <ProjectsSection
        projects={engineeringProjectsList()}
        noLink
        noTitle
        sectionId="engineering-projects-archive"
      />
    </div>
  );
}
