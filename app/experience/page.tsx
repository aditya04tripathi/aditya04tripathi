import Link from "next/link"
import DocumentShell from "@/components/seo/DocumentShell"
import { experience, profile } from "@/data/portfolio"
import { metadataFor } from "@/lib/metadata"

export const metadata = metadataFor(
  "Engineering experience",
  "Aditya Tripathi's software engineering and technical leadership experience, including historical work at PlasmIT Vector, MAI Health, LENS Corporation and WIRED Monash.",
  "/experience"
)

export default function ExperiencePage() {
  return (
    <DocumentShell
      eyebrow="Experience / Engineering & leadership"
      title="From building to taking ownership."
      intro="Professional work and technical leadership bring a different set of constraints: real users, shared codebases, deployment environments and the people who build alongside you."
    >
      <section
        className="document-section"
        aria-label="Professional and leadership experience"
      >
        {experience.map((item) => (
          <article
            className="document-card"
            key={`${item.company}-${item.role}`}
          >
            <p className="document-eyebrow">{item.period}</p>
            <h2>{item.role}</h2>
            <h3>{item.company}</h3>
            <p>{item.description}</p>
            <ul
              className="tags"
              aria-label={`${item.company} technologies and responsibilities`}
            >
              {item.technologies.map((technology) => (
                <li className="tag" key={technology}>
                  {technology}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <section className="document-section">
        <p className="document-eyebrow">Further context</p>
        <h2>Explore the engineering behind the roles.</h2>
        <div className="tags">
          <Link className="button-primary" href="/projects">
            Read project case studies ↗
          </Link>
          <a className="button-secondary" href={profile.resume} download>
            Download résumé ↓
          </a>
        </div>
      </section>
    </DocumentShell>
  )
}
