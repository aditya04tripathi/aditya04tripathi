import Link from "next/link"
import type { ReactNode } from "react"

const routes = [
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Writing", "/blog"],
  ["Experience", "/experience"],
  ["Education", "/education"],
  ["Contact", "/contact"],
] as const

export default function DocumentShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  children: ReactNode
}) {
  return (
    <div className="document-shell">
      <a className="skip-link" href="#document-content">
        Skip to content
      </a>
      <nav className="document-nav" aria-label="Portfolio navigation">
        <Link href="/" aria-label="Aditya Tripathi home">
          AT.
        </Link>
        <Link className="text-link" href="/">
          Return to journey <span aria-hidden="true">↗</span>
        </Link>
      </nav>
      <main className="document-main" id="document-content">
        <header>
          <p className="document-eyebrow">{eyebrow}</p>
          <h1 className="document-title">{title}</h1>
          <p className="document-intro">{intro}</p>
        </header>
        {children}
        <footer className="document-section">
          <p className="document-eyebrow">Explore the journey</p>
          <nav className="tags" aria-label="More portfolio pages">
            {routes.map(([label, href]) => (
              <Link className="text-link" href={href} key={href}>
                {label} <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
        </footer>
      </main>
    </div>
  )
}
