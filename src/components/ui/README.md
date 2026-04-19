# components/ui/

Reusable UI primitives and atoms used across the app.

## Overview

Contains small, focused components (buttons, badges, cards, avatars) intended to be framework-agnostic and easy to compose.

## Guidelines

- Prefer minimal, strongly-typed props.
- Keep components stateless where possible and accept render props or children for customization.
- Expose small hooks or utility props rather than forcing prop drilling.

## Testing

- Unit test each primitive's behavior and accessibility (keyboard interactions, ARIA attributes).

## When to add a new component

- If the UI pattern will be reused by 2+ pages/features, create a new component here.
- Keep implementation small; delegate complex logic to `lib/` utilities.