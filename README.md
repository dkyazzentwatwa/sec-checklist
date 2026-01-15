# Rights Shield

Privacy-first activist resource platform for immigration rights, digital security, and community defense.

## 🌟 Features

- **Immigration Rights**: Know Your Rights scenarios, red card generator, hotlines
- **Digital Security**: Checklists with progress tracking and smart adaptive advisor
- **Activism Tools**: Protest rights, organizing toolkit, action planner
- **AI Assistant**: Local WebLLM chat, document generator, semantic search
- **AI Defense**: Surveillance threat overviews, countermeasures, opt-out guides

## 🔒 Privacy-First Design

- ✅ No user accounts or tracking
- ✅ No analytics or data collection
- ✅ Works 100% offline after initial load
- ✅ AI runs locally in your browser (no cloud)
- ✅ All data stays on your device
- ✅ Open source (AGPLv3)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The app will be available at `http://localhost:5173/`

## 🧪 Testing

- Lint: `npm run lint`
- Tests: `npm run test`
- Coverage: `npm run test -- --coverage`

GitHub Actions runs lint + tests on every push/PR via `.github/workflows/ci.yml`.
See [`TESTING.md`](TESTING.md) for testing guidance.

## 🚢 Deployment

Vercel is the recommended deployment target. Follow [`DEPLOYMENT.md`](DEPLOYMENT.md) for setup and verification steps.

## 📁 Project Structure

```
src/
├── core/               # Core infrastructure
│   ├── config/         # App configuration, i18n
│   ├── db/             # IndexedDB schema (Dexie)
│   ├── pwa/            # Service worker logic
│   └── router/         # React Router configuration
│
├── features/           # Feature modules
│   ├── immigration/    # Immigration rights content
│   ├── security/       # Digital security checklists
│   ├── activism/       # Activism tools
│   ├── ai/             # AI assistant
│   ├── ai-defense/     # AI surveillance defense
│   └── common/         # Shared feature components
│
├── components/         # Shared UI components
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Header, footer, navigation
│   └── primitives/     # Reusable UI elements
│
├── pages/              # Route pages
├── hooks/              # Global React hooks
├── stores/             # Zustand state stores
├── utils/              # Utility functions
└── assets/             # Static assets & translations
```

## 🛠 Technology Stack

- **Framework**: Vite + React 19 + TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand + React Query
- **Database**: Dexie (IndexedDB)
- **i18n**: i18next + react-i18next
- **PWA**: vite-plugin-pwa (Workbox)
- **AI** (Phase 4): WebLLM + Transformers.js

## 📖 Implementation Roadmap

### ✅ Phase 1: Foundation (COMPLETED)
- [x] Vite + React + TypeScript setup
- [x] PWA configuration
- [x] Tailwind CSS + shadcn/ui
- [x] React Router with core routes
- [x] i18n (English/Spanish)
- [x] IndexedDB schema
- [x] App shell (header, nav, footer)
- [x] Offline detection
- [x] Basic pages for all routes

### ✅ Phase 2: Digital Security Module (COMPLETED)
- [x] Write original security checklists
- [x] Checklist viewer UI
- [x] Progress tracking
- [x] Print-friendly views

### ✅ Phase 3: Immigration Rights Module (COMPLETED)
- [x] Know Your Rights scenarios
- [x] Red card generator
- [x] Emergency hotlines database
- [x] Multi-language content
- [x] Preparedness planner

### ✅ Phase 4: AI Infrastructure (COMPLETED)
- [x] WebLLM integration
- [x] Model downloader UI
- [x] Web Worker setup
- [x] Basic chatbot interface

### 🔄 Phase 5-8: Additional Features & Polish
- [x] Document generator
- [x] Semantic search
- [x] Activism and AI Defense modules
- [ ] Performance, accessibility, documentation

## 🌐 Languages

- English (primary)
- Spanish (es)
- French (fr)
- Arabic (ar)
- Chinese (zh)
- Vietnamese (vi)

## 🤝 Contributing

Rights Shield is open source and welcomes contributions!

- **Content**: Help write security checklists, immigration guides
- **Translations**: Add support for more languages
- **Code**: Fix bugs, add features, improve accessibility
- **Design**: UI/UX improvements

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community expectations.

## 🧭 Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for module structure, data flow, and offline design notes.

## 📄 License

AGPLv3 - See [LICENSE](LICENSE) for details

Built with ❤️ by activists, for activists.

## ⚖️ Legal Disclaimer

This platform provides educational information about your rights, not legal advice.
For specific situations, always consult with a qualified attorney.

## 🔗 Links

- [GitHub Repository](https://github.com/dkyazzentwatwa/right-guard)
- [Issue Tracker](https://github.com/dkyazzentwatwa/right-guard/issues)
- [Deployment](https://rights-shield.app) (TBD)

---

**Version**: 0.1.0 (Phase 1 Foundation)
**Status**: Production readiness in progress (Phase 4-7)
**License**: AGPLv3
