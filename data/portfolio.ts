export type Project = {
  slug: string
  title: string
  category: string
  year: string
  description: string
  problem: string
  architecture: string
  decisions: string[]
  technology: string[]
  impact: string
  source: string | null
  live: string | null
  pipeline: string[]
}

export type Experience = {
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
}

export type Education = {
  institution: string
  qualification: string
  period: string
  description: string
}

export type SkillLayer = {
  name: string
  technologies: { name: string; evidence: string[] }[]
}

export const profile = {
  name: "Aditya Tripathi",
  role: "Software Engineer",
  location: "Melbourne, Australia",
  email: "me@adityatripathi.dev",
  github: "https://github.com/aditya04tripathi",
  linkedin: "https://www.linkedin.com/in/adityatripathi0404",
  resume: "/Aditya-Tripathi-Resume.pdf",
  writing: "https://adityatripathi.dev/blog",
  description:
    "Software engineer in Melbourne building full-stack applications, distributed file infrastructure and AI workflows. Studying software engineering at Monash University, with experience across healthcare products, enterprise platforms and student technology.",
}

export const projects: Project[] = [
  {
    slug: "scamshield",
    title: "ScamShield",
    category: "Multimodal threat intelligence",
    year: "2026",
    description:
      "One interface for investigating suspicious emails, URLs, audio and AI prompts. Specialist analysis converges into a risk score and an explanation.",
    problem:
      "Suspicious interactions arrive through different channels. Checking an email, a link, an audio clip or an AI prompt should not require a separate tool and an unfamiliar result format each time.",
    architecture:
      "A Next.js interface connects to a Python FastAPI backend with separate processors for email, URL, audio and prompt analysis. Hugging Face models and Librosa support classification and spectral audio analysis; Ollama provides local LLM explanations. Redis coordinates processing, while MongoDB retains scan reports and history.",
    decisions: [
      "Separate the analysis processors by input type while returning a common risk report.",
      "Run explanation generation through local Ollama models rather than requiring a hosted LLM for every scan.",
      "Keep persistent scan history in MongoDB and task coordination in Redis.",
    ],
    technology: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "MongoDB",
      "Redis",
      "Hugging Face",
      "Librosa",
      "Ollama",
    ],
    impact:
      "Brings multiple analysis methods into a consistent workflow, with risk explanations and a reviewable scan history. Audio analysis focuses on spectral characteristics; the report is a signal for further investigation.",
    source: "https://github.com/aditya04tripathi/ScamShield",
    live: null,
    pipeline: [
      "Email / URL / audio / prompt",
      "Specialist processors",
      "Risk aggregation",
      "Score + explanation",
      "Scan history",
    ],
  },
  {
    slug: "vapor-vault",
    title: "Vapor Vault",
    category: "Ephemeral file infrastructure",
    year: "2026",
    description:
      "Temporary file sharing with a complete lifecycle: upload, storage, processing, access and scheduled deletion.",
    problem:
      "A temporary transfer should not become permanent storage. The engineering challenge is coordinating file bytes, metadata and background work while keeping cleanup reliable across separate services.",
    architecture:
      "A NestJS API uses PostgreSQL and Prisma for metadata, SeaweedFS for files, and Redis with BullMQ for background processing. Direct uploads send bytes to storage before metadata registration. Workers save recovery checkpoints. Hourly cleanup deletes files older than 24 hours and their database records; Docker makes deployment reproducible.",
    decisions: [
      "Separate object storage from relational metadata and the application API.",
      "Move processing into BullMQ workers and persist checkpoints to support job recovery.",
      "Delete expired storage objects and their database records through scheduled lifecycle cleanup.",
    ],
    technology: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "SeaweedFS",
      "Redis",
      "BullMQ",
      "Docker",
    ],
    impact:
      "Demonstrates a file lifecycle across an API, database, object store and worker queue, with recovery checkpoints and automatic cleanup. Expiration is enforced by a scheduled job, so physical deletion follows the cleanup cadence.",
    source: "https://github.com/aditya04tripathi/vapourvault",
    live: "https://vault.adityatripathi.dev",
    pipeline: [
      "File",
      "Upload URL",
      "Object storage",
      "Metadata",
      "Temporary access",
      "Job queue",
      "TTL",
      "Deletion",
    ],
  },
  {
    slug: "devevent",
    title: "DevEvent",
    category: "Connected event platform",
    year: "2025",
    description:
      "A connected path from discovering a developer event to booking a place, receiving a QR ticket and checking in.",
    problem:
      "Event discovery and attendee management often happen in different tools. Organizers need one flow for publishing events, handling bookings and verifying attendance; visitors need searchable events and an accessible ticket.",
    architecture:
      "A pnpm monorepo separates the Next.js 16 frontend from a NestJS API. MongoDB stores events, users and bookings; MinIO handles media storage. API queries support search, tags, filters and pagination. Booking services generate QR tickets, validate their event and attendee data, and record check-in. GitHub Actions builds Docker images for deployment, with Railway configuration also maintained in the repository.",
    decisions: [
      "Keep frontend and backend in separate packages with a shared deployment workflow.",
      "Store event media separately from event and booking documents.",
      "Validate ticket data against the event and booking before recording attendance.",
    ],
    technology: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "MongoDB",
      "MinIO",
      "QR codes",
      "Docker",
      "GitHub Actions",
    ],
    impact:
      "Connects discovery, event management, bookings and attendee check-in in one product. Organizers can review participants and export booking records, while attendees can retrieve their QR tickets.",
    source: "https://github.com/aditya04tripathi/dev-event",
    live: "https://devevent.adityatripathi.dev",
    pipeline: [
      "Discover",
      "Search + filter",
      "Select event",
      "Book",
      "QR ticket",
      "Check in",
    ],
  },
  {
    slug: "gnosis-ai",
    title: "Gnosis AI",
    category: "AI validation and planning",
    year: "2025",
    description:
      "Turn a startup idea into a validation report, an execution plan, an interactive flowchart and a SCRUM board.",
    problem:
      "Early ideas need more than a promising score. Founders need a way to review feasibility and market assumptions, then translate the analysis into phases, dependencies and work they can track.",
    architecture:
      "A modular Next.js and TypeScript application integrates Groq for LLM inference, NextAuth.js for authentication and MongoDB through Mongoose for stored reports and project history. Validation results feed project planning, React Flow diagrams and SCRUM boards. Protected routes, usage tracking and access limits manage the AI workflow; the repository also supports an optional local Ollama provider.",
    decisions: [
      "Organize authentication, validation, project planning and dashboards as feature modules.",
      "Turn generated analysis into editable project plans and visual task workflows.",
      "Keep validation history behind authentication and apply usage limits to AI access.",
    ],
    technology: [
      "Next.js",
      "React",
      "TypeScript",
      "Groq",
      "React Flow",
      "NextAuth.js",
      "MongoDB",
      "Mongoose",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    impact:
      "Combines idea analysis with the practical next steps: phased plans, estimates, dependencies, flowcharts and task tracking. Reports and projects remain available in the user's validation history.",
    source: "https://github.com/aditya04tripathi/gnosis",
    live: "https://gnosis.adityatripathi.dev",
    pipeline: [
      "Idea",
      "Analysis",
      "Validation",
      "Execution plan",
      "Flowchart",
      "SCRUM board",
    ],
  },
]

