# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/` with feature-first modules. Core infrastructure is in `src/core/` (routing, PWA, IndexedDB). Feature content and UI live under `src/features/` (e.g., `security`, `immigration`, `ai`). Route-level screens are in `src/pages/`, shared UI in `src/components/`, and translations/static assets in `src/assets/`. Static public files are in `public/`, and build output goes to `dist/`.

## Build, Test, and Development Commands
- `npm run dev` starts the Vite dev server at `http://localhost:5173/`.
- `npm run build` runs TypeScript checks and generates the production bundle.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint for TypeScript/React code.
- `npm run test` runs the Vitest suite (if/when tests exist). .

## Coding Style & Naming Conventions
Use TypeScript + React function components. Formatting matches current code: 2-space indentation, single quotes, and no semicolons. Component files use `PascalCase.tsx`, hooks use `useThing.ts`, and JSON content files use kebab-case filenames (e.g., `secondary-phone.json`) with matching `id` values. Keep Tailwind classes inline and prefer small, composable components.

## Testing Guidelines
Tests use Vitest. Follow `*.test.ts(x)` or `__tests__/` conventions and colocate tests near the source when possible. There is no explicit coverage requirement yet, but new logic should include focused tests when practical.

## Commit & Pull Request Guidelines
This workspace does not include `.git`, so commit conventions cannot be inferred. If initializing history, use concise, imperative messages (Conventional Commits are preferred, e.g., `feat: add emergency checklist`). PRs should describe the change, link related issues, and include screenshots for UI updates. Note any offline/privacy implications in the description.

## Security & Privacy Notes
The app is offline-first and privacy-focused. Avoid adding analytics, external requests, or third-party scripts unless explicitly approved, and document any new data storage paths.
