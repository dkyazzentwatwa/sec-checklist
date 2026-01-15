import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Lock, CheckCircle2, Shield, Smartphone, Plane, MessageSquare, ShieldAlert, AlertTriangle, Users } from 'lucide-react'
import { useChecklistProgress } from '@/features/security/hooks/useChecklistProgress'

// Import checklist metadata
import essentialsData from '@/features/security/data/checklists/essentials.json'
import protestData from '@/features/security/data/checklists/protest.json'
import signalData from '@/features/security/data/checklists/signal.json'
import travelData from '@/features/security/data/checklists/travel.json'
import secondaryPhoneData from '@/features/security/data/checklists/secondary-phone.json'
import spywareData from '@/features/security/data/checklists/spyware.json'
import emergencyData from '@/features/security/data/checklists/emergency.json'
import organizerData from '@/features/security/data/checklists/organizer.json'

interface ChecklistSummary {
  id: string
  title: { en: string; es: string }
  description: { en: string; es: string }
  icon: React.ElementType
  itemCount: number
  available: boolean
}

const checklists: ChecklistSummary[] = [
  {
    id: 'essentials',
    title: essentialsData.content.title,
    description: essentialsData.content.description,
    icon: Shield,
    itemCount: essentialsData.content.items.length,
    available: true
  },
  {
    id: 'protest',
    title: protestData.content.title,
    description: protestData.content.description,
    icon: Lock,
    itemCount: protestData.content.items.length,
    available: true
  },
  {
    id: 'signal',
    title: signalData.content.title,
    description: signalData.content.description,
    icon: MessageSquare,
    itemCount: signalData.content.items.length,
    available: true
  },
  {
    id: 'travel',
    title: travelData.content.title,
    description: travelData.content.description,
    icon: Plane,
    itemCount: travelData.content.items.length,
    available: true
  },
  {
    id: 'secondary-phone',
    title: secondaryPhoneData.content.title,
    description: secondaryPhoneData.content.description,
    icon: Smartphone,
    itemCount: secondaryPhoneData.content.items.length,
    available: true
  },
  {
    id: 'spyware',
    title: spywareData.content.title,
    description: spywareData.content.description,
    icon: ShieldAlert,
    itemCount: spywareData.content.items.length,
    available: true
  },
  {
    id: 'emergency',
    title: emergencyData.content.title,
    description: emergencyData.content.description,
    icon: AlertTriangle,
    itemCount: emergencyData.content.items.length,
    available: true
  },
  {
    id: 'organizer',
    title: organizerData.content.title,
    description: organizerData.content.description,
    icon: Users,
    itemCount: organizerData.content.items.length,
    available: true
  }
]

function ChecklistCard({ checklist, lang }: { checklist: ChecklistSummary; lang: 'en' | 'es' }) {
  const { completedCount } = useChecklistProgress(checklist.id)
  const Icon = checklist.icon
  const percentage = checklist.itemCount > 0
    ? Math.round((completedCount / checklist.itemCount) * 100)
    : 0

  const title = checklist.title[lang] || checklist.title.en
  const description = checklist.description[lang] || checklist.description.en

  if (!checklist.available) {
    return (
      <div className="p-6 border border-border rounded-lg opacity-60 cursor-not-allowed">
        <Icon className="h-8 w-8 mb-3 text-muted-foreground" />
        <h3 className="font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <span className="text-xs text-muted-foreground italic">Coming soon...</span>
      </div>
    )
  }

  return (
    <Link
      to={`/security/${checklist.id}`}
      className="block p-6 border border-border rounded-lg hover:border-primary hover:shadow-md transition-all"
    >
      <Icon className="h-8 w-8 mb-3 text-green-500" />
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />
            <span>{completedCount} / {checklist.itemCount} completed</span>
          </div>
          <span className="font-medium">{percentage}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </Link>
  )
}

export function SecurityIndex() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'en' | 'es'

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="h-8 w-8 text-green-500" />
          <h1 className="text-3xl font-bold">{t('security.title')}</h1>
        </div>
        <p className="text-muted-foreground">
          Practical digital security guidance for activists. Start where you are, do what you can.
          Every step towards better security helps protect you and your community.
        </p>
        <div className="mt-4">
          <Link
            to="/security/advisor"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            <Shield className="h-4 w-4" />
            {t('security.advisorLink')}
          </Link>
        </div>
      </div>

      {/* Checklists Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{t('security.checklists')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checklists.map((checklist) => (
            <ChecklistCard key={checklist.id} checklist={checklist} lang={lang} />
          ))}
        </div>
      </div>

      {/* Harm Reduction Message */}
      <div className="mt-8 bg-muted/50 border border-border rounded-lg p-6">
        <p className="text-sm text-center italic text-muted-foreground">
          "Perfect security doesn't exist. Start where you are, do what you can.
          Protecting yourself helps keep your whole community safer."
        </p>
      </div>
    </div>
  )
}
