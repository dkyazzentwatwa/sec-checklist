export type ThemeId =
  | 'light'
  | 'dark'
  | 'high-contrast'
  | 'high-contrast-dark'
  | 'sepia'

export type TextScaleId = 'sm' | 'md' | 'lg' | 'xl'

export type FontModeId = 'default' | 'dyslexia'

export type ThemeOption = {
  id: ThemeId
  label: string
  description: string
}

export const THEME_STORAGE_KEY = 'rights-shield:theme'
export const TEXT_SCALE_STORAGE_KEY = 'rights-shield:text-scale'
export const FONT_MODE_STORAGE_KEY = 'rights-shield:font-mode'

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'light',
    label: 'Light',
    description: 'Clean, bright theme with standard contrast.',
  },
  {
    id: 'dark',
    label: 'Dark',
    description: 'Low-glare dark mode for night use.',
  },
  {
    id: 'high-contrast',
    label: 'High Contrast',
    description: 'Maximum contrast for easier reading.',
  },
  {
    id: 'high-contrast-dark',
    label: 'High Contrast Dark',
    description: 'High contrast with dark background.',
  },
  {
    id: 'sepia',
    label: 'Sepia',
    description: 'Warm tones that reduce eye strain.',
  },
]

export const TEXT_SCALE_OPTIONS: { id: TextScaleId; label: string }[] = [
  { id: 'sm', label: 'Small' },
  { id: 'md', label: 'Default' },
  { id: 'lg', label: 'Large' },
  { id: 'xl', label: 'Extra large' },
]

export const FONT_MODE_OPTIONS: { id: FontModeId; label: string; description: string }[] = [
  {
    id: 'default',
    label: 'Standard',
    description: 'System font stack for familiar reading.',
  },
  {
    id: 'dyslexia',
    label: 'Dyslexia friendly',
    description: 'Prefers accessible fonts with added spacing.',
  },
]

export function getInitialTheme(): ThemeId {
  if (typeof window === 'undefined') return 'light'

  const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null
  if (stored && THEME_OPTIONS.some((option) => option.id === stored)) {
    return stored
  }

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export function getInitialTextScale(): TextScaleId {
  if (typeof window === 'undefined') return 'md'

  const stored = localStorage.getItem(TEXT_SCALE_STORAGE_KEY) as TextScaleId | null
  if (stored && TEXT_SCALE_OPTIONS.some((option) => option.id === stored)) {
    return stored
  }

  return 'md'
}

export function getInitialFontMode(): FontModeId {
  if (typeof window === 'undefined') return 'default'

  const stored = localStorage.getItem(FONT_MODE_STORAGE_KEY) as FontModeId | null
  if (stored && FONT_MODE_OPTIONS.some((option) => option.id === stored)) {
    return stored
  }

  return 'default'
}

export function applyTheme(theme: ThemeId) {
  const root = document.documentElement

  root.dataset.theme = theme
  root.classList.toggle('dark', theme === 'dark' || theme === 'high-contrast-dark')
  root.style.colorScheme = theme === 'dark' || theme === 'high-contrast-dark' ? 'dark' : 'light'
}

export function applyTextScale(scale: TextScaleId) {
  document.documentElement.dataset.textScale = scale
}

export function applyFontMode(mode: FontModeId) {
  document.documentElement.dataset.font = mode
}
