import { useTranslation } from 'react-i18next'
import countermeasuresData from '../data/countermeasures.json'
import type { CountermeasuresData } from '../types'

const data = countermeasuresData as CountermeasuresData

export function CountermeasuresGuide() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'es' ? 'es' : 'en'

  return (
    <section id="countermeasures" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{data.title[lang] || data.title.en}</h2>
        <p className="text-muted-foreground">{data.intro[lang] || data.intro.en}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.categories.map((category) => (
          <div key={category.id} className="border border-border rounded-lg p-4">
            <h3 className="font-semibold">{category.title[lang] || category.title.en}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {category.description[lang] || category.description.en}
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground mt-3">
              {category.tips.map((tip, index) => (
                <li key={index}>{tip[lang] || tip.en}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
