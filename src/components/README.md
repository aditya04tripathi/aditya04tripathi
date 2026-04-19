# components/

Project-scoped documentation for UI components used across the portfolio.

## Overview

This folder contains presentational and composite React components that make up the site UI (headers, sections, providers, layout pieces).

## Tech Stack

- React 19 (App Router)
- TypeScript (no `any`)
- Tailwind CSS
- shadcn/ui primitives

## Architecture

- Keep components small and composable.
- Prefer Server Components; mark as Client Components (`"use client"`) only when interactivity or browser APIs are required.
- Split between layout-level components (in `layout/`), feature sections (in `sections/`) and generic primitives (in `ui/`).

## Folder Structure

- `layout/` — wrappers and site layout components (header, navbar)
- `sections/` — feature sections used on pages (hero, about, projects)
- `ui/` — small, reusable primitives (button, card, avatar)

## Setup & Usage

Refer to the root `README.md` for installation and development commands. Import components directly from `components/`.

## Testing

- Unit test components with `@testing-library/react` and `vitest`.
- Test business logic outside components when possible.

## Contributing

- Add TSDoc to exported components and props.
- Follow project conventions (Tailwind utility classes, no inline styles).