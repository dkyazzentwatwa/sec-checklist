import { useTranslation } from 'react-i18next'
import { Users } from 'lucide-react'
import { ProtestRightsGuide } from '@/features/activism/components/ProtestRightsGuide'
import { LegalObserver } from '@/features/activism/components/LegalObserver'
import { OrganizingToolkit } from '@/features/activism/components/OrganizingToolkit'
import { ActionPlanner } from '@/features/activism/components/ActionPlanner'
import protestRightsData from '@/features/activism/data/protest-rights.json'
import type { ProtestRightsData } from '@/features/activism/types'

export function ActivismIndex() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'es' ? 'es' : 'en'
  const rightsData = protestRightsData as ProtestRightsData

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-8 w-8 text-purple-500" />
          <h1 className="text-3xl font-bold">{t('nav.activism')}</h1>
        </div>
        <p className="text-muted-foreground">{t('activism.intro')}</p>
      </section>

      <ProtestRightsGuide />

      <LegalObserver />

      <section className="border border-border rounded-lg p-6" id="support">
        <h2 className="text-xl font-semibold mb-2">
          {rightsData.support.title[lang] || rightsData.support.title.en}
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          {rightsData.support.items.map((item, index) => (
            <li key={index}>{item[lang] || item.en}</li>
          ))}
        </ul>
      </section>

      <OrganizingToolkit />

      <ActionPlanner />
    </div>
  )
}
