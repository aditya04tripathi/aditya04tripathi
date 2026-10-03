"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import {
  ArrowUpRight,
  Moon,
  Sun,
  Monitor,
  Pause,
  Play,
  ArrowDown,
  Menu,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"

const EngineeringWorld = dynamic(
  () => import("@/components/experience/EngineeringWorld"),
  { ssr: false }
)
const subscribeMounted = () => () => {}
const mountedSnapshot = () => true
const serverSnapshot = () => false
const motionSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)")
  media.addEventListener("change", callback)
  return () => media.removeEventListener("change", callback)
}
const chapters = [
  { id: "identity", name: "Identity", scene: 0 },
  { id: "projects", name: "Projects", scene: 1 },
  { id: "experience", name: "Experience", scene: 5 },
  { id: "systems", name: "Systems", scene: 6 },
  { id: "education", name: "Education", scene: 7 },
  { id: "contact", name: "Contact", scene: 8 },
]
const worldCaptions = [
  ["THE ENGINEERING CORE", "One idea. A world of connections."],
  ["THREAT INTELLIGENCE", "Four inputs. One informed decision."],
  ["EPHEMERAL INFRASTRUCTURE", "A file lifecycle with an ending."],
  ["THE EVENT NETWORK", "From discovery to the door."],
  ["STRUCTURED INTELLIGENCE", "An idea becomes an execution plan."],
  ["SHARED ARCHITECTURE", "From contribution to collective delivery."],
  ["TECHNICAL DNA", "Every connection has a story."],
  ["THE KNOWLEDGE PATH", "Curiosity keeps moving."],
  ["THE UNBUILT SYSTEM", "The next connection could be ours."],
]

