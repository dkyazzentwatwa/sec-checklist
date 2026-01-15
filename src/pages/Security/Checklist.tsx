import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ChecklistViewer } from '@/features/security/components/ChecklistViewer'
import type { ChecklistContent } from '@/core/db/schema'

// Import checklist data
import essentialsData from '@/features/security/data/checklists/essentials.json'
import protestData from '@/features/security/data/checklists/protest.json'
import signalData from '@/features/security/data/checklists/signal.json'
import travelData from '@/features/security/data/checklists/travel.json'
import secondaryPhoneData from '@/features/security/data/checklists/secondary-phone.json'
import spywareData from '@/features/security/data/checklists/spyware.json'
import emergencyData from '@/features/security/data/checklists/emergency.json'
import organizerData from '@/features/security/data/checklists/organizer.json'

// Map of available checklists - cast to proper types
const checklists: Record<string, { id: string; content: ChecklistContent }> = {
  essentials: { id: essentialsData.id, content: essentialsData.content as ChecklistContent },
  protest: { id: protestData.id, content: protestData.content as ChecklistContent },
  signal: { id: signalData.id, content: signalData.content as ChecklistContent },
  travel: { id: travelData.id, content: travelData.content as ChecklistContent },
  'secondary-phone': {
    id: secondaryPhoneData.id,
    content: secondaryPhoneData.content as ChecklistContent
  },
  spyware: { id: spywareData.id, content: spywareData.content as ChecklistContent },
  emergency: { id: emergencyData.id, content: emergencyData.content as ChecklistContent },
  organizer: { id: organizerData.id, content: organizerData.content as ChecklistContent }
}

export function SecurityChecklist() {
  const { checklistId } = useParams<{ checklistId: string }>()

  const checklist = checklistId ? checklists[checklistId] : null

  if (!checklist) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Checklist not found</h1>
        <Link to="/security" className="text-primary hover:underline">
          Back to Security
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Back link */}
      <Link
        to="/security"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 no-print"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Security</span>
      </Link>

      {/* Checklist */}
      <ChecklistViewer
        checklistId={checklist.id}
        content={checklist.content}
      />
    </div>
  )
}
