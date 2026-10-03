<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Personal portfolio website — fresh scaffold, single route.

## Stack

- **Next.js 16.3.6** (App Router, RSC by default)
- **React 19.2.8**
- **TypeScript 5** (strict mode)
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **shadcn/ui v4** (base-nova style, `@base-ui/react` primitives, NOT Radix UI)
- **pnpm 10** package manager
- **Prettier** (no semis, double quotes, tailwind plugin)
- **ESLint 9** flat config (core-web-vitals + typescript)

## Conventions

- UI primitives in `components/ui/` use `@base-ui/react` + `cva` + `cn` package
- App-level components in `components/`
- Hooks in `hooks/`
- Utilities in `lib/`
- Path alias: `@/*` → project root
- Design tokens in `app/globals.css` (oklch color space, neutral palette)
- Theme: `next-themes` class strategy, system default, "d" hotkey toggle
- Fonts: Geist (sans) + Geist Mono via `next/font/google`

## Validation

```bash
pnpm typecheck   # tsc --noEmit
pnpm lint        # eslint (flat config)
pnpm format      # prettier --write
pnpm build       # production build
```

## Intelligence

Full repository intelligence is in `.agents/MEMORY.md`.
