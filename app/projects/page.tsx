import Link from "next/link"
import DocumentShell from "@/components/seo/DocumentShell"
import { projects } from "@/data/portfolio"
import { metadataFor } from "@/lib/metadata"

export const metadata = metadataFor(
  "Engineering projects",
  "Explore Aditya Tripathi's ScamShield, Vapor Vault, DevEvent and Gnosis AI projects, with system architecture, technology and engineering decisions.",
  "/projects"
)

export default function ProjectsPage() {
  return (
    <DocumentShell
      eyebrow="Selected systems / 01—04"
      title="The systems behind the experience."
      intro="Four different problems. Four complete systems. Follow the path from an input to an outcome, and explore the engineering decisions in between."
    >
      <section
        className="document-section"
        aria-label="Selected engineering projects"
      >
        {projects.map((project, index) => (
          <article className="document-card" key={project.slug}>
            <p className="document-eyebrow">
              {String(index + 1).padStart(2, "0")} / {project.category} /{" "}
              {project.year}
            </p>
            <h2>
              <Link href={`/projects/${project.slug}`}>
                {project.title} <span aria-hidden="true">↗</span>
              </Link>
            </h2>
            <p>{project.description}</p>
            <ul className="tags" aria-label={`${project.title} technology`}>
              {project.technology.map((technology) => (
                <li className="tag" key={technology}>
                  {technology}
                </li>
              ))}
            </ul>
            <Link className="text-link" href={`/projects/${project.slug}`}>
              Explore {project.title} architecture{" "}
              <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </section>
    </DocumentShell>
  )
}
