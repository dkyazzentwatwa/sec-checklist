import { TextCursorInput, Type } from 'lucide-react'
import { useTheme } from '@/core/theme/ThemeProvider'

export function ReadingPreferences() {
  const {
    textScale,
    fontMode,
    textScaleOptions,
    fontModeOptions,
    setTextScale,
    setFontMode,
  } = useTheme()

  return (
    <section className="border border-border rounded-lg p-6 bg-background">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Type className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Reading preferences</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Adjust text size and font style for easier reading.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium flex items-center gap-2">
            <TextCursorInput className="h-4 w-4 text-muted-foreground" />
            Text size
          </span>
          <select
            value={textScale}
            onChange={(event) => setTextScale(event.target.value as typeof textScale)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {textScaleOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Font style</span>
          <select
            value={fontMode}
            onChange={(event) => setFontMode(event.target.value as typeof fontMode)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {fontModeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">
            {fontModeOptions.find((option) => option.id === fontMode)?.description}
          </p>
        </label>
      </div>
    </section>
  )
}
