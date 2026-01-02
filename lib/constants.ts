import { format } from "date-fns";
import slugify from "slugify";

export const CREATOR_INFO = {
	name: "Aditya Tripathi",
	title: "Software Engineer | Full Stack Developer",
	email: "me@adityatripathi.dev",
	location: "Clayton, VIC, Australia",
	linkedin: "https://www.linkedin.com/in/adityatripathi0404",
	github: "https://github.com/aditya04tripathi",
	githubRepo: "https://github.com/aditya04tripathi/aditya04tripathi",
	bio: "Software Engineering student at Monash University and results-driven Full Stack Developer with hands-on experience designing, developing, and deploying scalable web applications. Specialized in Next.js, TypeScript, and Cloud Infrastructure.",
	avatar:
		"https://res.cloudinary.com/dpaqsdcky/image/upload/v1761473970/pfp_cw1znb.jpg",
	ogImage: "/og-image.png",
	phone: "+61 0469 037 678",
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
		period: `${format(new Date("2025-02-01"), "LLLL yyyy")} - ${format(new Date("2026-12-01"), "LLLL yyyy")} (Expected)`,
		status: "Student",
	},
	{
		degree: "Diploma in Computer Science Engineering",
		institution: "Amity University",
		location: "Noida, Uttar Pradesh, India",
		period: `${format(new Date("2022-09-01"), "LLLL yyyy")} - ${format(new Date("2024-07-01"), "LLLL yyyy")}`,
		status: "Completed",
	},
];

export const SKILLS = {
	technical: [
		"JavaScript (Advanced)",
		"TypeScript",
		"Python",
		"Java",
		"C",
		"C++",
		"React.js",
		"Next.js 16",
		"Node.js",
		"PostgreSQL",
		"MongoDB",
		"Redux Toolkit",
		"Tailwind CSS",
		"Docker",
		"FastAPI",
		"React Native",
		"AWS (Familiar)",
	],
	soft: [
		"Communication",
		"Leadership",
		"Collaboration",
		"Adaptability",
		"Time Management",
	],
};

export const WORK_EXPERIENCE = [
	{
		role: "Software Engineer Intern",
		company: "LENS Corporation",
		location: "Gurugram, India",
		period: `${format(new Date("2024-09-01"), "LLLL yyyy")} - ${format(new Date("2024-12-01"), "LLLL yyyy")}`,
		description:
			"Designed and developed modular web components, improving maintainability. implemented responsive UI layouts and integrated RESTful APIs to optimize client-server data flow. participated in Agile sprints for feature planning and production deployments.",
	},
	{
		role: "Freelance Web Developer",
		company: "Amity University",
		location: "Noida, India",
		period: `${format(new Date("2024-06-01"), "LLLL yyyy")} - ${format(new Date("2024-08-01"), "LLLL yyyy")}`,
		description:
			"Developed responsive CSE Department website hosting 50+ faculty profiles. Optimized REST APIs and caching, improving load performance by 95%. Achieved 90+ Lighthouse score.",
	},
	{
		role: "Frontend Engineer Intern",
		company: "MAI HEALTH",
		location: "Remote, USA",
		period: `${format(new Date("2024-05-01"), "LLLL yyyy")} - ${format(new Date("2024-06-01"), "LLLL yyyy")}`,
		description:
			"Developed React-based patient portal supporting 1,000+ users with real-time appointment data. Migrated application state to Redux Toolkit, increasing maintainability by 40%.",
	},
	{
		role: "Campus Ambassador",
		company: "Cisco",
		location: "Noida, India",
		period: `${format(new Date("2023-08-01"), "LLLL yyyy")} - ${format(new Date("2024-07-01"), "LLLL yyyy")}`,
		description:
			"Represented Cisco on campus, promoting technical initiatives. Organized technology workshops and acted as a liaison between students and industry professionals.",
	},
];

export const CERTIFICATIONS = [
	"Programming with JavaScript",
	"Introduction to Front End Development",
];

