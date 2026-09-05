import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    CREATOR_INFO,
    EDUCATION,
    ENGINEERING_PROJECTS_INTRO,
    HERO_HEADLINE,
    HERO_PRODUCT_LINE,
    PROJECTS,
    SITE_CONFIG,
    SKILLS,
    WORK_EXPERIENCE,
    engineeringProjectsList,
} from '../src/lib/constants.ts';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(rootDir, 'dist/client');

function estimateTokens(text: string): number {
    return Math.max(1, Math.ceil(text.length / 4));
}

function yamlFrontmatter(fields: Record<string, string | undefined>): string {
    const lines = Object.entries(fields)
        .filter(([, value]) => value != null && value !== '')
        .map(([key, value]) => {
            const raw = String(value);
            const escaped = raw.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
            return `${key}: "${escaped}"`;
        });
    return `---\n${lines.join('\n')}\n---\n`;
}

function stripHtml(html: string): string {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<svg[\s\S]*?<\/svg>/gi, '')
        .replace(/<\/(p|div|h[1-6]|li|tr|section|article|header|footer)>/gi, '\n\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<li[^>]*>/gi, '- ')
        .replace(/<h1[^>]*>/gi, '# ')
        .replace(/<h2[^>]*>/gi, '## ')
        .replace(/<h3[^>]*>/gi, '### ')
        .replace(/<[^>]+>/g, '')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'")
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

function parseMdx(raw: string): {
    data: Record<string, string>;
    body: string;
} {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
        return { data: {}, body: raw.trim() };
    }

    const data: Record<string, string> = {};
    for (const line of match[1].split(/\r?\n/)) {
        const idx = line.indexOf(':');
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        let value = line.slice(idx + 1).trim();
        if (
            (value.startsWith("'") && value.endsWith("'")) ||
            (value.startsWith('"') && value.endsWith('"'))
        ) {
            value = value.slice(1, -1);
        }
        data[key] = value;
    }

    return { data, body: match[2].trim() };
}

type AgentPage = {
    route: string;
    markdown: string;
    tokens: number;
};

function page(
    route: string,
    title: string,
    description: string,
    body: string,
): AgentPage {
    const markdown = `${yamlFrontmatter({ title, description })}\n${body.trim()}\n`;
    return {
        route,
        markdown,
        tokens: estimateTokens(markdown),
    };
}

