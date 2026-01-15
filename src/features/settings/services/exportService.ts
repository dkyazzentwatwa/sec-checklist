import { db } from '@/core/db/schema'
import { APP_CONFIG } from '@/core/config/app.config'

const EXPORT_TABLES = {
  checklists: db.checklists,
  scenarios: db.scenarios,
  hotlines: db.hotlines,
  resources: db.resources,
  userProgress: db.userProgress,
  savedItems: db.savedItems,
  emergencyContacts: db.emergencyContacts,
  aiConversations: db.aiConversations,
  embeddings: db.embeddings,
  modelCache: db.modelCache,
  contentVersions: db.contentVersions,
}

export type ExportPayload = {
  app: string
  version: string
  exportedAt: string
  data: Record<string, unknown>
}

/**
 * Collect all IndexedDB data for user export as a JSON payload.
 */
export async function buildIndexedDbExport(): Promise<ExportPayload> {
  const entries = await Promise.all(
    Object.entries(EXPORT_TABLES).map(async ([key, table]) => [key, await table.toArray()])
  )

  const data = Object.fromEntries(entries)

  return {
    app: APP_CONFIG.name,
    version: APP_CONFIG.version,
    exportedAt: new Date().toISOString(),
    data,
  }
}

/**
 * Download a JSON export payload to the user's device.
 */
export function downloadExport(payload: ExportPayload) {
  const fileName = `rights-shield-export-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()

  setTimeout(() => URL.revokeObjectURL(url), 0)
}
