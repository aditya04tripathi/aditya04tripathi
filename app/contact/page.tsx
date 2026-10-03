import { ArrowUpRight } from "lucide-react"
import ContactExperience, {
  ContactSignal,
} from "@/components/contact/ContactExperience"
import ContactForm from "@/components/contact/ContactForm"
import { profile } from "@/data/portfolio"
import { metadataFor } from "@/lib/metadata"

export const metadata = metadataFor(
  "Contact Aditya Tripathi",
  "Contact Aditya Tripathi, software engineer in Melbourne. Find his email, GitHub, LinkedIn and downloadable résumé.",
  "/contact"
)

export default function ContactPage() {
  return (
    <ContactExperience>
      <main className="ce-main">
        <section className="ce-intro" aria-labelledby="contact-title">
          <p className="ce-eyebrow">
            <span className="status-dot" /> AN OPEN HORIZON / LET’S CONNECT
          </p>
          <h1 className="ce-title" id="contact-title">
            Every system
            <br />
            starts with
            <br />
            <span>a conversation.</span>
          </h1>
          <p className="ce-description">
            A problem to solve. A product to build. An opportunity to explore.
            Tell me what you have in mind.
          </p>
          <ContactSignal />
          <a className="ce-email" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight size={18} />
          </a>
          <div className="ce-links">
            <a
              className="text-link"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight size={14} />
            </a>
            <a
              className="text-link"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={14} />
            </a>
            <a className="text-link" href={profile.resume} download>
              Résumé <ArrowUpRight size={14} />
            </a>
          </div>
          <p className="ce-footer">
            {profile.name} / Software Engineer
            <br />
            <span>{profile.location}</span>
          </p>
        </section>
        <section
          className="ce-form-panel"
          id="contact-content"
          tabIndex={-1}
          aria-labelledby="contact-form-title"
        >
          <p className="ce-eyebrow">01 / THE FIRST CONNECTION</p>
          <h2 className="ce-form-heading" id="contact-form-title">
            Let’s build what’s next.
          </h2>
          <p className="ce-form-subtitle">
            Send a message. I’ll reply to the email you share.
          </p>
          <ContactForm />
        </section>
      </main>
    </ContactExperience>
  )
}
