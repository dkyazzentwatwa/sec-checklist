import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  applyFontMode,
  applyTextScale,
  applyTheme,
  getInitialFontMode,
  getInitialTextScale,
  getInitialTheme,
  FONT_MODE_OPTIONS,
  TEXT_SCALE_OPTIONS,
  THEME_OPTIONS,
  FONT_MODE_STORAGE_KEY,
  TEXT_SCALE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  type FontModeId,
  type TextScaleId,
  type ThemeId,
} from './theme'

type ThemeContextValue = {
  theme: ThemeId
  textScale: TextScaleId
  fontMode: FontModeId
  options: typeof THEME_OPTIONS
  textScaleOptions: typeof TEXT_SCALE_OPTIONS
  fontModeOptions: typeof FONT_MODE_OPTIONS
  setTheme: (theme: ThemeId) => void
  setTextScale: (scale: TextScaleId) => void
  setFontMode: (mode: FontModeId) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => getInitialTheme())
  const [textScale, setTextScaleState] = useState<TextScaleId>(() => getInitialTextScale())
  const [fontMode, setFontModeState] = useState<FontModeId>(() => getInitialFontMode())

  useEffect(() => {
    applyTheme(theme)
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    }
  }, [theme])

  useEffect(() => {
    applyTextScale(textScale)
    if (typeof window !== 'undefined') {
      localStorage.setItem(TEXT_SCALE_STORAGE_KEY, textScale)
    }
  }, [textScale])

  useEffect(() => {
    applyFontMode(fontMode)
    if (typeof window !== 'undefined') {
      localStorage.setItem(FONT_MODE_STORAGE_KEY, fontMode)
    }
  }, [fontMode])

  const value = useMemo(
    () => ({
      theme,
      textScale,
      fontMode,
      options: THEME_OPTIONS,
      textScaleOptions: TEXT_SCALE_OPTIONS,
      fontModeOptions: FONT_MODE_OPTIONS,
      setTheme: setThemeState,
      setTextScale: setTextScaleState,
      setFontMode: setFontModeState,
    }),
    [theme, textScale, fontMode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
