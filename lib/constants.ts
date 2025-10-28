import slugify from "slugify";

export const CREATOR_INFO = {
  name: "Aditya Tripathi",
  title: "Software Engineering Student & Developer",
  email: "adityatripathi.at04@gmail.com",
  location: "Victoria, Australia",
  linkedin: "https://www.linkedin.com/in/aditya-tripathi-887586379",
  github: "https://github.com/aditya04tripathi",
  bio: "Motivated software engineering student passionate about building web applications and creating solutions that connect people. Currently pursuing Bachelor of Software Engineering (Hons.) at Monash University.",
};

export const EDUCATION = [
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
    link: "https://dev-event.up.railway.app",
    github: "https://github.com/aditya04tripathi/dev-event",
    featured: true,
  },
];

export const metadata = {
  metadataBase: new URL("https://adityatripathi.up.railway.app"),
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
