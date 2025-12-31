import slugify from "slugify";

export const CREATOR_INFO = {
	name: "Aditya Tripathi",
	title: "Software Engineer | Full Stack Developer",
	email: "me@adityatripathi.dev",
	location: "Clayton, VIC, Australia",
	linkedin: "https://www.linkedin.com/in/adityatripathi0404",
	github: "https://github.com/aditya04tripathi",
	githubRepo: "https://github.com/aditya04tripathi/aditya04tripathi",
	bio: "Software Engineering student at Monash University and results-driven Full Stack Developer. Specialized in building scalable, production-grade applications with Next.js, TypeScript, and Cloud Infrastructure.",
	avatar:
		"https://res.cloudinary.com/dpaqsdcky/image/upload/v1761473970/pfp_cw1znb.jpg",
	ogImage: "/og-image.png",
};

export const SITE_CONFIG = {
	url: "https://adityatripathi.dev",
	name: "Aditya Tripathi Portfolio",
};

export const EDUCATION = [
	{
		degree: "Bachelor of Engineering (Honours) - Software Engineering",
		institution: "Monash University",
		location: "Clayton, Melbourne, Australia",
		period: "Feb 2025 - Dec 2026 (Expected)",
		status: "Student",
	},
    {
		degree: "Diploma in Computer Science Engineering",
		institution: "Amity University",
		location: "Noida, Uttar Pradesh, India",
		period: "Sep 2022 - Jul 2024",
		status: "Completed",
	},
];

export const SKILLS = {
	technical: [
		"JavaScript (Advanced)",
        "TypeScript",
        "Python",
        "React.js",
		"Next.js 16",
        "Node.js",
		"PostgreSQL",
        "MongoDB",
		"Redux Toolkit",
        "Tailwind CSS",
		"Docker",
        "FastAPI",
        "React Native"
	],
	soft: [
		"Communication",
        "Leadership",
		"Collaboration",
        "Adaptability",
        "Time Management"
	],
};

export const WORK_EXPERIENCE = [
    {
		role: "Software Engineer Intern",
		company: "LENS Corporation",
		location: "Gurugram, India",
		period: "Sep 2024 - Dec 2024",
		description:
			"Designed and developed modular web components, improving maintainability. implemented responsive UI layouts and integrated RESTful APIs to optimize client-server data flow. participated in Agile sprints for feature planning and production deployments.",
	},
    {
		role: "Freelance Web Developer",
		company: "Amity University",
		location: "Noida, India",
		period: "Jun 2024 - Aug 2024",
		description:
			"Developed responsive CSE Department website hosting 50+ faculty profiles. Optimized REST APIs and caching, improving load performance by 95%. Achieved 90+ Lighthouse score.",
	},
	{
		role: "Frontend Engineer Intern",
		company: "MAI HEALTH",
		location: "Remote, USA",
		period: "May 2024 - Jun 2024",
		description:
			"Developed React-based patient portal supporting 1,000+ users with real-time appointment data. Migrated application state to Redux Toolkit, increasing maintainability by 40%.",
	},
];

export interface Project {
    name: string;
    slug: string;
    image: string;
    description: string;
    technologies: string[];
    link: string;
    github: string;
    featured: boolean;
    problem: string;
    architecture: string;
    outcome: string;
}

