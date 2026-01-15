import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    title: 'Getting started',
    body: [
      'Browse modules from the home page or use search to jump to a specific topic.',
      'Install the app as a PWA for offline access and faster launch times.',
      'Use the Settings page to export a local backup of your data.'
    ],
  },
  {
    title: 'Troubleshooting',
    body: [
      'If content is not loading, refresh the page while online so the PWA cache updates.',
      'If AI tools are unavailable, ensure your browser supports WebGPU and download a model again.',
      'If progress disappears, confirm your browser has not cleared site storage.'
    ],
  },
  {
    title: 'Privacy',
    body: [
      'Rights Shield stores data locally and does not transmit data to external servers.',
      'AI conversations and downloads stay on your device. You control exports and deletion.',
      'We recommend using a device passcode and encrypted backups for safety.'
    ],
  },
  {
    title: 'Contributing',
    body: [
      'Join the community by contributing translations, content, or code improvements.',
      'Report issues or suggest enhancements via the project repository.',
      'For sensitive reports, contact the maintainers through private channels.'
    ],
  },
]

export function Help() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Help & FAQ</h1>
        <p className="text-muted-foreground mt-2">
          Answers to common questions and tips for using Rights Shield.
        </p>
      </header>

      <section className="rounded-lg border border-border bg-muted/20 p-6">
        <h2 className="text-lg font-semibold">Quick links</h2>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link to="/settings" className="text-primary hover:underline">Settings & Data Export</Link>
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          <Link to="/about" className="text-primary hover:underline">About Rights Shield</Link>
        </div>
      </section>

      {SECTIONS.map((section) => (
        <section key={section.title} className="border border-border rounded-lg p-6 bg-background">
          <h2 className="text-lg font-semibold">{section.title}</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
            {section.body.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
