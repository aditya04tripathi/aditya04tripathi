import Link from "next/link"
import DocumentShell from "@/components/seo/DocumentShell"
import { education } from "@/data/portfolio"
import { metadataFor } from "@/lib/metadata"

export const metadata = metadataFor(
  "Education journey",
  "Explore Aditya Tripathi's education journey through Monash University, Amity University and Manav Rachna, alongside practical software engineering projects.",
  "/education"
)

export default function EducationPage() {
  return (
    <DocumentShell
      eyebrow="Education / Foundations & progression"
      title="The foundations of the next system."
      intro="Learning creates the foundations. Building turns those foundations into practice. These milestones form part of my path into software engineering."
    >
      <section className="document-section" aria-label="Education history">
        {education.map((item, index) => (
          <article className="document-card" key={item.institution}>
            <p className="document-eyebrow">
              {String(index + 1).padStart(2, "0")}
              {item.period ? ` / ${item.period}` : ""}
            </p>
            <h2>{item.institution}</h2>
            {item.qualification && <h3>{item.qualification}</h3>}
            {item.description && <p>{item.description}</p>}
          </article>
        ))}
      </section>
      <section className="document-section">
        <p className="document-eyebrow">Learning in practice</p>
        <h2>From concepts to working software.</h2>
        <p>
          Explore the systems I have built and the decisions that connect their
          interfaces, data and infrastructure.
        </p>
        <Link className="button-primary" href="/projects">
          Explore engineering projects ↗
        </Link>
      </section>
    </DocumentShell>
  )
}
