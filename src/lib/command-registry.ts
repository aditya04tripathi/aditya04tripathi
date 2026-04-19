import { CREATOR_INFO, PENNYWISE_PRIVACY_PATH, PROJECTS } from "@/lib/constants";

export type CommandDefinition =
	| { id: string; label: string; keywords: string; kind: "nav"; href: string }
	| { id: string; label: string; keywords: string; kind: "external"; href: string }
	| { id: string; label: string; keywords: string; kind: "mailto"; href: string };

export function getCommandDefinitions(): CommandDefinition[] {
	const projects: CommandDefinition[] = PROJECTS.map((p) => ({
		id: `project-${p.slug}`,
		label: p.name,
		keywords: `project ${p.slug} ${p.name} ${p.technologies.join(" ")}`,
		kind: "nav" as const,
		href: `/projects/${p.slug}`,
	}));

	return [
		{ id: "home", label: "Home", keywords: "index start root", kind: "nav", href: "/" },
		{
			id: "pennywise",
			label: "PennyWise product page",
			keywords: "pennywise app expense finance",
			kind: "nav",
			href: "/pennywise",
		},
		{
			id: "projects",
			label: "All projects",
			keywords: "archive portfolio engineering work",
			kind: "nav",
			href: "/projects",
		},
		{
			id: "blog",
			label: "Blog",
			keywords: "blog posts architecture writing engineering",
			kind: "nav",
			href: "/blog",
		},
		{
			id: "privacy",
			label: "PennyWise privacy policy",
			keywords: "legal terms gdpr data",
			kind: "nav",
			href: PENNYWISE_PRIVACY_PATH,
		},
		...projects,
		{
			id: "github",
			label: "Open GitHub profile",
			keywords: "source code repository",
			kind: "external",
			href: CREATOR_INFO.github,
		},
		{
			id: "linkedin",
			label: "Open LinkedIn profile",
			keywords: "network jobs",
			kind: "external",
			href: CREATOR_INFO.linkedin,
		},
		{
			id: "email",
			label: `Email ${CREATOR_INFO.email}`,
			keywords: "contact mail message",
			kind: "mailto",
			href: `mailto:${CREATOR_INFO.email}`,
		},
	];
}
