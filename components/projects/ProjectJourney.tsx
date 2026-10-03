"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Monitor,
  Moon,
  Pause,
  Play,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"
import { createProjectWheelGesture } from "@/lib/project-wheel"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react"

const EngineeringWorld = dynamic(
  () => import("@/components/experience/EngineeringWorld"),
  { ssr: false }
)

const stages = [
  "Overview",
  "Problem",
  "Architecture",
  "Decisions",
  "Technology",
  "Outcome",
]
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

export default function ProjectJourney({
  children,
  projectIndex,
  title,
  category,
}: {
  children: ReactNode
  projectIndex: number
  title: string
  category: string
}) {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribeMounted,
    mountedSnapshot,
    serverSnapshot
  )
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    motionSnapshot,
    serverSnapshot
  )
  const [activeStage, setActiveStage] = useState(0)
  const [paused, setPaused] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLElement>(null)
  const progressBarRef = useRef<HTMLSpanElement>(null)
  const stageLinksRef = useRef<(HTMLAnchorElement | null)[]>([])
  const activeStageRef = useRef(0)
  const journeyProgress = useRef(0)

  const goToStage = useCallback(
    (index: number, immediate = false) => {
      const next = Math.max(0, Math.min(stages.length - 1, index))
      const track = trackRef.current
      if (!track) return
      const behavior = reducedMotion || immediate ? "instant" : "smooth"
      const panels = track.querySelectorAll<HTMLElement>("[data-stage]")
      const left = panels[next].offsetLeft - panels[0].offsetLeft
      track.scrollTo({ left, behavior })
    },
    [reducedMotion]
  )

  useEffect(() => {
    if (!mounted) return
    const root = rootRef.current
    const stage = stageRef.current
    const track = trackRef.current
    if (!root || !stage || !track) return
    const panels = [...track.querySelectorAll<HTMLElement>("[data-stage]")]
    let frame = 0
    const consumeWheel = createProjectWheelGesture()

    const update = () => {
      frame = 0
      const distance = Math.max(1, track.scrollWidth - track.clientWidth)
      const progress = Math.max(0, Math.min(1, track.scrollLeft / distance))
      journeyProgress.current = progress
      if (progressBarRef.current)
        progressBarRef.current.style.transform = `scaleX(${progress})`
      const next = Math.round(progress * (stages.length - 1))
      if (next !== activeStageRef.current) {
        const focused = document.activeElement
        if (
          focused instanceof HTMLElement &&
          (track.contains(focused) ||
            focused === stageLinksRef.current[activeStageRef.current] ||
            (next === stages.length - 1 &&
              focused.hasAttribute("data-pj-next")) ||
            (next === 0 && focused.hasAttribute("data-pj-previous")))
        ) {
          stageLinksRef.current[next]?.focus({ preventScroll: true })
        }
        const link = stageLinksRef.current[next]
        const navigation = link?.parentElement
        if (link && navigation) {
          navigation.scrollTo({
            left:
              navigation.scrollLeft +
              link.getBoundingClientRect().left -
              navigation.getBoundingClientRect().left -
              (navigation.clientWidth - link.offsetWidth) / 2,
            behavior: reducedMotion ? "instant" : "smooth",
          })
        }
        activeStageRef.current = next
        setActiveStage(next)
      }
      panels.forEach((panel, index) => {
        panel.inert = index !== next
      })
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    const onResize = () => {
      goToStage(activeStageRef.current, true)
      schedule()
    }
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return
      const target = event.target
      if (
        target instanceof Element &&
        target.closest("input, textarea, select, [contenteditable='true']")
      )
        return
      event.preventDefault()
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY
      const direction = consumeWheel(
        delta *
          (event.deltaMode === 1
            ? 16
            : event.deltaMode === 2
              ? track.clientWidth
              : 1),
        performance.now()
      )
      if (!direction) return
      const next = Math.max(
        0,
        Math.min(stages.length - 1, activeStageRef.current + direction)
      )
      if (next !== activeStageRef.current) goToStage(next)
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(root)
    observer.observe(stage)
    observer.observe(track)
    window.addEventListener("resize", onResize)
    track.addEventListener("scroll", schedule, { passive: true })
    track.addEventListener("wheel", onWheel, { passive: false })
    schedule()

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("resize", onResize)
      track.removeEventListener("scroll", schedule)
      track.removeEventListener("wheel", onWheel)
      panels.forEach((panel) => {
        panel.inert = false
      })
    }
  }, [mounted, reducedMotion, goToStage])

  const handleStageKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target
    if (
      !(target instanceof HTMLElement) ||
      target.closest("input, textarea, select, [contenteditable='true']")
    )
      return
    const next =
      event.key === "ArrowLeft"
        ? activeStage - 1
        : event.key === "ArrowRight"
          ? activeStage + 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? stages.length - 1
              : null
    if (next === null) return
    event.preventDefault()
    const destination = Math.max(0, Math.min(stages.length - 1, next))
    if (target.closest("[data-stage]"))
      stageLinksRef.current[destination]?.focus({ preventScroll: true })
    goToStage(destination)
  }

  const currentTheme = mounted ? (theme ?? "system") : "system"
  const nextTheme =
    currentTheme === "system"
      ? "dark"
      : currentTheme === "dark"
        ? "light"
        : "system"

  return (
    <div
      className={`project-journey ${mounted ? "pj-enhanced" : ""} ${reducedMotion || paused ? "motion-paused" : ""}`}
    >
      <a className="skip-link" href="#project-content">
        Skip to project content
      </a>
      <div className="pj-scroll-root" ref={rootRef}>
        <div className="pj-stage" ref={stageRef} onKeyDown={handleStageKey}>
          <header className="pj-header">
            <Link
              className="pj-brand"
              href="/"
              aria-label="Aditya Tripathi home"
            >
              AT<span>.</span>
            </Link>
            <div className="pj-header-actions">
              <Link className="text-link" href="/">
                Return to journey <ArrowUpRight size={14} />
              </Link>
              <Link className="text-link" href="/projects">
                All projects <ArrowUpRight size={14} />
              </Link>
              <button
                className="icon-button"
                onClick={() => setTheme(nextTheme)}
                aria-label={`Theme: ${currentTheme}. Switch to ${nextTheme}`}
                title={`Theme: ${currentTheme}`}
              >
                {currentTheme === "dark" ? (
                  <Moon size={18} />
                ) : currentTheme === "light" ? (
                  <Sun size={18} />
                ) : (
                  <Monitor size={18} />
                )}
              </button>
            </div>
          </header>

          <div className="pj-world" aria-hidden="true">
            {mounted && (
              <EngineeringWorld
                chapter={projectIndex + 1}
                progress={activeStage / (stages.length - 1)}
                projectStep={activeStage}
                journeyProgress={journeyProgress}
                journeyMode="horizontal"
                reducedMotion={reducedMotion}
                paused={paused}
                theme={resolvedTheme === "light" ? "light" : "dark"}
              />
            )}
            <div className="pj-world-caption">
              <span>{category}</span>
              <p>
                {title} / {stages[activeStage]}
              </p>
            </div>
          </div>

          <main
            className="pj-track"
            id="project-content"
            ref={trackRef}
            tabIndex={0}
            aria-label={`${title} engineering journey`}
          >
            {children}
          </main>

          <footer className="pj-footer">
            <div className="pj-progress" aria-hidden="true">
              <span ref={progressBarRef} />
            </div>
            <nav
              className="pj-stage-nav"
              aria-label={`${title} journey stages`}
            >
              {stages.map((label, index) => (
                <a
                  className={`pj-stage-link ${activeStage === index ? "active" : ""}`}
                  href={`#project-stage-${index}`}
                  key={label}
                  ref={(element) => {
                    stageLinksRef.current[index] = element
                  }}
                  aria-current={activeStage === index ? "step" : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    goToStage(index)
                  }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              ))}
            </nav>
            <div className="pj-controls">
              <button
                className="pj-direction icon-button"
                data-pj-previous
                aria-label="Previous project stage"
                disabled={activeStage === 0}
                onClick={() => goToStage(activeStage - 1)}
              >
                <ArrowLeft size={18} />
              </button>
              <span
                className="pj-counter"
                aria-live="polite"
                aria-atomic="true"
              >
                <span>{String(activeStage + 1).padStart(2, "0")}</span> / 06
              </span>
              <button
                className="pj-direction icon-button"
                data-pj-next
                aria-label="Next project stage"
                disabled={activeStage === stages.length - 1}
                onClick={() => goToStage(activeStage + 1)}
              >
                <ArrowRight size={18} />
              </button>
              <button
                className="icon-button"
                disabled={reducedMotion}
                aria-label={
                  reducedMotion
                    ? "Reduced motion enabled"
                    : paused
                      ? "Resume project animation"
                      : "Pause project animation"
                }
                aria-pressed={paused || reducedMotion}
                onClick={() => setPaused(!paused)}
              >
                {paused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
