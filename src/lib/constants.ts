import { format } from 'date-fns';
import slugify from 'slugify';

export const CREATOR_INFO = {
    name: 'Aditya Tripathi',
    title: 'Software Engineer',
    email: 'me@adityatripathi.dev',
    location: 'Clayton, VIC, Australia',
    linkedin: 'https://www.linkedin.com/in/adityatripathi0404',
    github: 'https://github.com/aditya04tripathi',
    githubRepo: 'https://github.com/aditya04tripathi/aditya04tripathi',
    bio: 'I build real-world applications that prioritize performance, usability, and privacy. My work spans production-ready apps and scalable backend systems. Software Engineering student at Monash University; hands-on experience designing, deploying, and operating systems with Next.js, TypeScript, and cloud infrastructure.',
    avatar: 'https://res.cloudinary.com/dpaqsdcky/image/upload/v1761473970/pfp_cw1znb.jpg',
    ogImage: '/og-image.png',
    phone: '+61 0469 037 678',
};

export const SITE_CONFIG = {
    url: 'https://adityatripathi.dev',
    name: 'Aditya Tripathi',
};

export const HERO_HEADLINE =
    'Software Engineer building scalable systems and privacy-first applications';

export const HERO_PRODUCT_LINE =
    'Creator of PennyWise — a private offline expense tracker';

export const PENNYWISE_PRIVACY_PATH = '/privacy-policy/pennywise';

export const PENNYWISE_LOGO_URL =
    'https://play-lh.googleusercontent.com/gc7W_hr33cVOl4Rz3atvgQGje--SbA8o1XWPAcbhR7lexhd2UO-z127gAUPD4HtVL_oQiX6YDE_Q8n3CFUT6sA=w480-h960-rw';

export const ENGINEERING_PROJECTS_INTRO =
    "Systems, tools, and infrastructure I've built.";

export const EDUCATION = [
    {
        degree: 'Bachelor of Engineering (Honours) - Software Engineering',
        institution: 'Monash University',
        location: 'Clayton, Melbourne, Australia',
        period: `${format(new Date('2025-02-01'), 'LLLL yyyy')} - ${format(
            new Date('2027-06-01'),
            'LLLL yyyy',
        )} (Expected)`,
        status: 'Student',
        notes: 'Transferred 50% of coursework from Amity University',
    },
    {
        degree: 'Diploma in Computer Science Engineering',
        institution: 'Amity University',
        location: 'Noida, Uttar Pradesh, India',
        period: `${format(new Date('2022-09-01'), 'LLLL yyyy')} - ${format(
            new Date('2024-07-01'),
            'LLLL yyyy',
        )}`,
        status: 'Completed',
    },
];

export const SKILLS = {
    technical: [
        'JavaScript/TypeScript',
        'Python',
        'React.js',
        'Next.js',
        'Node.js',
        'PostgreSQL',
        'MongoDB',
        'Redux Toolkit',
        'Tailwind CSS',
        'Docker',
        'FastAPI',
        'React Native',
    ],
    soft: [
        'Communication',
        'Leadership',
        'Collaboration',
        'Adaptability',
        'Time Management',
    ],
};

