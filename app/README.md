# app/

Documentation for the Next.js App Router application folder.

## Overview

Contains routes, layouts, server and client components for the main application.

## Architecture

- Prefer Server Components for routes and heavy data fetching.
- Use Client Components only for interactivity (hooks, browser APIs).
- Place shared layouts under `app/layout.tsx` and route-specific layouts next to route folders.

## Folder Structure

- `app/page.tsx` — root landing page
- `app/layout.tsx` — root layout with global providers
- `app/projects/[slug]/` — dynamic project routes
- `app/api/` — server actions and API endpoints

## Best Practices

- Keep server and client boundaries explicit.
- Use `use server` / `use client` directives where appropriate.
- Co-locate data fetching logic with the route that needs it.

## Testing

- Unit test pages and components as appropriate.
- Use integration tests to validate end-to-end route rendering and server actions.

## Contributing

- Add route-specific README sections only when complex behaviors or integrations are introduced (e.g., authentication, file uploads).