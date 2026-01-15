import { useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Scale } from 'lucide-react'
import { ScenarioDetail } from '@/features/immigration/components/ScenarioDetail'
import { ScenarioSelector } from '@/features/immigration/components/ScenarioSelector'
import { RedCardGenerator } from '@/features/immigration/components/RedCardGenerator'
import { HotlinesList } from '@/features/immigration/components/HotlinesList'
import { EmergencyPlan } from '@/features/immigration/components/EmergencyPlan'
import scenariosData from '@/features/immigration/data/scenarios.json'
import type { Scenario } from '@/features/immigration/types'

export function ImmigrationIndex() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const scenarios = scenariosData.scenarios as Scenario[]
  const scenarioParam = searchParams.get('scenario') as Scenario['id'] | null
  const initialScenarioId = scenarios.find((scenario) => scenario.id === scenarioParam)?.id
    ?? scenarios[0]?.id
    ?? 'home'
  const [selectedScenarioId, setSelectedScenarioId] = useState<Scenario['id']>(initialScenarioId)
  const selectedScenario = useMemo(
    () => scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0],
    [scenarios, selectedScenarioId]
  )

  useEffect(() => {
    if (scenarioParam && scenarioParam !== selectedScenarioId) {
      const exists = scenarios.some((scenario) => scenario.id === scenarioParam)
      if (exists) {
        setSelectedScenarioId(scenarioParam)
      }
    }
  }, [scenarioParam, selectedScenarioId, scenarios])

  const handleSelectScenario = (scenarioId: Scenario['id']) => {
    setSelectedScenarioId(scenarioId)
    setSearchParams({ scenario: scenarioId }, { replace: true })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Scale className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold">{t('immigration.title')}</h1>
        </div>
        <p className="text-muted-foreground mb-3">{t('immigration.intro')}</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-muted-foreground">
          {t('immigration.disclaimer')}
        </div>
      </section>

      <section>
        <ScenarioSelector
          scenarios={scenarios}
          selectedId={selectedScenarioId}
          onSelect={handleSelectScenario}
        />
        {selectedScenario && <ScenarioDetail scenario={selectedScenario} />}
      </section>

      <section>
        <RedCardGenerator />
      </section>

      <section>
        <HotlinesList />
      </section>

      <section>
        <EmergencyPlan />
      </section>
    </div>
  )
}