export const WORK_EXPERIENCE = [
    {
        role: 'Associate Full-Stack Engineer',
        company: 'PlasmIT Vector',
        location: 'Docklands, Victoria, Australia',
        period: `${format(new Date('2026-06-01'), 'LLLL yyyy')} - Present`,
        description:
            'As a Full Stack Associate Engineer at PlasmIT Vector Ltd, I am responsible for configuration management across the SaaS platform, including maintaining version control, managing development, staging, and production configurations, handling deployment settings, and ensuring consistent releases. I develop frontend, full stack, and mobile app features, including reusable UI components, responsive interfaces, structured product content, and scalable platform workflows aligned with healthcare interoperability and clinician-centric clinical workflows. I take end-to-end ownership of the mobile app development lifecycle, from understanding requirements and shaping user flows to implementing features, testing, refining, and preparing functionality for production-ready delivery. I collaborate with product, design, and engineering stakeholders to translate business, clinical, and user requirements into practical, scalable software solutions.',
    },
    {
        role: 'Full-Stack Engineering Intern',
        company: 'PlasmIT Vector',
        location: 'Docklands, Victoria, Australia',
        period: `${format(new Date('2026-03-01'), 'LLLL yyyy')} - ${format(new Date('2026-06-01'), 'LLLL yyyy')}`,
        description:
            'Supported full stack development for PlasmIT’s healthcare technology initiatives, contributing to web experiences and product-facing platforms centered around PiMed, a connected digital care solution for hospitals and critical care environments. Worked across frontend implementation, reusable component development, responsive UI design, and structured product content delivery using modern web technologies. Collaborated on features aligned with healthcare interoperability, clinician-centric workflows, and scalable digital platform architecture, while gaining hands-on experience in translating product, business, and user requirements into production-ready solutions.',
    },
    {
        role: 'Lead Frontend Developer',
        company: 'WIRED Monash',
        location: 'Clayton, Victoria, Australia',
        period: `${format(new Date('2026-03-01'), 'LLLL yyyy')} - Present`,
        description:
            'As the Lead Frontend Developer at WIRED Monash, the official IT student society at Monash University, I lead the design and development of user-focused digital solutions that enhance the student experience within the Faculty of Information Technology. I oversee frontend architecture, interface design, and implementation across technology-driven initiatives, collaborating with cross-functional teams to deliver scalable, intuitive, and impactful platforms that support academic engagement and community growth.',
    },
    {
        role: 'Software Engineer Intern',
        company: 'LENS Corporation',
        location: 'Gurugram, India',
        period: `${format(new Date('2024-09-01'), 'LLLL yyyy')} - ${format(
            new Date('2024-12-01'),
            'LLLL yyyy',
        )}`,
        description:
            'Designed and developed modular web application components, improving usability and system performance across internal tools. Implemented responsive UI layouts and reusable frontend modules, ensuring consistent user experience across devices. Collaborated with senior engineers on feature planning, code reviews, and deployment processes following Agile practices. Integrated REST APIs, optimized data flows, and enhanced application reliability through debugging and iterative testing. Contributed to end to end development cycles, from requirement gathering to final release.',
    },
    {
        role: 'Frontend Engineer Intern',
        company: 'MAI HEALTH',
        location: 'Remote, USA',
        period: `${format(new Date('2024-05-01'), 'LLLL yyyy')} - ${format(
            new Date('2024-06-01'),
            'LLLL yyyy',
        )}`,
        description:
            'Developed patient portal modules in React supporting 1,000+ users with real-time appointment data. Implemented responsive layouts and integrated APIs for health record synchronization. Migrated app state to Redux Toolkit increasing maintainability and modularity by 40%. Collaborated in Agile team stand-ups, using Jira to manage sprint planning and feedback loops.',
    },
    {
        role: 'Campus Ambassador',
        company: 'Cisco',
        location: 'Noida, India',
        period: `${format(new Date('2023-08-01'), 'LLLL yyyy')} - ${format(
            new Date('2024-07-01'),
            'LLLL yyyy',
        )}`,
        description:
            'Represent Cisco on campus and act as a liaison between Cisco and the student community. Promote Cisco programs, initiatives, events, and learning opportunities among students. Organize and coordinate workshops, info sessions, webinars, and technical or career-focused events. Increase awareness of Cisco certifications, training resources, and career pathways. Engage with student clubs, faculty, and peers to build a strong campus tech community. Drive student participation through digital campaigns, social media, and on-ground outreach. Provide feedback and insights on student engagement and campus trends to the Cisco team. Develop leadership, communication, and community-building skills through hands-on ambassador activities',
    },
];

/**
 * List of short certification titles to display on the profile.
 */
export const CERTIFICATIONS = [
    'Programming with JavaScript',
    'Introduction to Front End Development',
];

/**
 * Spoken languages and stated proficiency for display in profile sections.
 */
export const SPOKEN_LANGUAGES = [
    { language: 'English', proficiency: 'Bilingual' },
    { language: 'Hindi', proficiency: 'Native' },
];

/**
 * Shape of a portfolio project used by project listing and project pages.
 */
export interface Project {
    /** Human readable project name */
    name: string;
    /** URL friendly slug generated with `slugify` */
    slug: string;
    /** Path to representative image */
    image: string;
    /** Short description used in lists */
    description: string;
    /** Array of technology/stack strings */
    technologies: string[];
    /** Live site URL */
    link?: string;
    /** Source repository URL */
    github: string;
    /** Whether the project should be highlighted on the homepage */
    featured: boolean;
    /** Problem the project solves */
    problem: string;
    /** Short architecture summary for technical readers */
    architecture: string;
    /** Outcome / impact summary */
    outcome: string;
}

/**
 * Canonical list of portfolio projects. Keep `Project` objects up-to-date to
 * ensure project pages and listings render correctly.
 */
