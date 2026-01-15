import { useTranslation } from 'react-i18next'
import { Home, Building2, MapPin, Landmark } from 'lucide-react'
import type { Scenario } from '../types'

interface ScenarioSelectorProps {
  scenarios: Scenario[]
  selectedId: Scenario['id']
  onSelect: (scenarioId: Scenario['id']) => void
}

const iconMap = {
  home: Home,
  workplace: Building2,
  public: MapPin,
  courthouse: Landmark
}

export function ScenarioSelector({ scenarios, selectedId, onSelect }: ScenarioSelectorProps) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'en' | 'es'

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('immigration.scenarios')}</h2>
      <p className="text-muted-foreground mb-4">{t('immigration.selectScenario')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((scenario) => {
          const Icon = iconMap[scenario.id]
          const title = scenario.title[lang] || scenario.title.en
          const description = scenario.description[lang] || scenario.description.en
          const isActive = selectedId === scenario.id

          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => onSelect(scenario.id)}
              className={`text-left p-5 border rounded-lg transition-all ${
                isActive
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border hover:border-primary/60'
              }`}
              aria-pressed={isActive}
            >
              <Icon className={`h-7 w-7 mb-3 ${isActive ? 'text-primary' : 'text-blue-500'}`} />
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
