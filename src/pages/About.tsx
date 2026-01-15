import { Shield, HeartHandshake, Lock, WifiOff, Cpu, Globe, Scale, Sparkles } from 'lucide-react'

export function About() {
  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="absolute -top-16 -left-24 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute -top-10 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background via-background to-muted/60 p-8 md:p-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Privacy-first. Community-powered.
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              About Rights Shield
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              A privacy-first activist resource platform designed to equip communities with clear,
              actionable guidance on rights, digital security, and organizing.
            </p>
          </div>
          <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Shield className="h-12 w-12" />
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <HeartHandshake className="h-6 w-6 text-rose-500" />
            <h2 className="text-xl font-semibold">Our mission</h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Rights Shield centers harm reduction: start where you are, do what you can. The platform
            is built for organizers, advocates, and community members who need reliable information
            without surveillance or data extraction.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Focus</p>
              <p className="mt-2 text-sm font-semibold">Rights, safety, and resilience</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Promise</p>
              <p className="mt-2 text-sm font-semibold">No tracking. No data sales. Ever.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted/30 p-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-amber-500" />
            <h2 className="text-xl font-semibold">What makes it different</h2>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Scale className="mt-0.5 h-4 w-4 text-primary" />
              Built with rights-first content authored for real-world scenarios.
            </li>
            <li className="flex items-start gap-2">
              <WifiOff className="mt-0.5 h-4 w-4 text-primary" />
              Works offline after install with a progressive web app experience.
            </li>
            <li className="flex items-start gap-2">
              <Cpu className="mt-0.5 h-4 w-4 text-primary" />
              Local AI assistance that never leaves your device.
            </li>
            <li className="flex items-start gap-2">
              <Globe className="mt-0.5 h-4 w-4 text-primary" />
              Designed for multilingual communities with inclusive content.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <div className="rounded-2xl border border-border bg-background p-6 md:p-8">
          <div className="flex items-center gap-3">
            <Lock className="h-6 w-6 text-emerald-500" />
            <h2 className="text-xl font-semibold">Core principles</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Privacy first',
                description: 'No tracking, no analytics, and no data collection by design.',
              },
              {
                title: 'Offline capable',
                description: 'Critical guidance stays accessible even without internet access.',
              },
              {
                title: 'Open source',
                description: 'Community-reviewed, transparent, and auditable for trust.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-muted/40 p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-muted/30 p-6">
          <h2 className="text-xl font-semibold">How it works</h2>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                1
              </span>
              Install the PWA so your device caches essential resources for offline use.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                2
              </span>
              Track progress locally with checklists, notes, and saved resources.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                3
              </span>
              Download a local export whenever you want to back up or transfer data.
            </li>
          </ol>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-xl font-semibold">License</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Rights Shield is licensed under AGPLv3. Built by activists, for activists. If you
            improve the platform, share your changes to keep the community strong.
          </p>
          <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            Transparency is a feature: the code and content stay open for audit and collaboration.
          </div>
        </div>
      </section>
    </div>
  )
}