export const experience: Experience[] = [
  {
    company: "PlasmIT Vector",
    role: "Associate Full-Stack Engineer",
    period: "Apr 2026 — Oct 2026",
    description:
      "Owned frontend, full-stack and mobile features for healthcare workflows, from requirements and user flows through testing and production readiness. Managed development, staging and production configurations, standardized reusable components, reviewed changes and supported developer onboarding.",
    technologies: [
      "Mobile development",
      "Component systems",
      "Configuration management",
      "Release workflows",
    ],
  },
  {
    company: "PlasmIT Vector",
    role: "Full-Stack Engineering Intern",
    period: "Mar 2026 — Jun 2026",
    description:
      "Contributed to healthcare web and mobile experiences, reusable UI components and responsive clinician workflows. Supported feature testing, debugging and iterative refinement across desktop and mobile interfaces.",
    technologies: ["Component systems", "Responsive UI", "Feature testing"],
  },
  {
    company: "WIRED Monash",
    role: "Lead Frontend Developer",
    period: "Feb 2026 — Jul 2026",
    description:
      "Lead frontend architecture and interface development for Monash University's IT student society. Coordinate contributors, reusable component patterns and release planning to deliver accessible, responsive technology for the student community.",
    technologies: [
      "Frontend architecture",
      "Component systems",
      "Accessibility",
      "Technical leadership",
    ],
  },
  {
    company: "LENS Corporation",
    role: "Software Engineer Intern",
    period: "Sep 2024 — Dec 2024",
    description:
      "Developed modular interfaces for internal enterprise workflows and integrated REST APIs. Contributed across requirements, implementation, debugging, code review, testing and deployment in an Agile engineering team.",
    technologies: [
      "REST APIs",
      "Reusable components",
      "Testing",
      "Agile delivery",
    ],
  },
  {
    company: "MAI Health",
    role: "Frontend Engineer Intern",
    period: "May 2024 — Jun 2024",
    description:
      "Built React modules for patient portal workflows, appointments and health records. Integrated APIs, improved responsive layouts, and migrated application state to Redux Toolkit for more maintainable frontend modules.",
    technologies: ["React", "Redux Toolkit", "REST APIs", "Responsive UI"],
  },
  {
    company: "Cisco",
    role: "Campus Ambassador",
    period: "Aug 2023 — Jul 2024",
    description:
      "Connected the campus community with Cisco learning resources, certifications and technology events. Coordinated outreach and workshops, building experience in communication and community leadership.",
    technologies: ["Technical outreach", "Workshops", "Community leadership"],
  },
]

