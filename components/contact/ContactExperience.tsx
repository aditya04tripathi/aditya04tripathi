"use client"

import Link from "next/link"
import { ArrowUpRight, Monitor, Moon, Pause, Play, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useSyncExternalStore, type ReactNode } from "react"

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

export default function ContactExperience({
  children,
}: {
  children: ReactNode
}) {
  const { theme, setTheme } = useTheme()
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
  const [paused, setPaused] = useState(false)
  const currentTheme = mounted ? (theme ?? "system") : "system"
  const nextTheme =
    currentTheme === "system"
      ? "dark"
      : currentTheme === "dark"
        ? "light"
        : "system"

  return (
    <div
      className={`contact-experience ${paused || reducedMotion ? "ce-paused" : ""}`}
    >
      <a className="skip-link" href="#contact-content">
        Skip to contact form
      </a>
      <header className="ce-header">
        <Link className="ce-brand" href="/" aria-label="Aditya Tripathi home">
          AT<span>.</span>
        </Link>
        <div className="ce-header-actions">
          <Link className="text-link" href="/">
            Return to journey <ArrowUpRight size={14} />
          </Link>
          <button
            className="icon-button"
            onClick={() => setPaused(!paused)}
            aria-label={
              reducedMotion
                ? "Reduced motion enabled"
                : paused
                  ? "Resume contact animation"
                  : "Pause contact animation"
            }
            aria-pressed={paused || reducedMotion}
            disabled={reducedMotion}
            title={
              reducedMotion
                ? "Reduced motion enabled"
                : paused
                  ? "Resume animation"
                  : "Pause animation"
            }
          >
            {paused || reducedMotion ? <Play size={17} /> : <Pause size={17} />}
          </button>
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
      {children}
    </div>
  )
}

export function ContactSignal() {
  return (
    <svg
      className="ce-signal"
      viewBox="0 0 440 250"
      fill="none"
      aria-hidden="true"
    >
      <ellipse
        className="ce-orbit ce-orbit-one"
        cx="220"
        cy="125"
        rx="170"
        ry="72"
      />
      <ellipse
        className="ce-orbit ce-orbit-two"
        cx="220"
        cy="125"
        rx="118"
        ry="104"
        transform="rotate(-28 220 125)"
      />
      <path
        className="ce-link"
        d="M50 125 220 125 363 180M110 64 220 125 330 62M164 216 220 125 278 28"
      />
      <path className="ce-core" d="m220 95 26 15v30l-26 15-26-15v-30z" />
      <path className="ce-core-detail" d="m194 110 26 15 26-15m-26 15v30" />
      <circle className="ce-node ce-node-one" cx="50" cy="125" r="5" />
      <circle className="ce-node ce-node-two" cx="363" cy="180" r="5" />
      <circle className="ce-node ce-node-three" cx="110" cy="64" r="4" />
      <circle className="ce-node ce-node-four" cx="330" cy="62" r="5" />
      <circle className="ce-node ce-node-five" cx="164" cy="216" r="4" />
      <circle className="ce-node ce-node-six" cx="278" cy="28" r="4" />
    </svg>
  )
}
