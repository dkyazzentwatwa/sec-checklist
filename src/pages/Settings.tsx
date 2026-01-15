import { DataExport } from '@/features/settings/components/DataExport'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ReadingPreferences } from '@/components/ReadingPreferences'

export function Settings() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage local data and privacy-focused preferences.
        </p>
      </header>

      <DataExport />

      <section className="border border-border rounded-lg p-6 bg-background">
        <h2 className="text-lg font-semibold">Theme</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose a visual theme designed for readability and accessibility.
        </p>
        <div className="mt-4 max-w-sm">
          <ThemeToggle />
        </div>
      </section>

      <ReadingPreferences />

      <section className="border border-border rounded-lg p-6 bg-muted/30">
        <h2 className="text-lg font-semibold">Privacy reminders</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
          <li>Your data is stored locally on your device and never uploaded.</li>
          <li>Clearing browser storage will remove saved progress and conversations.</li>
          <li>Export files are unencrypted; store them securely.</li>
        </ul>
      </section>
    </div>
  )
}