export default function PortfolioExperience({
  children,
  github,
}: {
  children: ReactNode
  github: string
}) {
  const { resolvedTheme, theme, setTheme } = useTheme()
  const [chapter, setChapter] = useState(0)
  const [progress, setProgress] = useState(0)
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    motionSnapshot,
    serverSnapshot
  )
  const mounted = useSyncExternalStore(
    subscribeMounted,
    mountedSnapshot,
    serverSnapshot
  )
  const [paused, setPaused] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedTechnology, setSelectedTechnology] = useState<string>()

  useEffect(() => {
    const selectTechnology = (event: Event) =>
      setSelectedTechnology((event as CustomEvent<string>).detail)
    window.addEventListener("portfolio:technology", selectTechnology)
    let scheduled = false
    let previous = -1
    const update = () => {
      const sections = [
        ...document.querySelectorAll<HTMLElement>("section[data-scene]"),
      ]
      const marker = window.innerHeight * 0.46
      let current = sections[0]
      for (const section of sections)
        if (section.getBoundingClientRect().top <= marker) current = section
      if (current) {
        const rect = current.getBoundingClientRect()
        const next = Number(current.dataset.scene)
        if (next !== previous) {
          setChapter(next)
          previous = next
        }
        setProgress(
          Math.round(
            Math.max(0, Math.min(1, (marker - rect.top) / rect.height)) * 20
          ) / 20
        )
      }
      scheduled = false
    }
    const onScroll = () => {
      if (!scheduled) {
        scheduled = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      window.removeEventListener("portfolio:technology", selectTechnology)
    }
  }, [])

  const activeChapter = Math.max(
    0,
    chapters.findLastIndex((item) => item.scene <= chapter)
  )
  const caption = worldCaptions[chapter] ?? worldCaptions[0]
  const nextTheme =
    !mounted || theme === "system"
      ? "dark"
      : theme === "dark"
        ? "light"
        : "system"

  return (
    <div
      className={`portfolio-experience ${reducedMotion || paused ? "motion-paused" : ""}`}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Aditya Tripathi, home">
          <span className="brand-mark">
            at<span>.</span>
          </span>
          <span className="brand-name">
            ADITYA TRIPATHI<span>SOFTWARE ENGINEER</span>
          </span>
        </Link>
        <div className="header-coordinate">
          INDEPENDENT MIND.
          <br />
          CONNECTED SYSTEMS.
        </div>
        <div className="header-actions">
          <a
            className="header-github"
            href={github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={15} />
          </a>
          <div className="header-divider" />
          <button
            className="icon-button theme-toggle"
            onClick={() => setTheme(nextTheme)}
            aria-label={`Theme: ${mounted ? theme : "system"}. Switch to ${nextTheme}`}
            title={`Theme: ${mounted ? theme : "system"}`}
          >
            {mounted && theme === "dark" ? (
              <Moon size={18} />
            ) : mounted && theme === "light" ? (
              <Sun size={18} />
            ) : (
              <Monitor size={18} />
            )}
          </button>
          <Link href="/contact" className="header-contact">
            Let’s talk <ArrowUpRight size={15} />
          </Link>
          <button
            className="icon-button mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen ? "Close chapter navigation" : "Open chapter navigation"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>
      <div className="world-grid" aria-hidden="true" />
      <div className="experience-world" aria-hidden="true">
        <EngineeringWorld
          chapter={chapter}
          progress={progress}
          reducedMotion={reducedMotion}
          paused={paused}
          theme={resolvedTheme === "light" ? "light" : "dark"}
          selectedTechnology={selectedTechnology}
        />
        {chapter === 0 && (
          <div className="world-labels">
            <span className="world-label label-frontend">
              <i />
              FRONTEND
            </span>
            <span className="world-label label-cloud">
              <i />
              CLOUD
            </span>
            <span className="world-label label-ai">
              <i />
              AI
            </span>
            <span className="world-label label-backend">
              <i />
              BACKEND
            </span>
            <span className="world-label label-data">
              <i />
              DATA
            </span>
            <span className="world-label label-systems">
              <i />
              SYSTEMS
            </span>
            <span className="world-origin">AT / 001</span>
          </div>
        )}
        <div className="world-caption">
          <div>
            <span className="world-caption-index">
              {String(chapter + 1).padStart(2, "0")} /
            </span>{" "}
            {caption[0]}
          </div>
          <p>{caption[1]}</p>
        </div>
        <span className="world-axis axis-top">Y +</span>
        <span className="world-axis axis-side">X +</span>
      </div>
      <main id="main-content" className="journey-main">
        {children}
      </main>
      <footer className="journey-navigation">
        <div className="scroll-cue">
          <ArrowDown size={16} />
          <span>
            SCROLL TO
            <br />
            EXPLORE
          </span>
        </div>
        <nav
          className={menuOpen ? "chapter-nav open" : "chapter-nav"}
          aria-label="Journey chapters"
        >
          {chapters.map((item, index) => (
            <a
              href={`#${item.id}`}
              key={item.id}
              onClick={() => setMenuOpen(false)}
              className={
                activeChapter === index ? "chapter-link active" : "chapter-link"
              }
              aria-current={activeChapter === index ? "location" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.name}
              <i />
            </a>
          ))}
        </nav>
        <div className="journey-controls">
          <span className="chapter-counter">
            {String(activeChapter + 1).padStart(2, "0")}
            <span> / 06</span>
          </span>
          <button
            className="icon-button"
            onClick={() => setPaused(!paused)}
            disabled={reducedMotion}
            aria-label={
              reducedMotion
                ? "Reduced motion enabled"
                : paused
                  ? "Resume animation"
                  : "Pause animation"
            }
            title={
              reducedMotion
                ? "Reduced motion enabled"
                : paused
                  ? "Resume animation"
                  : "Pause animation"
            }
          >
            {paused || reducedMotion ? <Play size={15} /> : <Pause size={15} />}
          </button>
        </div>
      </footer>
    </div>
  )
}

export function TechnologyEvidence({
  layers,
}: {
  layers: {
    name: string
    technologies: { name: string; evidence: string[] }[]
  }[]
}) {
  const [selection, setSelection] = useState(layers[0]?.technologies[0])
  const select = (technology: { name: string; evidence: string[] }) => {
    setSelection(technology)
    window.dispatchEvent(
      new CustomEvent("portfolio:technology", { detail: technology.name })
    )
  }
  return (
    <div className="technical-evidence">
      <div className="technical-layers">
        {layers.map((layer) => (
          <div className="technical-layer" key={layer.name}>
            <h3>{layer.name}</h3>
            <div>
              {layer.technologies.map((technology) => (
                <button
                  key={technology.name}
                  onClick={() => select(technology)}
                  onFocus={() => select(technology)}
                  className={
                    selection?.name === technology.name
                      ? "technology selected"
                      : "technology"
                  }
                  aria-pressed={selection?.name === technology.name}
                >
                  {technology.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="evidence-panel" aria-live="polite">
        <span>CONNECTED TO</span>
        <h3>{selection?.name}</h3>
        <div>
          {selection?.evidence.map((item) => (
            <p key={item}>
              <span className="evidence-node" />
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ResumeLink({ href }: { href: string }) {
  return (
    <a className="button-secondary" href={href} download>
      View résumé <ArrowUpRight size={16} />
    </a>
  )
}