export const education: Education[] = [
  {
    institution: "Monash University",
    qualification: "Bachelor of Engineering (Honours) — Software Engineering",
    period: "Feb 2025 — 2027 (expected)",
    description:
      "Studying software architecture and design, databases, computer networks and application development in Melbourne.",
  },
  {
    institution: "Amity University",
    qualification: "Diploma in Computer Science Engineering",
    period: "Sep 2022 — Jul 2024",
    description:
      "Computer science foundations in algorithms, data structures, operating systems and computer architecture. Coursework transferred toward the software engineering program at Monash University.",
  },
]

export const skillLayers: SkillLayer[] = [
  {
    name: "Application",
    technologies: [
      { name: "React", evidence: ["DevEvent", "Gnosis AI", "MAI Health"] },
      { name: "Next.js", evidence: ["ScamShield", "DevEvent", "Gnosis AI"] },
      { name: "React Native", evidence: ["Résumé · mobile engineering"] },
      { name: "Tailwind CSS", evidence: ["ScamShield", "Gnosis AI"] },
      { name: "Redux Toolkit", evidence: ["MAI Health"] },
      { name: "React Flow", evidence: ["Gnosis AI"] },
    ],
  },
  {
    name: "Languages",
    technologies: [
      {
        name: "TypeScript",
        evidence: ["ScamShield", "Vapor Vault", "DevEvent", "Gnosis AI"],
      },
      { name: "Python", evidence: ["ScamShield"] },
      { name: "JavaScript", evidence: ["Résumé · technical skills"] },
      { name: "SQL", evidence: ["Résumé · technical skills"] },
    ],
  },
  {
    name: "Backend",
    technologies: [
      { name: "Node.js", evidence: ["Vapor Vault", "DevEvent", "Gnosis AI"] },
      { name: "NestJS", evidence: ["Vapor Vault", "DevEvent"] },
      { name: "FastAPI", evidence: ["ScamShield"] },
      {
        name: "REST APIs",
        evidence: ["ScamShield", "DevEvent", "LENS Corporation"],
      },
      { name: "BullMQ", evidence: ["Vapor Vault"] },
      { name: "NextAuth.js", evidence: ["Gnosis AI"] },
    ],
  },
  {
    name: "Data",
    technologies: [
      { name: "PostgreSQL", evidence: ["Vapor Vault"] },
      { name: "MongoDB", evidence: ["ScamShield", "DevEvent", "Gnosis AI"] },
      { name: "Redis", evidence: ["ScamShield", "Vapor Vault"] },
      { name: "Prisma", evidence: ["Vapor Vault"] },
      { name: "Mongoose", evidence: ["DevEvent", "Gnosis AI"] },
    ],
  },
  {
    name: "Infrastructure",
    technologies: [
      { name: "Docker", evidence: ["Vapor Vault", "DevEvent", "Gnosis AI"] },
      {
        name: "Railway",
        evidence: ["ScamShield", "Vapor Vault", "DevEvent", "Gnosis AI"],
      },
      { name: "SeaweedFS", evidence: ["Vapor Vault", "DevEvent"] },
      { name: "AWS EC2 / S3", evidence: ["Résumé · cloud and DevOps"] },
    ],
  },
  {
    name: "Delivery",
    technologies: [
      {
        name: "GitHub Actions",
        evidence: ["Vapor Vault", "DevEvent", "Gnosis AI"],
      },
      { name: "Configuration management", evidence: ["PlasmIT Vector"] },
      {
        name: "Release planning",
        evidence: ["PlasmIT Vector", "WIRED Monash"],
      },
      { name: "Technical leadership", evidence: ["WIRED Monash"] },
    ],
  },
  {
    name: "Intelligence",
    technologies: [
      { name: "Groq", evidence: ["Gnosis AI"] },
      { name: "Hugging Face", evidence: ["ScamShield"] },
      { name: "Ollama", evidence: ["ScamShield", "Gnosis AI"] },
      { name: "Librosa", evidence: ["ScamShield"] },
      { name: "LLM applications", evidence: ["ScamShield", "Gnosis AI"] },
    ],
  },
]