function outputPathsForRoute(route: string): string[] {
    if (route === '/') {
        return ['index.md'];
    }
    const trimmed = route.replace(/\/$/, '').replace(/^\//, '');
    return [`${trimmed}.md`, path.join(trimmed, 'index.md')];
}

function buildCaddyTokenMap(pages: AgentPage[]): string {
    const entries = new Map<string, string>();
    for (const pageInfo of pages) {
        const tokens = String(pageInfo.tokens);
        if (pageInfo.route === '/') {
            entries.set('/', tokens);
        } else {
            const base = pageInfo.route.replace(/\/$/, '');
            entries.set(base, tokens);
            entries.set(`${base}/`, tokens);
        }
    }

    const lines = ['map {http.request.uri.path} {markdown_tokens} {'];
    for (const [routePath, tokens] of [...entries.entries()].sort(([a], [b]) =>
        a.localeCompare(b),
    )) {
        lines.push(`\t${routePath} ${tokens}`);
    }
    lines.push('\tdefault 0');
    lines.push('}');
    lines.push('');
    return `${lines.join('\n')}\n`;
}

async function main() {
    await fs.access(outDir);

    const pages: AgentPage[] = [];
    const site = SITE_CONFIG.url;

    pages.push(
        page(
            '/',
            `${CREATOR_INFO.name} | Software Engineer`,
            `${CREATOR_INFO.name} — software engineer building scalable systems and privacy-first apps. Creator of PennyWise. Next.js, TypeScript, and production systems.`,
            `# ${CREATOR_INFO.name}

${HERO_HEADLINE}

${HERO_PRODUCT_LINE}

${CREATOR_INFO.bio}

## Contact

- Email: ${CREATOR_INFO.email}
- Location: ${CREATOR_INFO.location}
- GitHub: ${CREATOR_INFO.github}
- LinkedIn: ${CREATOR_INFO.linkedin}
- Site: ${site}

## Skills

${SKILLS.technical.map((s) => `- ${s}`).join('\n')}

## Work experience

${WORK_EXPERIENCE.map(
    (job) =>
        `### ${job.role} — ${job.company}

${job.location} · ${job.period}

${job.description}`,
).join('\n\n')}

## Education

${EDUCATION.map(
    (ed) =>
        `- **${ed.degree}**, ${ed.institution} (${ed.location}) — ${ed.status}${ed.notes ? `. ${ed.notes}` : ''}`,
).join('\n')}

## Projects

${PROJECTS.map(
    (p) => `- [${p.name}](${site}/projects/${p.slug}): ${p.description}`,
).join('\n')}

## Links

- [Blog](${site}/blog)
- [Projects](${site}/projects)
- [PennyWise](${site}/pennywise)
`,
        ),
    );

    const blogDir = path.join(rootDir, 'src/content/blog');
    const blogFiles = (await fs.readdir(blogDir))
        .filter((name) => name.endsWith('.mdx'))
        .sort();

    const blogSummaries: Array<{
        slug: string;
        title: string;
        description: string;
        category?: string;
        date?: string;
    }> = [];

    for (const file of blogFiles) {
        const raw = await fs.readFile(path.join(blogDir, file), 'utf8');
        const { data, body } = parseMdx(raw);
        const slug = file.replace(/\.mdx$/, '');
        const title = data.title ?? slug;
        const description = data.description ?? '';
        blogSummaries.push({
            slug,
            title,
            description,
            category: data.category,
            date: data.date,
        });

        pages.push(
            page(
                `/blog/${slug}`,
                `${title} | Aditya Tripathi`,
                description,
                `# ${title}

${data.category ? `Category: ${data.category}  \n` : ''}${data.date ? `Date: ${data.date}\n` : ''}
${description}

${body}
`,
            ),
        );
    }

    pages.push(
        page(
            '/blog',
            'Blog | Aditya Tripathi',
            'Technical posts on architecture, infrastructure, and frontend engineering.',
            `# Blog

Technical posts on architecture, infrastructure, and frontend engineering.

${blogSummaries
    .map(
        (post) =>
            `- [${post.title}](${site}/blog/${post.slug})${post.category ? ` (${post.category})` : ''}: ${post.description}`,
    )
    .join('\n')}
`,
        ),
    );

    pages.push(
        page(
            '/projects',
            'Engineering Projects | Aditya Tripathi',
            'Systems, tools, and infrastructure — scalable backends, web apps, and experiments.',
            `# Engineering Projects

${ENGINEERING_PROJECTS_INTRO}

${engineeringProjectsList()
    .map(
        (p) => `## [${p.name}](${site}/projects/${p.slug})

${p.description}

**Stack:** ${p.technologies.join(', ')}
`,
    )
    .join('\n')}
`,
        ),
    );

    for (const project of PROJECTS) {
        pages.push(
            page(
                `/projects/${project.slug}`,
                `${project.name} | ${CREATOR_INFO.name}`,
                `${project.description} Built with ${project.technologies.join(', ')}.`,
                `# ${project.name}

${project.description}

## Problem

${project.problem}

## Architecture

${project.architecture}

## Outcome

${project.outcome}

## Stack

${project.technologies.map((t) => `- ${t}`).join('\n')}

## Links

${project.link ? `- Live: ${project.link}` : '- Live: n/a'}
${project.github ? `- Source: ${project.github}` : '- Source: n/a'}
`,
            ),
        );
    }

    const pennyWise = PROJECTS.find((p) => p.name === 'PennyWise');
    if (pennyWise) {
        pages.push(
            page(
                '/pennywise',
                `PennyWise | ${CREATOR_INFO.name}`,
                'Private offline expense tracker. Local-first finance on your device — no account, no cloud storage of your transactions.',
                `# PennyWise

${pennyWise.description}

${pennyWise.problem}

## Architecture

${pennyWise.architecture}

## Outcome

${pennyWise.outcome}

## Stack

${pennyWise.technologies.map((t) => `- ${t}`).join('\n')}

## Links

${pennyWise.link ? `- Install: ${pennyWise.link}` : ''}
- Privacy policy: ${site}/privacy-policy/pennywise
`,
            ),
        );
    }

    const privacyAstro = await fs.readFile(
        path.join(rootDir, 'src/components/legal/PennywisePrivacyContent.astro'),
        'utf8',
    );
    const privacyBody = stripHtml(privacyAstro.replace(/^---[\s\S]*?---\s*/, ''));
    const privacyPage = page(
        '/privacy-policy/pennywise',
        'PennyWise Privacy Policy | Aditya Tripathi',
        'Privacy policy for PennyWise, a private offline expense tracker.',
        `# PennyWise Privacy Policy

${privacyBody}
`,
    );
    pages.push(privacyPage);
    pages.push({ ...privacyPage, route: '/pennywise/privacy-policy' });

    let fileCount = 0;
    for (const pageInfo of pages) {
        for (const relative of outputPathsForRoute(pageInfo.route)) {
            const target = path.join(outDir, relative);
            await fs.mkdir(path.dirname(target), { recursive: true });
            await fs.writeFile(target, pageInfo.markdown, 'utf8');
            fileCount += 1;
        }
    }

    const caddyDir = path.join(rootDir, 'dist/caddy');
    await fs.mkdir(caddyDir, { recursive: true });
    await fs.writeFile(
        path.join(caddyDir, 'markdown-tokens.caddy'),
        buildCaddyTokenMap(pages),
        'utf8',
    );

    console.log(
        `markdown-negotiation: wrote ${pages.length} routes (${fileCount} files) + dist/caddy/markdown-tokens.caddy`,
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
