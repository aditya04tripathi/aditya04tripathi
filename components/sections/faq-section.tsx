import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
	{
		question: "What technologies do you specialize in?",
		answer:
			"I specialize in modern web development technologies including Next.js, React, TypeScript, Node.js, and MongoDB. I also have experience with Tailwind CSS, shadcn/ui, REST APIs, and cloud services like Cloudinary. I'm always learning and adapting to stay current with industry best practices.",
	},
	{
		question: "How long does it take to develop a web application?",
		answer:
			"The timeline depends on the project scope, complexity, and requirements. A simple portfolio website might take 1-2 weeks, while a full-stack application with authentication, database integration, and advanced features could take 4-8 weeks or more. I'll provide a detailed timeline estimate after understanding your specific needs.",
	},
	{
		question: "Do you provide ongoing maintenance and support?",
		answer:
			"Yes, I offer ongoing maintenance and support services. This includes bug fixes, security updates, feature enhancements, performance optimization, and technical support. We can discuss a maintenance plan that fits your needs and budget.",
	},
	{
		question: "Can you work with existing codebases or only start from scratch?",
		answer:
			"I can work with both! I'm comfortable diving into existing codebases, understanding legacy code, and making improvements or additions. Whether you need help refactoring, adding features, or migrating to modern technologies, I can adapt to your existing project structure and requirements.",
	},
	{
		question: "What is your development process?",
		answer:
			"My development process follows best practices: starting with requirements gathering and planning, creating a technical roadmap, setting up the project structure, and then building iteratively with regular communication. I emphasize clean code, testing, and documentation to ensure maintainable and scalable solutions.",
	},
	{
		question: "Do you offer hosting and deployment services?",
		answer:
			"I can help you deploy your application to platforms like Vercel, Netlify, or other cloud providers. I'll guide you through the deployment process and can set up CI/CD pipelines for automated deployments. Hosting costs are handled separately by the client.",
	},
	{
		question: "What is your pricing model?",
		answer:
			"Pricing varies based on project scope, complexity, and timeline. I offer both fixed-price contracts for well-defined projects and hourly rates for ongoing work or flexible requirements. Let's discuss your project needs, and I'll provide a transparent quote that fits your budget.",
	},
	{
		question: "How do you ensure code quality and best practices?",
		answer:
			"I follow industry best practices including TypeScript for type safety, ESLint for code quality, proper error handling, responsive design principles, and accessibility standards. I write clean, readable, and well-documented code. Code reviews, testing, and continuous refactoring are integral parts of my workflow.",
	},
];

export function FAQSection() {
	return (
		<section className="space-y-5 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
			<h2 className="font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl">
				Frequently Asked Questions
			</h2>
			<Accordion type="single" collapsible className="w-full space-y-3">
				{faqs.map((faq, index) => (
					<AccordionItem
						key={faq.question}
						value={`item-${index + 1}`}
						className="rounded-lg border border-border bg-card px-4"
					>
						<AccordionTrigger className="text-left">
							{faq.question}
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							{faq.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}

