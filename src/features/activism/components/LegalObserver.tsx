import { useTranslation } from 'react-i18next'
import protestRightsData from '../data/protest-rights.json'
import type { ProtestRightsData } from '../types'

const data = protestRightsData as ProtestRightsData

export function LegalObserver() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'es' ? 'es' : 'en'

  return (
    <section id="legal-observer" className="border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">
        {data.legalObserver.title[lang] || data.legalObserver.title.en}
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        {data.legalObserver.description[lang] || data.legalObserver.description.en}
      </p>
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
        {data.legalObserver.steps.map((step, index) => (
          <li key={index}>{step[lang] || step.en}</li>
        ))}
      </ul>
    </section>
  )
}
