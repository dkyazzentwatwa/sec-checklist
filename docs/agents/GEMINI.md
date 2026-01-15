# Rights Shield - Context & Guidelines

## Project Overview
Rights Shield is a **privacy-first, offline-first Progressive Web App (PWA)** designed to provide resources for immigration rights, digital security, and activist safety. It emphasizes local data storage and local AI processing to protect user privacy.

**Core Principles:**
- **Privacy-First:** No analytics, no tracking, no user accounts.
- **Offline-First:** Fully functional without internet after initial load.
- **Local AI:** Uses WebLLM and Transformers.js to run AI models entirely in the browser.

## Tech Stack
- **Framework:** Vite + React 19 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** Zustand + React Query
- **Routing:** React Router v7
- **Database:** Dexie (IndexedDB)
- **AI:** WebLLM (local LLM), Transformers.js (local embeddings/search)
- **i18n:** i18next + react-i18next

## Project Structure
The project follows a **feature-based architecture**:

```
src/
├── core/               # Infrastructure (config, db, pwa, router)
├── features/           # Domain modules
│   ├── activism/       # Organizing tools
│   ├── ai/             # AI assistant implementation
│   ├── ai-defense/     # Surveillance defense
│   ├── immigration/    # Rights scenarios & red cards
│   ├── security/       # Security checklists
│   └── common/         # Shared feature components
├── components/         # Shared UI (layout, primitives, ui)
├── pages/              # Route-level pages
├── hooks/              # Global hooks
├── stores/             # Global stores
└── assets/             # Static assets & translations
```

## Key Files
- `src/main.tsx`: Entry point.
- `src/App.tsx`: Main app component.
- `src/core/router/routes.tsx`: Route definitions (lazy loaded).
- `src/core/config/app.config.ts`: Application configuration (feature flags, etc.).
- `src/core/db/schema.ts`: IndexedDB schema definition.
- `vite.config.ts`: Vite build configuration.

## Building and Running

### Prerequisites
- Node.js 18+

### Commands
- **Start Dev Server:** `npm run dev` (Runs on `http://localhost:5173/`)
- **Build for Production:** `npm run build`
- **Preview Production Build:** `npm run preview`
- **Run Tests:** `npm run test` (Vitest)
- **Lint Code:** `npm run lint`

## Development Conventions

### Code Style
- **Formatting:** 2-space indentation, single quotes, no semicolons (Prettier/ESLint rules apply).
- **Components:** Functional components with TypeScript interfaces.
- **Naming:** PascalCase for components (`MyComponent.tsx`), camelCase for hooks/functions (`useHook.ts`).
- **Styling:** Use Tailwind utility classes; avoid custom CSS files where possible.

### Architecture & Patterns
- **Features:** Keep feature-specific logic within `src/features/<feature-name>`.
- **State:** Use Zustand for global UI state, React Query for async data (even if local).
- **Localization:** All text must be internationalized using `t()` from `useTranslation`. Keys in `src/assets/locales/`.
- **Offline:** Ensure all new features work without network. Use `useOffline` hook or check `navigator.onLine` if needed, but prefer optimistic UI that syncs/caches locally.

### Privacy Guidelines
- **No External Calls:** Avoid adding third-party APIs or scripts.
- **Local Storage:** Use Dexie (IndexedDB) for structured data.
- **Secrets:** Never commit API keys or sensitive data.
