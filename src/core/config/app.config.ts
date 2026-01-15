export const APP_CONFIG = {
  name: 'Rights Shield',
  version: '0.1.0',
  description: 'Privacy-first activist resource platform',

  // Feature flags
  features: {
    ai: {
      enabled: true,
      defaultModel: 'Llama-3.2-3B-Instruct-q4f16_1',
      fallbackModel: 'Phi-3.5-mini-instruct-q4f16_1',
    },
    offline: {
      enabled: true,
      maxCacheAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
    analytics: {
      enabled: false, // Privacy-first: no analytics
    },
  },

  // Supported languages
  languages: {
    en: { name: 'English', nativeName: 'English', rtl: false },
    es: { name: 'Spanish', nativeName: 'Español', rtl: false },
    fr: { name: 'French', nativeName: 'Français', rtl: false },
    ar: { name: 'Arabic', nativeName: 'العربية', rtl: true },
    zh: { name: 'Chinese', nativeName: '中文', rtl: false },
    vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt', rtl: false },
  },

  // External links
  links: {
    github: 'https://github.com/dkyazzentwatwa/right-guard',
    donate: null, // TBD
    contact: null, // TBD
  },
} as const
