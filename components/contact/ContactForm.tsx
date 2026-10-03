"use client"

import { ArrowUpRight, Check, LoaderCircle } from "lucide-react"
import { useRef, useState, useSyncExternalStore, type FormEvent } from "react"
import { CONTACT_LIMITS, validateContactInput } from "@/lib/contact"

type SubmissionState = "idle" | "sending" | "success" | "error"
const subscribeMounted = () => () => {}
const mountedSnapshot = () => true
const serverSnapshot = () => false

export default function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle")
  const [notice, setNotice] = useState("")
  const [bodyLength, setBodyLength] = useState(0)
  const noticeRef = useRef<HTMLParagraphElement>(null)
  const mounted = useSyncExternalStore(
    subscribeMounted,
    mountedSnapshot,
    serverSnapshot
  )

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (state === "sending") return
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    const validation = validateContactInput(values)
    if (!validation.valid) {
      setState("error")
      setNotice(validation.error)
      window.requestAnimationFrame(() => noticeRef.current?.focus())
      return
    }

    setState("sending")
    setNotice("")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validation.value, company: values.company }),
      })
      const result: unknown = await response.json().catch(() => null)
      const payload =
        result && typeof result === "object"
          ? (result as Record<string, unknown>)
          : {}
      if (!response.ok) {
        setState("error")
        setNotice(
          typeof payload.error === "string"
            ? payload.error
            : "Your message could not be sent. Please try again."
        )
      } else if (typeof payload.message !== "string") {
        setState("error")
        setNotice(
          "Unable to confirm delivery. Please try again or email me directly."
        )
      } else {
        form.reset()
        setBodyLength(0)
        setState("success")
        setNotice(
          "Message sent. Thank you for reaching out. I’ll get back to you by email."
        )
      }
    } catch {
      setState("error")
      setNotice(
        "Unable to send your message. Please try again or email me directly."
      )
    }
    window.requestAnimationFrame(() => noticeRef.current?.focus())
  }

  return (
    <form
      className="cf-form"
      onSubmit={submit}
      aria-busy={state === "sending"}
      method="post"
      action="/api/contact"
    >
      <fieldset className="cf-grid" disabled={state === "sending"}>
        <legend className="sr-only">Your contact details and message</legend>
        <div className="cf-field">
          <label className="cf-label" htmlFor="contact-name">
            Your name
          </label>
          <input
            className="cf-input"
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="How should I address you?"
            required
            maxLength={CONTACT_LIMITS.name}
          />
        </div>
        <div className="cf-field">
          <label className="cf-label" htmlFor="contact-email">
            Email address
          </label>
          <input
            className="cf-input"
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={CONTACT_LIMITS.email}
          />
        </div>
        <div className="cf-field cf-field-wide">
          <label className="cf-label" htmlFor="contact-subject">
            Subject <span className="cf-optional">Optional</span>
          </label>
          <input
            className="cf-input"
            id="contact-subject"
            name="subject"
            placeholder="A project, an opportunity, an idea…"
            maxLength={CONTACT_LIMITS.subject}
          />
        </div>
        <div className="cf-field cf-field-wide">
          <label className="cf-label" htmlFor="contact-body">
            Your message
          </label>
          <textarea
            className="cf-input cf-textarea"
            id="contact-body"
            name="body"
            placeholder="Tell me what you have in mind."
            required
            rows={6}
            maxLength={CONTACT_LIMITS.body}
            aria-describedby="contact-body-help"
            onChange={(event) => setBodyLength(event.target.value.length)}
          />
          <div className="cf-help" id="contact-body-help">
            <span>A little context goes a long way.</span>
            <span className="cf-count">
              {bodyLength.toLocaleString("en-AU")} / 5,000
            </span>
          </div>
        </div>
        <div className="cf-honeypot" aria-hidden="true" hidden>
          <label htmlFor="contact-company">Company website</label>
          <input
            id="contact-company"
            name="company"
            autoComplete="off"
            tabIndex={-1}
          />
        </div>
      </fieldset>
      <button
        className="cf-submit"
        type="submit"
        disabled={!mounted || state === "sending"}
      >
        {state === "sending" ? "Sending your message…" : "Send message"}
        {state === "sending" ? (
          <LoaderCircle
            className="cf-submit-icon is-spinning"
            size={19}
            aria-hidden="true"
          />
        ) : (
          <ArrowUpRight size={19} aria-hidden="true" />
        )}
      </button>
      {notice && (
        <p
          className={`cf-status ${state === "success" ? "cf-status-success" : "cf-status-error"}`}
          role={state === "error" ? "alert" : "status"}
          tabIndex={-1}
          ref={noticeRef}
        >
          {state === "success" && <Check size={16} aria-hidden="true" />}
          {notice}
        </p>
      )}
      <p className="cf-footnote">
        Your details are used to reply to this conversation.
      </p>
      <noscript>
        <p className="cf-status">
          Enable JavaScript to use the form, or{" "}
          <a href="mailto:me@adityatripathi.dev">email me directly</a>.
        </p>
      </noscript>
    </form>
  )
}
