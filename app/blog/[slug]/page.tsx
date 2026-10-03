import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import DocumentShell from "@/components/seo/DocumentShell"
import JsonLd from "@/components/seo/JsonLd"
import { profile, projects } from "@/data/portfolio"
import { articles } from "@/data/writing"
import { personJsonLd, seo } from "@/data/seo"
import { metadataFor } from "@/lib/metadata"

type ArticlePageProps = { params: Promise<{ slug: string }> }

const relatedProjectSlugs: Record<string, string[]> = {
  "stride-threat-model-consumer-fintech": ["scamshield"],
  "postgres-expand-contract-migrations": ["vapor-vault"],
  "server-actions-api-boundaries": ["vapor-vault", "devevent"],
  "offline-first-expense-sync": ["vapor-vault"],
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)
  if (!article) notFound()

  return metadataFor(
    article.title,
    article.description,
    `/blog/${article.slug}`
  )
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)
  if (!article) notFound()
  const canonical = `${seo.url}/blog/${article.slug}`
  const relatedProjects = projects.filter((project) =>
    relatedProjectSlugs[article.slug]?.includes(project.slug)
  )

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: article.title,
        description: article.description,
        url: canonical,
        image: `${canonical}/opengraph-image`,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        author: personJsonLd,
        inLanguage: "en",
        ...(article.published ? { datePublished: article.published } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: seo.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Writing",
            item: `${seo.url}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: canonical,
          },
        ],
      },
    ],
  }

  return (
    <DocumentShell
      eyebrow="Writing / Engineering notes"
      title={article.title}
      intro={article.description}
    >
      <JsonLd data={structuredData} />
      <div className="article-meta">
        <span>By {profile.name}</span>
        {article.published && (
          <time dateTime={article.published}>
            {new Date(article.published).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            })}
          </time>
        )}
        {article.source && (
          <a
            className="text-link"
            href={article.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            Original source ↗
          </a>
        )}
      </div>
      <article className="article-prose">
        <ReactMarkdown
          components={{ h1: ({ children }) => <h2>{children}</h2> }}
        >
          {article.body}
        </ReactMarkdown>
      </article>
      {relatedProjects.length > 0 && (
        <section className="document-section">
          <p className="document-eyebrow">Related engineering</p>
          <h2>Explore a working system.</h2>
          <div className="document-grid">
            {relatedProjects.map((project) => (
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
      )}
      <section className="document-section">
        <p className="document-eyebrow">Keep exploring</p>
        <div className="tags">
          <Link className="text-link" href="/blog">
            All engineering writing ↗
          </Link>
          <Link className="text-link" href="/projects">
            Explore the systems ↗
          </Link>
        </div>
      </section>
    </DocumentShell>
  )
}
