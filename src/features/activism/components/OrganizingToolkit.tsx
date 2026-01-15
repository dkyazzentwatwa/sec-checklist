import { useTranslation } from 'react-i18next'
import organizingData from '../data/organizing.json'
import type { OrganizingToolkitData } from '../types'

const data = organizingData as OrganizingToolkitData

export function OrganizingToolkit() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'es' ? 'es' : 'en'

  return (
    <section id="organizing" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{data.title[lang] || data.title.en}</h2>
        <p className="text-muted-foreground">{data.intro[lang] || data.intro.en}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.sections.map((section) => (
          <div key={section.id} className="border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-3">{section.title[lang] || section.title.en}</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              {section.items.map((item, index) => (
                <li key={index}>{item[lang] || item.en}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
