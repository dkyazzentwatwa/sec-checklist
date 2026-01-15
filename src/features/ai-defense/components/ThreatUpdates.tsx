import { useTranslation } from 'react-i18next'
import threatUpdatesData from '../data/threat-updates.json'
import type { ThreatUpdatesData } from '../types'

const data = threatUpdatesData as ThreatUpdatesData

export function ThreatUpdates() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'es' ? 'es' : 'en'

  return (
    <section id="updates" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{data.title[lang] || data.title.en}</h2>
        <p className="text-muted-foreground">{data.intro[lang] || data.intro.en}</p>
      </div>

      <div className="space-y-3">
        {data.updates.map((update) => (
          <div key={update.id} className="border border-border rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="font-semibold">{update.title[lang] || update.title.en}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {update.summary[lang] || update.summary.en}
                </p>
              </div>
              <a
                href={update.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary"
              >
                {update.source}
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{update.date}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
