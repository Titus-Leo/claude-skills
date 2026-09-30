---
name: awesome-design
description: Use when the user wants a UI styled after a known brand's design system (e.g. "build it like Apple/Stripe/Airbnb"), asks for a DESIGN.md, or wants design-system inspiration. Fetches ready-made DESIGN.md files from VoltAgent's awesome-design-md collection.
---

# awesome-design

Brand design systems as `DESIGN.md` files (colors, typography, spacing, components, do/don't), from https://github.com/VoltAgent/awesome-design-md.

## Workflow

1. List available brands:
   `gh api repos/VoltAgent/awesome-design-md/contents/design-md --jq '.[].name'`
2. Pick the brand(s) matching the user's request (ask if unclear).
3. Fetch the file:
   `gh api repos/VoltAgent/awesome-design-md/contents/design-md/<brand>/DESIGN.md -H "Accept: application/vnd.github.raw"`
4. Use it as the style reference for the UI. Adapt, don't copy brand assets/logos/wording.
5. Only write a `DESIGN.md` into the current project if the user asks for it.

## More sources

- https://github.com/VoltAgent/awesome-claude-design — 68 design-system inspirations in DESIGN.md format (see its README for the index).
- https://github.com/VoltAgent/official-design-md — DESIGN.md files published by the companies themselves.

## Rules

- Respect the current project's own design direction when it has one; use the brand file only when the user asked for it.
- Don't reuse trademarks, logos or proprietary imagery.
