import { useTranslation } from 'react-i18next'
import { Eye } from 'lucide-react'
import { ThreatOverview } from '@/features/ai-defense/components/ThreatOverview'
import { CountermeasuresGuide } from '@/features/ai-defense/components/CountermeasuresGuide'
import { ThreatUpdates } from '@/features/ai-defense/components/ThreatUpdates'
import { DataBrokerOptOut } from '@/features/ai-defense/components/DataBrokerOptOut'

export function AIDefenseIndex() {
  const { t } = useTranslation()

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Eye className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold">{t('nav.aiDefense')}</h1>
        </div>
        <p className="text-muted-foreground">{t('aiDefense.intro')}</p>
      </section>

      <ThreatOverview />

      <CountermeasuresGuide />

      <DataBrokerOptOut />

      <ThreatUpdates />
    </div>
  )
}
