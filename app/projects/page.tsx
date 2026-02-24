import { ProjectsSection } from "@/components/sections/projects-section";

export const metadata = {
  title: "Projects | Aditya Tripathi",
  description: "Archive of software engineering projects and systems.",
};

import { FadeIn } from "@/components/ui/fade-in";
import { PROJECTS } from "@/lib/constants";

import { FolderIcon } from "lucide-react";
import Title from "@/components/title";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
      <FadeIn className="mb-12 border-b border-border/40 pb-6">
        <Title
          title="Project_Archive"
          icon={<FolderIcon className="size-8 text-primary" />}
        />
        <p className="text-muted-foreground max-w-2xl">
          A collection of systems, infrastructure, and full-stack applications 
          engineered for performance and scalability.
        </p>
      </FadeIn>
      <ProjectsSection projects={PROJECTS} noLink noTitle />
    </div>
  );
}