export const SPOKEN_LANGUAGES = [
	{ language: "English", proficiency: "Bilingual" },
	{ language: "Hindi", proficiency: "Native" },
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
			"Tailark",
		],
		link: "https://gnosis.adityatripathi.dev",
		github: "https://github.com/aditya04tripathi/saas-help-ai",
		featured: true,
		problem:
			"Founders often rely on gut feeling. Traditional validation is slow, biased, and lacks actionable execution planning.",
		architecture:
			"Leverages Groq's LPU inference engine for near-instant validation analysis. Implements JWT-based auth via NextAuth v5. Uses React Flow for interactive visual roadmaps and Mongoose for flexible document storage.",
		outcome:
			"Reduces validation time from weeks to seconds. innovative visual workflow generation. 90+ Lighthouse performance score.",
	},
	{
		name: "LexInvo",
		slug: slugify("LexInvo", { lower: true }),
		image: "/projects/lexinvo.png",
		description:
			"Australian & Indian compliant invoicing platform featuring ABN/GSTIN validation, automated tax calculations, and JWT authentication.",
		technologies: [
			"Next.js 16",
			"PostgreSQL",
			"Drizzle ORM",
			"Tailwind CSS v4",
			"Zod",
			"Server Actions",
		],
		link: "https://lexinvo.adityatripathi.dev", // inferred
		github: "https://github.com/aditya04tripathi/lexinvo",
		featured: true,
		problem:
			"Australian and Indian freelancers struggle with complex compliance requirements (GST, ABN/GSTIN validation) and generic invoicing tools lack local context.",
		architecture:
			"Built on Next.js 16 Server Actions with 'use cache'. Custom JWT implementation for secure, stateless auth. PostgreSQL with Drizzle ORM ensures strict type safety and relational data integrity.",
		outcome:
			"100% ATO-compliant and GST-compliant invoice generation. Automated ABN/GSTIN lookup reduces entry errors. Zero-runtime CSS overhead with Tailwind v4.",
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
			"Nodemailer",
		],
		link: "https://dev-event.up.railway.app",
		github: "https://github.com/aditya04tripathi/dev-event",
		featured: true,
		problem:
			"Developer event discovery is fragmented, and organizers lack efficient tools for asset management and attendee verification.",
		architecture:
			"Full-stack Next.js 16 App Router. Cloudinary integration for optimized media delivery. Advanced MongoDB aggregation pipelines for tag-based similarity search. Nodemailer service for QR code delivery.",
		outcome:
			"Seamless QR check-in system. 60% faster image loading. 99% uptime on Railway deployment.",
	},
];

export const ENGINEERING_NOTES = [
	{
		title: "Enforcing Strict Compliance with Type-Safe Server Actions",
		category: "System Architecture",
		date: "2025-08-15",
		summary:
			"Australian and Indian freelancers struggle with complex compliance requirements (GST, ABN/GSTIN validation) and generic invoicing tools lack local context.",
		decision:
			"Built on Next.js 16 Server Actions with 'use cache'. Custom JWT implementation for secure, stateless auth. PostgreSQL with Drizzle ORM ensures strict type safety and relational data integrity.",
		tradeoffs: [
			"Server-side ABN validation ensures 100% ATO compliance.",
			"Zero-runtime CSS overhead with Tailwind v4 improves performance.",
			"Strict type safety requires maintaining Drizzle schemas alongside Zod types.",
		],
	},
	{
		title: "Optimizing Media Persistence: Migrating from Base64 to Cloudinary",
		category: "Infrastructure",
		date: "2025-01-05",
		summary:
			"Storing event banners as Base64 strings in MongoDB caused massive document bloat and slow API responses. It also made CDN caching and responsive image optimization impossible.",
		decision:
			"Migrated to a Cloudinary-native storage pipeline. Assets are now uploaded to Cloudinary buckets and served via their edge network, allowing for dynamic WebP/AVIF transformations and global caching.",
		tradeoffs: [
			"Increased architectural complexity with multi-step upload flows.",
			"Introduced dependency on third-party media providers.",
			"Reduced database storage by 95% and improved LCP by 60% through edge delivery.",
		],
	},
	{
		title: "Eliminating Hydration Mismatches in Theme Systems",
		category: "Frontend Architecture",
		date: "2024-12-20",
		summary:
			"Implementing persistent dark mode often leads to the 'flash of incorrect theme' or hydration warnings when server HTML mismatches client local storage state.",
		decision:
			"Integrated `next-themes` to manage theme persistence and synchronization. It leverages a blocking script in the document head to apply the correct CSS class before the first paint, effectively bypassing hydration mismatches between server-rendered HTML and client-side storage.",
		tradeoffs: [
			"Introduces a small third-party dependency to the client bundle.",
			"Requires careful ThemeProvider placement to avoid unnecessary component re-renders.",
			"Eliminated FOUC completely, achieving a consistent 0.7s Speed Index.",
		],
	},
];
