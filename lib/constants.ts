import slugify from "slugify";

export const CREATOR_INFO = {
  name: "Aditya Tripathi",
  title: "Software Engineering Student & Developer",
  email: "me@adityatripathi.dev",
  location: "Victoria, Australia",
  linkedin: "https://www.linkedin.com/in/aditya-tripathi-887586379",
  github: "https://github.com/aditya04tripathi",
  bio: "Motivated software engineering student passionate about building web applications and creating solutions that connect people. Currently pursuing Bachelor of Software Engineering (Hons.) at Monash University.",
};

export const EDUCATION = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "Amity University, Noida",
    location: "Noida, Uttar Pradesh, India",
    period: "September 2022 - July 2022",
    status: "Graduated",
  },
  {
    degree: "Bachelor of Software Engineering (Honours)",
    institution: "Monash University",
    location: "Clayton, Melbourne, Australia",
    period: "February 2025 - Present",
    status: "Currently Enrolled",
  },
];

export const SKILLS = {
  technical: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Tailwind CSS",
    "Git",
    "REST APIs",
  ],
  soft: [
    "Problem Solving",
    "Teamwork",
    "Communication",
    "Adaptability",
    "Time Management",
    "Customer Service",
    "Fast-paced Environment",
  ],
};

export const WORK_EXPERIENCE = [
  {
    role: "Software Engineer Intern",
    company: "LENS Corporation",
    location: "Gurugram, Haryana, India · Hybrid",
    period: "September 2024 - December 2024",
    description:
      "Architected and deployed responsive web applications, leveraging modern frameworks to enhance user engagement. Collaborated cross-functionally with design and backend teams to deliver pixel-perfect interfaces and optimized performance.",
  },
  {
    role: "Frontend Web Developer",
    company: "MAI HEALTH",
    location: "Maryland, United States · Remote",
    period: "May 2024 - June 2024",
    description:
      "Engineered dynamic, user-centric web interfaces for healthcare solutions, transforming complex requirements into intuitive digital experiences. Implemented responsive designs and streamlined workflows to improve accessibility and patient engagement.",
  },
  {
    role: "Warehouse Hand",
    company: "South East Timber",
    location: "Pakenham, Victoria, Australia",
    period: "September 2025",
    description:
      "Orchestrated inventory management systems and optimized warehouse operations, ensuring seamless logistics and timely order fulfillment in a fast-paced distribution environment.",
  },
  {
    role: "Car Wash Assistant",
    company: "Pakenham Car Wash",
    location: "Pakenham, Victoria",
    period: "August 2025 - September 2025",
    description:
      "Delivered excellence in customer service while maintaining meticulous quality standards, ensuring client satisfaction through attention to detail and efficient service delivery.",
  },
];

