import Link from "next/link"
import { notFound } from "next/navigation"
import ProjectJourney from "@/components/projects/ProjectJourney"
import JsonLd from "@/components/seo/JsonLd"
import { profile, projects } from "@/data/portfolio"
import { personId, seo } from "@/data/seo"
import { metadataFor } from "@/lib/metadata"

type ProjectPageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) notFound()

  return metadataFor(
    `${project.title} — ${project.category}`,
    project.description,
    `/projects/${project.slug}`
  )
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) notFound()
  const nextProject =
    projects[(projects.indexOf(project) + 1) % projects.length]
  const canonical = `${seo.url}/projects/${project.slug}`

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": project.source ? "SoftwareSourceCode" : "CreativeWork",
        "@id": `${canonical}#project`,
        name: project.title,
        description: project.description,
        url: canonical,
        author: { "@id": personId, "@type": "Person", name: profile.name },
        about: project.category,
        keywords: project.technology.join(", "),
        ...(project.source ? { codeRepository: project.source } : {}),
        ...(project.live ? { sameAs: project.live } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: seo.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${seo.url}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: canonical,
          },
        ],
      },
    ],
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <ProjectJourney
        key={project.slug}
        projectIndex={projects.indexOf(project)}
        title={project.title}
        category={project.category}
      >
        <section
          className="pj-panel"
          data-stage="0"
          id="project-stage-0"
          aria-labelledby="project-overview-title"
        >
          <div className="pj-panel-content">
            <p className="pj-kicker">
              01 / Project case study / {project.year}
            </p>
            <h1 className="pj-title" id="project-overview-title">
              {project.title}
            </h1>
            <p className="pj-subtitle">{project.category}</p>
            <p className="pj-description">{project.description}</p>
            <p className="pj-kicker">Explore the problem. Follow the system.</p>
          </div>
        </section>

        <section
          className="pj-panel"
          data-stage="1"
          id="project-stage-1"
          aria-labelledby="project-problem-title"
        >
          <div className="pj-panel-content">
            <p className="pj-kicker">02 / The problem</p>
            <h2 className="pj-title pj-stage-title" id="project-problem-title">
              A reason to build.
            </h2>
            <p className="pj-description">{project.problem}</p>
          </div>
        </section>

        <section
          className="pj-panel"
          data-stage="2"
          id="project-stage-2"
          aria-labelledby="project-architecture-title"
        >
          <div className="pj-panel-content">
            <p className="pj-kicker">03 / System design</p>
            <h2
              className="pj-title pj-stage-title"
              id="project-architecture-title"
            >
              Follow the architecture.
            </h2>
            <p className="pj-description">{project.architecture}</p>
            <ol
              className="pj-pipeline"
              aria-label={`${project.title} processing flow`}
            >
              {project.pipeline.map((stage, index) => (
                <li key={`${stage}-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {stage}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="pj-panel"
          data-stage="3"
          id="project-stage-3"
          aria-labelledby="project-decisions-title"
        >
          <div className="pj-panel-content">
            <p className="pj-kicker">04 / Engineering decisions</p>
            <h2
              className="pj-title pj-stage-title"
              id="project-decisions-title"
            >
              The choices inside.
            </h2>
            <ol className="pj-decisions">
              {project.decisions.map((decision, index) => (
                <li className="pj-decision" key={decision}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{decision}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="pj-panel"
          data-stage="4"
          id="project-stage-4"
          aria-labelledby="project-technology-title"
        >
          <div className="pj-panel-content">
            <p className="pj-kicker">05 / Technology</p>
            <h2
              className="pj-title pj-stage-title"
              id="project-technology-title"
            >
              A stack with purpose.
            </h2>
            <p className="pj-description">
              The technologies connecting this system.
            </p>
            <ul
              className="pj-technologies"
              aria-label={`${project.title} technology stack`}
            >
              {project.technology.map((technology) => (
                <li className="pj-tech" key={technology}>
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="pj-panel"
          data-stage="5"
          id="project-stage-5"
          aria-labelledby="project-outcome-title"
        >
          <div className="pj-panel-content">
            <p className="pj-kicker">06 / Engineering outcome</p>
            <h2 className="pj-title pj-stage-title" id="project-outcome-title">
              Architecture, applied.
            </h2>
            <p className="pj-description">{project.impact}</p>
            <div className="pj-outcome">
              {project.source && (
                <a
                  className="button-primary"
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View {project.title} source <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.live && (
                <a
                  className="button-secondary"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit {project.title} <span aria-hidden="true">↗</span>
                </a>
              )}
              <Link
                className="text-link"
                href={`/projects/${nextProject.slug}`}
              >
                Next system: {nextProject.title}{" "}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </ProjectJourney>
    </>
  )
}
