import { useId } from 'react'
import { Palette } from 'lucide-react'
import { useTheme } from '@/core/theme/ThemeProvider'

interface ThemeToggleProps {
  label?: string
  compact?: boolean
}

export function ThemeToggle({ label = 'Theme', compact = false }: ThemeToggleProps) {
  const { theme, options, setTheme } = useTheme()
  const selectId = useId()

  return (
    <div className={compact ? 'flex items-center gap-2' : 'space-y-2'}>
      <label
        className={compact ? 'text-xs text-muted-foreground' : 'text-sm font-medium'}
        htmlFor={selectId}
      >
        {label}
      </label>
      <div className={compact ? '' : 'relative'}>
        <div className="flex items-center gap-2">
          {!compact && <Palette className="h-4 w-4 text-muted-foreground" />}
          <select
            id={selectId}
            value={theme}
            onChange={(event) => setTheme(event.target.value as typeof theme)}
            className={
              compact
                ? 'rounded-md border border-border bg-background px-2 py-1 text-xs'
                : 'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
            }
            aria-label={compact ? 'Theme' : undefined}
          >
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {!compact && (
          <p className="mt-2 text-xs text-muted-foreground">
            {options.find((option) => option.id === theme)?.description}
          </p>
        )}
      </div>
    </div>
  )
}
