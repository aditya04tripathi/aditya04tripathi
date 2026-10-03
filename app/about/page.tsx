import Link from "next/link"
import DocumentShell from "@/components/seo/DocumentShell"
import JsonLd from "@/components/seo/JsonLd"
import { education, profile, projects } from "@/data/portfolio"
import { personJsonLd, seo } from "@/data/seo"
import { metadataFor } from "@/lib/metadata"

export const metadata = metadataFor(
  "About Aditya Tripathi",
  "Meet Aditya Tripathi, a software engineer in Melbourne. Explore his full-stack, cloud and AI projects, professional experience and education journey.",
  "/about"
)

export default function AboutPage() {
  return (
    <DocumentShell
      eyebrow="Profile / Melbourne, Australia"
      title="Aditya Tripathi. Software engineer."
      intro={profile.description}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${seo.url}/about#profile`,
          url: `${seo.url}/about`,
          name: `About ${profile.name}`,
          mainEntity: personJsonLd,
        }}
      />
      <section className="document-section">
        <p className="document-eyebrow">Engineering through building</p>
        <h2>Ideas become connected systems.</h2>
        <p>
          My work brings interfaces, APIs, data and infrastructure together. The
          projects here explore how software handles threats, temporary files,
          event discovery and the move from an idea to a structured plan.
        </p>
        <div className="document-grid">
          {projects.map((project) => (
            <article className="document-card" key={project.slug}>
              <p className="document-eyebrow">{project.category}</p>
              <h3>
                <Link href={`/projects/${project.slug}`}>
                  {project.title} ↗
                </Link>
              </h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="document-section">
        <p className="document-eyebrow">Learning and practice</p>
        <h2>A continuing engineering journey.</h2>
        <p>
          My education path includes{" "}
          {education.map((item) => item.institution).join(", ")}. Professional
          experience and hands-on projects have developed alongside that
          learning.
        </p>
        <div className="tags">
          <Link className="text-link" href="/education">
            Explore education ↗
          </Link>
          <Link className="text-link" href="/experience">
            Explore experience ↗
          </Link>
          <a
            className="text-link"
            href={profile.writing}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read technical writing ↗
          </a>
        </div>
      </section>
      <section className="document-section">
        <p className="document-eyebrow">What comes next</p>
        <h2>Build systems. Ship products. Solve hard problems.</h2>
        <div className="tags">
          <Link className="button-primary" href="/contact">
            Get in touch ↗
          </Link>
          <a className="button-secondary" href={profile.resume} download>
            Download résumé ↓
          </a>
        </div>
      </section>
    </DocumentShell>
  )
}
