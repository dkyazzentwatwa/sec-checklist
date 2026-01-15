import { useTranslation } from 'react-i18next'
import dataBrokerData from '../data/data-broker-opt-out.json'
import type { DataBrokerData } from '../types'

const data = dataBrokerData as DataBrokerData

export function DataBrokerOptOut() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'es' ? 'es' : 'en'

  return (
    <section id="data-brokers" className="border border-border rounded-lg p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{data.title[lang] || data.title.en}</h2>
        <p className="text-muted-foreground">{data.intro[lang] || data.intro.en}</p>
      </div>

      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
        {data.steps.map((step, index) => (
          <li key={index}>{step[lang] || step.en}</li>
        ))}
      </ol>

      <div>
        <h3 className="font-semibold mb-2">{lang === 'es' ? 'Recursos' : 'Resources'}</h3>
        <ul className="space-y-2 text-sm">
          {data.resources.map((resource, index) => (
            <li key={index}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {resource.title[lang] || resource.title.en}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
