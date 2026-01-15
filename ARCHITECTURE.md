# Architecture Overview

Rights Shield is an offline-first React + Vite application. Core infrastructure lives in `src/core/`, feature modules in `src/features/`, and route screens in `src/pages/`.

## Key Layers
- **Core** (`src/core/`): routing, PWA service worker, IndexedDB schema (Dexie), and i18n config.
- **Features** (`src/features/`): domain modules (security, immigration, activism, AI, AI defense).
- **Pages** (`src/pages/`): route-level composition and layout.
- **UI** (`src/components/`): shared primitives, layout, and shadcn/ui components.

## Offline & Data Storage
- Content JSON files live under `src/features/*/data/`.
- User progress is stored locally in IndexedDB via Dexie (`src/core/db/schema.ts`).
- The app avoids network requests after initial load, except for optional model downloads.

## AI & Search
- WebLLM runs locally in a Web Worker (`src/features/ai/workers/ai.worker.ts`).
- Semantic search uses Transformers.js embeddings and IndexedDB caching (`src/features/ai/services/transformers/`).

## Routing
Routes are lazily loaded in `src/core/router/routes.tsx` to keep bundles small. Layout and navigation live in `src/components/layout/`.
