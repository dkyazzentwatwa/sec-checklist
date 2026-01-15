import { useTranslation } from 'react-i18next'
import threatsData from '../data/ai-threats.json'
import type { ThreatsData } from '../types'

const data = threatsData as ThreatsData

export function ThreatOverview() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'es' ? 'es' : 'en'

  return (
    <section id="threats" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{data.title[lang] || data.title.en}</h2>
        <p className="text-muted-foreground">{data.intro[lang] || data.intro.en}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.threats.map((threat) => (
          <div key={threat.id} className="border border-border rounded-lg p-4">
            <h3 className="font-semibold">{threat.title[lang] || threat.title.en}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {threat.description[lang] || threat.description.en}
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground mt-3">
              {threat.risks.map((risk, index) => (
                <li key={index}>{risk[lang] || risk.en}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
