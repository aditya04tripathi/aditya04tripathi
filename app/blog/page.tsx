import Link from "next/link"
import DocumentShell from "@/components/seo/DocumentShell"
import { articles } from "@/data/writing"
import { metadataFor } from "@/lib/metadata"

export const metadata = metadataFor(
  "Engineering writing",
  "Original technical writing by Aditya Tripathi: ideas, architecture and practical software engineering explored through articles and notes.",
  "/blog"
)

export default function WritingPage() {
  return (
    <DocumentShell
      eyebrow="Writing / Engineering notes"
      title="Ideas worth working through."
      intro="Original notes on software and the decisions behind it. A place to explore an idea, examine an approach and connect what I learn with what I build."
    >
      <section className="document-section" aria-label="Technical articles">
        {articles.map((article) => (
          <article className="document-card" key={article.slug}>
            {article.published && (
              <p className="article-meta">
                <time dateTime={article.published}>
                  {new Date(article.published).toLocaleDateString("en-AU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
              </p>
            )}
            <h2>
              <Link href={`/blog/${article.slug}`}>{article.title} ↗</Link>
            </h2>
            <p>{article.description}</p>
            <Link className="text-link" href={`/blog/${article.slug}`}>
              Read article ↗
            </Link>
          </article>
        ))}
      </section>
    </DocumentShell>
  )
}
