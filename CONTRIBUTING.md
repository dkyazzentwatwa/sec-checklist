# Contributing to Rights Shield

Thanks for helping improve Rights Shield. This project is privacy-first and offline-ready, so changes should keep data local and avoid third-party tracking.

## Getting Started
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Run lint: `npm run lint`
- Run tests: `npm run test`

## What to Contribute
- Content: checklists, guides, translations.
- UI: accessibility, clarity, and mobile-friendly layouts.
- Performance: bundle size, lazy loading, caching.

## Localization
- Translation files live in `src/assets/locales/<lang>/translation.json`.
- Keep keys aligned with `en/translation.json` (tests will fail if keys are missing).
- Add the locale to `src/core/config/i18n.config.ts` and update README when you add a new language.

## Code Style
- TypeScript + React function components.
- 2-space indentation, single quotes, no semicolons.
- Use Tailwind utility classes for styling.

## Pull Requests
- Keep PRs focused and describe the user impact.
- Link related issues and include screenshots for UI changes.
- Call out any changes that affect offline/privacy behavior.

## Content Accuracy
Rights content should be verified with trusted sources. When in doubt, add a note in the PR describing verification steps or open questions.
