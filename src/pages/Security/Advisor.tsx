import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SmartChecklistAdvisor } from '@/features/security/components/SmartChecklistAdvisor'

export default function SecurityAdvisor() {
  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/security"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Security Overview
      </Link>

      <SmartChecklistAdvisor />
    </div>
  )
}
