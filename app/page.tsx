import Link from "next/link"
import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  CodeXml as Github,
  BriefcaseBusiness as Linkedin,
  FileText,
  Braces,
  Binary,
  Network,
  Cpu,
} from "lucide-react"
import PortfolioExperience, {
  TechnologyEvidence,
  ResumeLink,
} from "@/components/PortfolioExperience"
import {
  profile,
  projects,
  experience,
  education,
  skillLayers,
} from "@/data/portfolio"
import JsonLd from "@/components/seo/JsonLd"
import { portfolioJsonLd } from "@/data/seo"

const projectNarratives = [
  { line: "Trust, by design.", subtitle: "SCAMSHIELD", icon: Network },
  { line: "Built to disappear.", subtitle: "VAPOR VAULT", icon: Binary },
  { line: "Bring people together.", subtitle: "DEVEVENT", icon: Braces },
  { line: "Give ideas structure.", subtitle: "GNOSIS AI", icon: Cpu },
]

export default function Page() {
  return (
    <PortfolioExperience github={profile.github}>
      <JsonLd data={portfolioJsonLd} />
      <section
        className="journey-chapter identity-chapter"
        id="identity"
        data-scene="0"
      >
        <div className="chapter-content hero-content">
          <div className="chapter-kicker">
            <span className="status-dot" />
            SYSTEM ONLINE<span className="kicker-separator">/</span>01 — THE
            ORIGIN
          </div>
          <div className="hero-identity">
            ADITYA TRIPATHI <span>/ SOFTWARE ENGINEER</span>
          </div>
          <h1>
            Curiosity.
            <br />
            <span>Engineered.</span>
          </h1>
          <p className="hero-description">
            I turn complex problems into connected, useful software.
            <br className="desktop-break" /> From the first idea to the system
            that ships.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#projects">
              Explore the journey <ArrowDownRight size={19} />
            </a>
            <ResumeLink href={profile.resume} />
          </div>
          <div className="hero-location">
            <span className="location-cross">+</span>
            <div>
              MELBOURNE, AUSTRALIA<span>Building what comes next.</span>
            </div>
          </div>
        </div>
        <div className="hero-side-note">
          FULL STACK<span>·</span>CLOUD<span>·</span>AI<span>·</span>SYSTEMS
        </div>
      </section>
      {projects.map((project, index) => {
        const narrative = projectNarratives[index]
        const Icon = narrative.icon
        return (
          <section
            className="journey-chapter project-chapter"
            id={index === 0 ? "projects" : project.slug}
            data-scene={index + 1}
            key={project.slug}
          >
            <div className="chapter-content">
              <div className="chapter-kicker">
                <span>02 — ENGINEERING PROJECTS</span>
                <span className="project-position">
                  {String(index + 1).padStart(2, "0")} / 04
                </span>
              </div>
              <div className="project-identity">
                <Icon size={22} />
                <span>{narrative.subtitle}</span>
                <span className="project-year">{project.year}</span>
              </div>
              <h2 className="chapter-title">{narrative.line}</h2>
              <p className="chapter-description">{project.description}</p>
              <div
                className="system-flow"
                aria-label={`${project.title} architecture`}
              >
                {project.pipeline.map((step, stepIndex) => (
                  <span key={step}>
                    {stepIndex > 0 && <ArrowRight size={12} />}
                    <span>{step}</span>
                  </span>
                ))}
              </div>
              <p className="project-architecture">{project.architecture}</p>
              <div className="tags">
                {project.technology.slice(0, 6).map((technology) => (
                  <span className="tag" key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
              <div className="project-actions">
                <Link
                  href={`/projects/${project.slug}`}
                  className="button-primary"
                >
                  Explore the system <ArrowUpRight size={17} />
                </Link>
                {project.source && (
                  <a
                    className="text-link"
                    href={project.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={16} />
                    Source code <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
              <div
                className="project-switcher"
                aria-label="Select an engineering project"
              >
                {projects.map((item, position) => (
                  <a
                    key={item.slug}
                    href={position === 0 ? "#projects" : `#${item.slug}`}
                    aria-label={`Explore ${item.title}`}
                    aria-current={position === index ? "true" : undefined}
                    className={position === index ? "selected" : ""}
                  >
                    <span>{String(position + 1).padStart(2, "0")}</span>
                    <i />
                  </a>
                ))}
              </div>
            </div>
          </section>
        )
      })}
      <section
        className="journey-chapter experience-chapter"
        id="experience"
        data-scene="5"
      >
        <div className="chapter-content wide-content">
          <div className="chapter-kicker">
            03 — THE PEOPLE BEHIND THE SYSTEMS
          </div>
          <h2 className="chapter-title">
            Code is individual.
            <br />
            <span>Engineering is shared.</span>
          </h2>
          <p className="chapter-description">
            From healthcare interfaces to full-stack systems and technical
            leadership. Each role added a new dimension.
          </p>
          <div className="experience-timeline">
            {experience.map((role) => (
              <details
                className="experience-entry"
                key={`${role.company}-${role.role}`}
              >
                <summary>
                  <span className="timeline-node" />
                  <div>
                    <h3>{role.company}</h3>
                    <p>{role.role}</p>
                  </div>
                  <span className="experience-period">{role.period}</span>
                  <span className="experience-expand">+</span>
                </summary>
                <p>{role.description}</p>
              </details>
            ))}
          </div>
          <Link className="text-link" href="/experience">
            Read the full experience <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
      <section
        className="journey-chapter systems-chapter"
        id="systems"
        data-scene="6"
      >
        <div className="chapter-content wide-content">
          <div className="chapter-kicker">04 — TECHNICAL DNA</div>
          <h2 className="chapter-title">
            Different layers.
            <br />
            <span>One connected mind.</span>
          </h2>
          <p className="chapter-description">
            A toolkit built by building. Select a technology to follow it back
            to the work.
          </p>
          <TechnologyEvidence layers={skillLayers} />
        </div>
      </section>
      <section
        className="journey-chapter education-chapter"
        id="education"
        data-scene="7"
      >
        <div className="chapter-content">
          <div className="chapter-kicker">05 — THE KNOWLEDGE PATH</div>
          <h2 className="chapter-title">
            Always a student.
            <br />
            <span>Always a builder.</span>
          </h2>
          <p className="chapter-description">
            The foundations change. The curiosity stays.
          </p>
          <div className="education-path">
            {education.map((item, index) => (
              <div className="education-milestone" key={item.institution}>
                <span className="education-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.institution}</h3>
                  {item.qualification && <p>{item.qualification}</p>}
                  {item.period && (
                    <span className="education-period">{item.period}</span>
                  )}
                  {item.description && (
                    <p className="education-description">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Link className="text-link" href="/education">
            Follow the education path <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
      <section
        className="journey-chapter contact-chapter"
        id="contact"
        data-scene="8"
      >
        <div className="chapter-content">
          <div className="chapter-kicker">
            <span className="status-dot" />
            06 — AN OPEN HORIZON
          </div>
          <h2 className="chapter-title contact-title">
            The next system
            <br />
            <span>is still unwritten.</span>
          </h2>
          <p className="chapter-description">
            Build systems. Ship products. Solve hard problems.
            <br />
            Let’s make something that matters.
          </p>
          <Link className="button-primary contact-start" href="/contact">
            Start a conversation <ArrowUpRight size={17} />
          </Link>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight size={25} />
          </a>
          <div className="contact-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={17} />
              GitHub
              <ArrowUpRight size={14} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={17} />
              LinkedIn
              <ArrowUpRight size={14} />
            </a>
            <a href={profile.resume} download>
              <FileText size={17} />
              Résumé
              <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="contact-footer">
            <span>
              ADITYA TRIPATHI
              <br />
              <span>SOFTWARE ENGINEER</span>
            </span>
            <span>
              DESIGNED WITH INTENT.
              <br />
              <span>BUILT WITH CURIOSITY.</span>
            </span>
          </div>
          {"writing" in profile && typeof profile.writing === "string" && (
            <Link className="text-link writing-link" href="/blog">
              Notes on engineering <ArrowUpRight size={14} />
            </Link>
          )}
        </div>
      </section>
    </PortfolioExperience>
  )
}