export const PROJECTS = [
  {
    name: "Dev Event",
    slug: slugify("Dev Event", { lower: true }),
    image: "/dev-event.png",
    description:
      "A full-stack event management platform for developers. Features include event creation, search, filtering, pagination, and image uploads.",
    technologies: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Cloudinary",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    link: "https://dev-event.adityatripathi.dev",
    github: "https://github.com/aditya04tripathi/dev-event",
    featured: true,
    features: [
      "Full-stack event management with CRUD operations",
      "Real-time search and filtering with pagination",
      "Image upload and CDN integration with Cloudinary",
      "Responsive design with Tailwind CSS and shadcn/ui",
      "Server actions and API routes for data handling",
      "MongoDB database with Mongoose ODM",
      "Type-safe development with TypeScript",
      "Optimized performance and SEO",
    ],
    technicalHighlights: [
      {
        title: "Frontend Architecture",
        description:
          "Built with Next.js 15 and React, utilizing the App Router for optimal performance and SEO. The UI is crafted with Tailwind CSS and shadcn/ui components, ensuring a modern and accessible user experience across all devices.",
      },
      {
        title: "Backend & Database",
        description:
          "Leverages Next.js Server Actions and API routes for seamless client-server communication. MongoDB serves as the database with Mongoose ODM for robust data modeling and validation.",
      },
      {
        title: "Cloud Integration",
        description:
          "Integrated with Cloudinary for efficient image management, including upload, optimization, and CDN delivery. This ensures fast loading times and excellent user experience.",
      },
      {
        title: "Developer Experience",
        description:
          "Full TypeScript implementation provides type safety and enhanced developer productivity. The codebase follows best practices with proper error handling, loading states, and responsive design patterns.",
      },
    ],
  },
  {
    name: "Gnosis",
    slug: slugify("Gnosis", { lower: true }),
    image: "/gnosis.png",
    description:
      "A full-stack AI-powered startup validation platform, which allows users to validate their startup ideas and get feedback from AI. With a detailed analysis of the startup idea, the platform provides a score and a detailed flowchart, and a SCRUM board of the startup idea.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Groq",
      "OpenAI",
      "PayPal",
    ],
    link: "https://gnosis.adityatripathi.dev",
    github: "https://github.com/aditya04tripathi/gnosis",
    featured: false,
    features: [
      "AI-powered startup idea validation and analysis",
      "Comprehensive startup scoring system",
      "Interactive flowchart generation for startup roadmap",
      "SCRUM board creation for project management",
      "Payment integration with PayPal",
      "Responsive design with Tailwind CSS and shadcn/ui",
      "Type-safe development with TypeScript",
      "Optimized performance and SEO",
    ],
    technicalHighlights: [
      {
        title: "AI Integration",
        description:
          "Leverages Groq and OpenAI APIs to provide intelligent startup validation and analysis. The platform uses advanced AI models to generate comprehensive feedback, scores, and actionable insights for startup ideas.",
      },
      {
        title: "Frontend Architecture",
        description:
          "Built with Next.js 15 and React, utilizing the App Router for optimal performance. The UI is crafted with Tailwind CSS and shadcn/ui components, ensuring a modern and accessible user experience across all devices.",
      },
      {
        title: "Payment Processing",
        description:
          "Integrated with PayPal for secure payment processing, enabling users to access premium features and services. The payment flow is seamless and user-friendly.",
      },
      {
        title: "Developer Experience",
        description:
          "Full TypeScript implementation provides type safety and enhanced developer productivity. The codebase follows best practices with proper error handling, loading states, and responsive design patterns.",
      },
    ],
  },
  {
    name: "Portfolio",
    slug: slugify("Portfolio", { lower: true }),
    image: "/portfolio.png",
    description:
      "A modern, responsive portfolio website showcasing my work, experience, and skills. Built with Next.js 16 and featuring dynamic project pages, responsive design, and optimized performance.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "GSAP",
      "Motion",
    ],
    link: "https://adityatripathi.dev",
    github: "https://github.com/aditya04tripathi/portfolio",
    featured: true,
    features: [
      "Responsive portfolio website with modern UI/UX",
      "Dynamic project pages with detailed information",
      "Comprehensive showcase of skills, education, and work experience",
      "SEO optimized with metadata and Open Graph tags",
      "Responsive design with Tailwind CSS and shadcn/ui components",
      "Smooth animations with GSAP and Motion libraries",
      "Type-safe development with TypeScript",
      "Optimized performance and accessibility",
    ],
    technicalHighlights: [
      {
        title: "Next.js 16 App Router",
        description:
          "Built with Next.js 16 utilizing the App Router for optimal performance, SEO, and developer experience. Features dynamic routing for project pages and server-side rendering capabilities.",
      },
      {
        title: "Modern UI Components",
        description:
          "Leverages shadcn/ui components built on Radix UI primitives, ensuring accessibility and a consistent design system. Components include Avatar, Badge, Button, Card, HoverCard, and Separator.",
      },
      {
        title: "Responsive Design",
        description:
          "Fully responsive design that works seamlessly across all device sizes, from mobile to desktop. Uses Tailwind CSS for utility-first styling with a dark theme optimized for readability.",
      },
      {
        title: "Developer Experience",
        description:
          "Full TypeScript implementation provides type safety throughout the codebase. The project structure is organized with clear separation of concerns, making it maintainable and scalable.",
      },
    ],
  },
];

export const metadata = {
  metadataBase: new URL("https://adityatripathi.dev"),
  title: "About",
  description:
    "Learn about Aditya Tripathi, the developer behind DevEvent. Full-stack developer specializing in Next.js, React, TypeScript, and MongoDB.",
  keywords: [
    "Aditya Tripathi",
    "developer",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "portfolio",
  ],
  openGraph: {
    title: "About Aditya Tripathi | DevEvent",
    description:
      "Learn about the developer behind DevEvent. Full-stack developer specializing in modern web technologies.",
    type: "profile",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Aditya Tripathi | DevEvent",
      },
    ],
  },
};
