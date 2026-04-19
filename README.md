# aditya04tripathi

Personal site and portfolio for **Aditya Tripathi** — projects (including [PennyWise](https://play.google.com/store/apps/details?id=com.pennywise.app)), engineering notes, and contact. Built as a static Astro app with Svelte islands.

**Live:** [adityatripathi.dev](https://adityatripathi.dev)

## Stack

- [Astro](https://astro.build/) 5 (MDX, [View Transitions](https://docs.astro.build/en/guides/view-transitions/))
- [Svelte](https://svelte.dev/) 5 (`@astrojs/svelte`)
- [Tailwind CSS](https://tailwindcss.com/) 4 (`@tailwindcss/vite`)
- [Biome](https://biomejs.dev/) for lint/format
- [Lucide](https://lucide.dev/) icons (`lucide-svelte`)
- UI primitives: custom Svelte components (buttons, cards, etc.) with [class-variance-authority](https://cva.style/) and [tailwind-merge](https://github.com/dcastil/tailwind-merge)

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)

## Setup

```bash
git clone https://github.com/aditya04tripathi/aditya04tripathi.git
cd aditya04tripathi
pnpm install
```

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Dev server (default port 4321) |
| `pnpm build`   | Production build to `dist/` |
| `pnpm preview` | Serve `dist/` locally    |
| `pnpm lint`    | `biome lint`             |
| `pnpm format`  | `biome format`           |

## Project layout

- `src/pages/` — Astro routes (`*.astro`)
- `src/components/` — Svelte sections, layout, UI
- `src/content/` — MDX collections (e.g. engineering notes)
- `src/lib/` — Data (`constants.ts`), theme, command palette registry
- `src/styles/global.css` — Tailwind import, design tokens, global utilities

Content and copy for the portfolio (projects, bio links) live mainly in `src/lib/constants.ts`. Replace assets under `public/` as needed.

## Git hooks

[Husky](https://typicode.github.io/husky/) runs **`pnpm run build`** before each commit. [Commitlint](https://commitlint.js.org/) enforces [Conventional Commits](https://www.conventionalcommits.org/) on the commit message (`feat:`, `fix:`, `chore:`, etc.).

## License

MIT.
