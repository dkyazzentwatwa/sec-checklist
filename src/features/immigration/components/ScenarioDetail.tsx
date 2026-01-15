import { useTranslation } from 'react-i18next'
import type { Scenario } from '../types'

interface ScenarioDetailProps {
  scenario: Scenario
}

export function ScenarioDetail({ scenario }: ScenarioDetailProps) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'en' | 'es'

  const title = scenario.title[lang] || scenario.title.en
  const description = scenario.description[lang] || scenario.description.en

  return (
    <div className="mt-8 border border-border rounded-lg p-6 bg-background">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-2">
          {t('immigration.lastUpdated')}: {scenario.lastUpdated}
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h4 className="text-lg font-semibold mb-3">{t('immigration.rightsHeading')}</h4>
          <div className="space-y-3">
            {scenario.rights.map((right, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <h5 className="font-semibold">{right.title[lang] || right.title.en}</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  {right.description[lang] || right.description.en}
                </p>
                {right.legalBasis && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {right.legalBasis[lang] || right.legalBasis.en}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="border border-border rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-3">{t('immigration.stepsHeading')}</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              {scenario.steps.map((step, index) => (
                <li key={index}>{step[lang] || step.en}</li>
              ))}
            </ol>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-3">{t('immigration.avoidHeading')}</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              {scenario.avoid.map((item, index) => (
                <li key={index}>{item[lang] || item.en}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border border-border rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-3">{t('immigration.phrasesHeading')}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {scenario.phrases.map((phrase, index) => (
              <li key={index} className="px-3 py-2 bg-muted/50 rounded">
                {phrase[lang] || phrase.en}
              </li>
            ))}
          </ul>
        </section>

        {scenario.warrantTypes && scenario.warrantTypes.length > 0 && (
          <section className="border border-border rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-3">{t('immigration.warrantHeading')}</h4>
            <div className="space-y-3">
              {scenario.warrantTypes.map((warrant, index) => (
                <div key={index}>
                  <h5 className="font-semibold">{warrant.title[lang] || warrant.title.en}</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    {warrant.description[lang] || warrant.description.en}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