export const PROJECTS: Project[] = [
    {
		name: "Gnosis AI",
		slug: slugify("Gnosis", { lower: true }),
		image: "/projects/gnosis.png",
		description:
			"AI-powered startup validator that generates flowcharts, SCRUM boards, and comprehensive validation reports using Groq's LLM.",
		technologies: [
			"Next.js 16",
            "Groq AI",
			"React Flow",
            "NextAuth.js",
			"MongoDB",
            "Shadcn UI",
            "Tailark"
		],
		link: "https://gnosis.adityatripathi.dev",
		github: "https://github.com/aditya04tripathi/saas-help-ai", 
        featured: true,
        problem: "Founders often rely on gut feeling. Traditional validation is slow, biased, and lacks actionable execution planning.",
        architecture: "Leverages Groq's LPU inference engine for near-instant validation analysis. Implements JWT-based auth via NextAuth v5. Uses React Flow for interactive visual roadmaps and Mongoose for flexible document storage.",
        outcome: "Reduces validation time from weeks to seconds. innovative visual workflow generation. 90+ Lighthouse performance score."
	},
    {
		name: "LexInvo",
		slug: slugify("LexInvo", { lower: true }),
		image: "/projects/lexinvo.png",
		description:
			"Australian-compliant invoicing platform featuring ABN validation, automated GST calculations, and JWT authentication.",
		technologies: [
			"Next.js 16",
            "PostgreSQL",
			"Drizzle ORM",
			"Tailwind CSS v4",
            "Zod",
            "Server Actions"
		],
		link: "https://lexinvo.adityatripathi.dev", // inferred
		github: "https://github.com/aditya04tripathi/lexinvo",
        featured: true,
        problem: "Australian freelancers struggle with complex compliance requirements (GST, ABN validation) and generic invoicing tools lack local context.",
        architecture: "Built on Next.js 16 Server Actions with 'use cache'. Custom JWT implementation for secure, stateless auth. PostgreSQL with Drizzle ORM ensures strict type safety and relational data integrity.",
        outcome: "100% ATO-compliant invoice generation. Automated ABN lookup reduces entry errors. Zero-runtime CSS overhead with Tailwind v4."
	},
	{
		name: "DevEvent",
		slug: slugify("DevEvent", { lower: true }),
		image: "/projects/dev-event.png",
		description:
			"A hub for developer events featuring QR code booking, live search, and AI-powered recommendations.",
		technologies: [
			"Next.js 16",
			"React 19",
			"MongoDB",
			"Cloudinary",
			"GSAP",
            "Nodemailer"
		],
		link: "https://dev-event.up.railway.app",
		github: "https://github.com/aditya04tripathi/dev-event",
        featured: true,
        problem: "Developer event discovery is fragmented, and organizers lack efficient tools for asset management and attendee verification.",
        architecture: "Full-stack Next.js 16 App Router. Cloudinary integration for optimized media delivery. Advanced MongoDB aggregation pipelines for tag-based similarity search. Nodemailer service for QR code delivery.",
        outcome: "Seamless QR check-in system. 60% faster image loading. 99% uptime on Railway deployment."
	},
];

export const ENGINEERING_NOTES = [
    {
        title: "Orchestrating Hybrid Inference Pipelines with Groq LPU & GPT-4o",
        category: "AI Systems Engineering",
        date: "2025-09-12",
        summary: "For Gnosis, relying solely on GPT-4 for all inference tasks introduced unacceptable latency (~3s TTFT) for real-time validation scoring. We needed a way to balance reasoning depth with interaction speed.",
        decision: "architected a 'switch-router' pattern: Groq's LPU handles semantic parsing and initial structural validation (<200ms), while complex market reasoning is asynchronously designated to GPT-4o. This tiered approach decoupled interface responsiveness from reasoning cost.",
        tradeoffs: [
            "Increased system complexity due to dual-provider error handling and token normalization.",
            "Requires stateful tracking of partial streams to maintain context coherence.",
            "Reduced average user wait time by 85% while maintaining high fidelity output."
        ]
    },
    {
        title: "Optimizing Asset Delivery at Edge for Dynamic Events",
        category: "Infrastructure",
        date: "2025-01-05",
        summary: "DevEvent's user-generated content led to massive LCP regressions. Serving raw uploads directly from S3 buckets caused bandwidth spikes and mobile latency issues.",
        decision: "Implemented an 'eager-transformation' layer using Cloudinary. On upload, assets are effectively proxied and transformed into WebP/AVIF variants at the edge. We utilized Next.js Image component 'loader' prop to dynamically request optimized viewports.",
        tradeoffs: [
            "Introduced dependency on third-party availability for media serving.",
            "Slight upload latency increase due to synchronous metadata extraction.",
            "Improved LCP by 60% and Reduced bandwidth egress costs by 40%."
        ]
    },
    {
        title: "Eliminating Hydration Mismatches in Theme Systems",
        category: "Frontend Architecture",
        date: "2024-12-20",
        summary: "Implementing persistent dark mode in the Portfolio often leads to the 'flash of incorrect theme' (FOUC) or hydration warnings when server HTML mismatches client local storage state.",
        decision: "Utilized a script injection strategy in the document head to block painting until the correct theme class is applied to the DOM root. This bypasses React's hydration pass for the critical style token, ensuring consistency.",
        tradeoffs: [
            "Technically blocking the main thread for nanoseconds during parsing.",
            "Requires dangerousSetInnerHTML usage which necessitates strict CSP validation.",
            "Eliminated FOUC completely, achieving 0.7s Speed Index."
        ]
    }
];
