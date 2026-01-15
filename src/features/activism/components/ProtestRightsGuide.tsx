import { useTranslation } from 'react-i18next'
import protestRightsData from '../data/protest-rights.json'
import type { ProtestRightsData } from '../types'

const data = protestRightsData as ProtestRightsData

export function ProtestRightsGuide() {
  const { i18n, t } = useTranslation()
  const lang = i18n.language === 'es' ? 'es' : 'en'

  return (
    <section id="protest-rights" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{data.title[lang] || data.title.en}</h2>
        <p className="text-muted-foreground">{data.intro[lang] || data.intro.en}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.rights.map((right) => (
          <div key={right.id} className="border border-border rounded-lg p-4">
            <h3 className="font-semibold">{right.title[lang] || right.title.en}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {right.description[lang] || right.description.en}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-3">{t('activism.doTitle')}</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            {data.do.map((item, index) => (
              <li key={index}>{item[lang] || item.en}</li>
            ))}
          </ul>
        </div>
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-3">{t('activism.dontTitle')}</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            {data.dont.map((item, index) => (
              <li key={index}>{item[lang] || item.en}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