export const PROJECTS: Project[] = [
    {
        name: 'ScamShield',
        slug: slugify('Scam Shield', { lower: true }),
        image: '/projects/scam-shield.png',
        description:
            'Advanced multi-modal scam detection platform protecting users from phishing, deepfakes, and prompt injections.',
        technologies: [
            'Next.js 15',
            'FastAPI',
            'Python',
            'MongoDB',
            'Redis',
            'Hugging Face',
            'Librosa',
            'Ollama (Qwen 2.5)',
        ],
        link: undefined,
        github: 'https://github.com/aditya04tripathi/ScamShield',
        featured: false,
        problem:
            'Digital scams are becoming increasingly sophisticated, spanning multiple communication channels like email, URLs, and even AI-generated audio (deepfakes), making it difficult for average users to verify the legitimacy of digital interactions.',
        architecture:
            'A microservices-inspired architecture featuring a Next.js frontend for real-time user interaction and a FastAPI backend. It utilizes specialized processors for spectral audio analysis, URL safety classification, and LLM-powered email and prompt injection detection, with MongoDB for persistence and Redis for task orchestration.',
        outcome:
            "Empowers users with a unified 'Risk Score' and real-time AI-generated explanations for potential threats, significantly lowering the barrier for identifying complex fraud across various digital mediums.",
    },
    {
        name: 'Vapor Vault',
        slug: 'vapor-vault',
        image: '/projects/vapour-vault.png',
        description:
            'Anonymous, self-destructing file sharing infrastructure built for secure, frictionless digital transfers.',
        technologies: [
            'NestJS',
            'PostgreSQL',
            'Prisma',
            'MinIO (S3)',
            'Redis',
            'BullMQ',
            'Docker',
            'TypeScript',
        ],
        link: 'https://vault.adityatripathi.dev',
        github: 'https://github.com/aditya04tripathi/VapourVault',
        featured: true,
        problem:
            'Traditional file sharing platforms require accounts, retain files indefinitely, and introduce privacy risks. Users often need a fast, anonymous way to share sensitive files without long-term storage or identity exposure.',
        architecture:
            'VaporVault is built on a modular NestJS API backed by PostgreSQL for metadata integrity and MinIO for S3-compatible object storage. File uploads use presigned URL flows to bypass API bottlenecks, while BullMQ and Redis power asynchronous jobs such as TTL enforcement and storage cleanup. The system is fully containerized via Docker for reproducible deployment and horizontal scalability.',
        outcome:
            'Delivered a production-ready ephemeral file infrastructure capable of secure uploads, time-bound access, and automated deletion. Achieved sub-200ms metadata response times, eliminated account friction entirely, and established a privacy-first file lifecycle suitable for temporary sharing use cases.',
    },
    {
        name: 'PennyWise',
        slug: slugify('PennyWise', { lower: true }),
        image: '/projects/pennywise.png',
        description:
            'Local-first personal finance tracker with budgets, receipt capture, recurring transactions, and full offline privacy.',
        technologies: [
            'React Native',
            'Expo',
            'TypeScript',
            'SQLite',
            'Biometric Auth',
            'CSV Import/Export',
        ],
        link: 'https://play.google.com/store/apps/details?id=com.adityatripathi.penny_wise',
        github: '',
        featured: false,
        problem:
            'Most budgeting apps rely on cloud storage and tracking, creating privacy concerns. Users need a fast, offline, local-first finance tracker that keeps data on-device while offering modern budgeting features.',
        architecture:
            'Local-first architecture with on-device persistence (SQLite) and zero cloud dependencies. Implements PIN and biometric unlock, recurring transaction scheduling, receipt photo attachments, and a high-contrast UI for quick entry. Data portability is ensured via CSV import/export. Works fully offline while maintaining instant transaction updates.',
        outcome:
            'Delivers privacy-first budgeting with snappy performance, clear dashboards, budget alerts, and complete data ownership. Users stay on budget without sacrificing privacy or speed.',
    },
    {
        name: 'DevEvent',
        slug: slugify('DevEvent', { lower: true }),
        image: '/projects/dev-event.png',
        description:
            'A hub for developer events featuring QR code booking, live search, and AI-powered recommendations.',
        technologies: [
            'Next.js',
            'React',
            'MongoDB',
            'Cloudinary',
            'GSAP',
            'Nodemailer',
        ],
        link: 'https://devevent.adityatripathi.dev',
        github: 'https://github.com/aditya04tripathi/dev-event',
        featured: false,
        problem:
            'Developer event discovery is fragmented, and organizers lack efficient tools for asset management and attendee verification.',
        architecture:
            'Full-stack Next.js 16 App Router. Cloudinary integration for optimized media delivery. Advanced MongoDB aggregation pipelines for tag-based similarity search. Nodemailer service for QR code delivery.',
        outcome:
            'Seamless QR check-in system. 60% faster image loading. 99% uptime on Railway deployment.',
    },
    {
        name: 'Gnosis AI',
        slug: slugify('Gnosis', { lower: true }),
        image: '/projects/gnosis.png',
        description:
            "AI-powered startup validator that generates flowcharts, SCRUM boards, and comprehensive validation reports using Groq's LLM.",
        technologies: [
            'Next.js',
            'Groq AI',
            'React Flow',
            'NextAuth.js',
            'MongoDB',
            'Shadcn UI',
            'Tailark',
        ],
        link: 'https://gnosis.adityatripathi.dev',
        github: 'https://github.com/aditya04tripathi/gnosis',
        featured: false,
        problem:
            'Founders often rely on gut feeling. Traditional validation is slow, biased, and lacks actionable execution planning.',
        architecture:
            "Leverages Groq's LPU inference engine for near-instant validation analysis. Implements JWT-based auth via NextAuth v5. Uses React Flow for interactive visual roadmaps and Mongoose for flexible document storage.",
        outcome:
            'Reduces validation time from weeks to seconds. innovative visual workflow generation. 90+ Lighthouse performance score.',
    },
];

export function engineeringProjectsList(
    projects: Project[] = PROJECTS,
): Project[] {
    return projects.filter((p) => p.name !== 'PennyWise');
}
