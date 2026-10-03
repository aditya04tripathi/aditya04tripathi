import { education, profile, projects } from "@/data/portfolio"

export const seo = {
  url: "https://adityatripathi.dev",
  title: "Aditya Tripathi | Software Engineer",
  description:
    "Aditya Tripathi is a software engineer in Melbourne building full-stack applications, cloud infrastructure and AI systems. Explore his projects, architecture and engineering journey.",
}

export const personId = `${seo.url}/#person`

export const shareColors = {
  background: "#0a0e17",
  text: "#f5f7fa",
  secondaryText: "#9ba6b8",
  mutedText: "#b5bfd0",
  border: "#283046",
  orbit: "#3a6ea5",
  line: "#354d6b",
  core: "#152338",
  highlight: "#bdd8ff",
  primary: "#8ab9ff",
  accent: "#8ab9ff",
  cyan: "#27c2ff",
  signal: "#8dffb5",
}

export const personJsonLd = {
  "@type": "Person",
  "@id": personId,
  name: profile.name,
  url: seo.url,
  jobTitle: profile.role,
  description: profile.description,
  homeLocation: { "@type": "Place", name: profile.location },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [...new Set(projects.flatMap((project) => project.technology))],
  alumniOf: education
    .filter((item) => item.institution === "Amity University")
    .map((item) => ({
      "@type": "CollegeOrUniversity",
      name: item.institution,
    })),
}

export const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${seo.url}/#website`,
      url: seo.url,
      name: `${profile.name} — ${profile.role}`,
      description: seo.description,
      inLanguage: "en",
      creator: { "@id": personId },
    },
    personJsonLd,
  ],
}
