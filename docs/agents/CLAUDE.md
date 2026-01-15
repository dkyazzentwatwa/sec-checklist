# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rights Shield is a privacy-first, offline-capable PWA (Progressive Web App) designed for activists. It provides immigration rights information, digital security checklists, activism tools, AI assistance, and AI surveillance defense resources. The app is built with React 19, Vite, TypeScript, and Tailwind CSS, with a strong emphasis on offline functionality and privacy.

## Development Commands

```bash
# Install dependencies
npm install

# Development server (starts at http://localhost:5173)
npm run dev

# Build for production (includes TypeScript compilation)
npm run build

# Preview production build
npm run preview

# Lint (ESLint with TypeScript support)
npm run lint

# Run tests (Vitest)
npm run test
```

## Architecture

### Core Structure

The codebase follows a modular architecture with clear separation of concerns:

- **`src/core/`** - Core infrastructure and configuration
  - `config/` - App configuration and i18n setup
  - `db/` - IndexedDB schema using Dexie (see `schema.ts` for all data models)
  - `router/` - React Router configuration with lazy-loaded routes
  - `pwa/` - Service worker configuration (via vite-plugin-pwa)

- **`src/features/`** - Feature modules (domain-driven design)
  - Each feature is self-contained with its own components, data, hooks, stores, and types
  - Features: `immigration/`, `security/`, `activism/`, `ai/`, `ai-defense/`, `common/`
  - All content lives in `data/` subdirectories as JSON files

- **`src/components/`** - Shared UI components
  - `layout/` - App shell (Header, Footer, Layout, MobileNav, OfflineIndicator)
  - Uses shadcn/ui component library (imported from external package, not in repo)
  - Path alias `@/` maps to `src/`

- **`src/pages/`** - Route-level pages that compose features
  - Pages are lazily loaded in `src/core/router/routes.tsx`

### Data Flow & Storage

1. **Content Data**: JSON files in `src/features/*/data/` contain static content (checklists, scenarios, rights information)
2. **User Data**: All user data (progress, conversations, settings) is stored locally in IndexedDB via Dexie
3. **State Management**:
   - Zustand for global state (AI store at `src/features/ai/stores/aiStore.ts`)
   - React Query for async operations
   - Dexie React Hooks for IndexedDB queries

### Offline-First Design

- The app works 100% offline after initial load
- Service worker (Workbox) caches all assets and routes
- IndexedDB stores user data locally (never sent to any server)
- AI models run locally in the browser using WebLLM (no cloud API calls)
- All content is bundled or cached, no runtime fetches required

### AI Architecture

The AI features use a Web Worker architecture to keep the UI responsive:

1. **Worker**: `src/features/ai/workers/ai.worker.ts` runs WebLLM inference in a separate thread
2. **Engine**: `src/features/ai/services/webllm/engine.ts` provides typed interface to the worker
3. **Store**: `src/features/ai/stores/aiStore.ts` manages model state and conversations (Zustand with persistence)
4. **Models**: Uses @mlc-ai/web-llm for local LLM inference (WebGPU required)
5. **Search**: Transformers.js provides embeddings for semantic search (`src/features/ai/services/transformers/`)

Key AI concepts:
- Models are downloaded on-demand to IndexedDB
- All inference happens locally in the browser (privacy-first)
- Worker communicates via typed messages (see `src/features/ai/workers/types.ts`)
- Multiple assistant types defined in `src/features/ai/services/webllm/prompts.ts`

## Technology Stack

- **Framework**: Vite 6 + React 19 + TypeScript 5
- **Routing**: React Router v7 with lazy loading
- **Styling**: Tailwind CSS + shadcn/ui components
- **State**: Zustand (global), React Query (async)
- **Database**: Dexie (IndexedDB wrapper)
- **i18n**: i18next + react-i18next (6 languages: en, es, fr, ar, zh, vi)
- **PWA**: vite-plugin-pwa with Workbox
- **AI**: @mlc-ai/web-llm (local LLM) + @xenova/transformers (embeddings)

## Development Guidelines

### Code Organization

- Use the `@/` path alias instead of relative imports (configured in vite.config.ts and tsconfig.json)
- Feature code stays within its feature directory - avoid cross-feature imports
- Shared utilities go in `src/utils/`, shared components in `src/components/`
- All data models are defined in `src/core/db/schema.ts`

### Internationalization

- All user-facing strings must be internationalized using `react-i18next`
- Translation keys are in `src/assets/locales/{lang}/translation.json`
- Content JSON files have multilingual fields (e.g., `title: { en: "...", es: "..." }`)
- The test suite verifies translation key parity across all languages

### TypeScript

- Strict mode enabled with all linting options
- No unused locals, parameters, or unchecked side effect imports
- Use explicit types for function returns and component props
- Import types from `src/core/db/schema.ts` for data models

### Testing

- Tests use Vitest (configured in `vitest.config.ts`)
- Test files go in `tests/` directory
- Current tests focus on data integrity (`tests/data-integrity.test.ts`)
- Tests verify: bilingual content, translation key parity, data structure validity
- Run tests before committing changes

### PWA & Performance

- Build is optimized with code splitting (see `vite.config.ts` manualChunks)
- AI libraries are loaded on-demand to reduce initial bundle size
- Service worker caches up to 10MB files (AI libraries are large)
- Console and debugger statements are stripped in production builds

### AI Development

- WebGPU is required for AI features to work
- Models are large (1-3GB) and download on first use
- Always use the Web Worker for inference to avoid blocking the UI
- The AI store persists conversations and settings to localStorage
- Check `src/features/ai/services/webllm/workerEngine.ts` for the main worker interface

## Common Patterns

### Adding a New Route

1. Create page component in `src/pages/`
2. Add lazy import in `src/core/router/routes.tsx`
3. Add route configuration in the `Routes` component
4. Update navigation in `src/components/layout/Header.tsx` and `MobileNav.tsx`

### Adding a New Checklist

1. Create JSON file in `src/features/security/data/checklists/`
2. Follow the `ChecklistContent` type from `src/core/db/schema.ts`
3. Ensure all text fields have `en` and `es` translations (minimum)
4. Add import to `tests/data-integrity.test.ts` and include in test array

### Working with IndexedDB

- Import `db` from `src/core/db/schema.ts`
- Use Dexie React Hooks for queries: `useLiveQuery(() => db.table.toArray())`
- All user data stays local - never send to external servers
- See schema types in `src/core/db/schema.ts` for available tables and fields

### State Management Patterns

- Use Zustand for global state that needs persistence or cross-component access
- Use React Query for async operations (data fetching, mutations)
- Use React useState for local component state
- The AI store is the primary example of Zustand usage with persistence

## Privacy & Security

- NO user accounts, tracking, or analytics
- NO external API calls after initial load (except optional model downloads)
- All data stored locally in IndexedDB
- Service worker enables full offline functionality
- AI inference happens entirely in the browser (WebGPU)
- Open source (AGPLv3 license)

## Build & Deployment

- Production build uses Terser minification with console/debugger removal
- Bundle size warnings are set to 3000KB (AI libraries are large)
- Optimized dependencies exclude AI libraries from pre-bundling
- The build includes TypeScript compilation check before bundling
- CI/CD runs lint and tests on push/PR via GitHub Actions (`.github/workflows/ci.yml`)
