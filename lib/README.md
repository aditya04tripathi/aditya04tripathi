# lib/

Shared utilities, constants and types used by the application.

## Overview

This folder centralizes non-UI logic that is used across features: constants (profile and project data), small helpers, and pure utility functions.

## Contents

- `constants.ts` — canonical project and profile data used for rendering pages and meta tags.
- `utils.ts` — small helpers (className merging, formatters) intended to be side-effect free.

## Guidelines

- Export well-typed public APIs (no `any`).
- Add TSDoc to exported types and functions.
- Keep side effects out of `lib/` when possible; prefer explicit inputs and outputs.

## Testing

- Unit test helpers and pure functions with `vitest` or similar.
- When constants are consumed by components, write integration tests for rendering behavior if needed.

## Contributing

- Update `constants.ts` to add new data. Add or update TSDoc to describe the shape and usage.
- Keep `lib/` small and focused — complex domain logic belongs in a feature folder.