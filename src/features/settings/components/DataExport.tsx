import { useState } from 'react'
import { Download, ShieldCheck } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { buildIndexedDbExport, downloadExport } from '../services/exportService'

export function DataExport() {
  const [isExporting, setIsExporting] = useState(false)
  const toast = useToast()

  const handleExport = async () => {
    setIsExporting(true)

    try {
      const payload = await buildIndexedDbExport()
      downloadExport(payload)
      toast.success('Export ready. Your data has been downloaded.')
    } catch (error) {
      console.error('Failed to export data:', error)
      toast.error('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <section className="border border-border rounded-lg p-6 bg-background">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Export your data</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Download a JSON file containing your local data stored in IndexedDB,
            including checklists, progress, saved items, and AI conversations.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleExport}
          disabled={isExporting}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          {isExporting ? 'Preparing export...' : 'Download export'}
        </button>
        <span className="text-xs text-muted-foreground">
          Files never leave your device. Keep exports secure.
        </span>
      </div>
    </section>
  )
}
