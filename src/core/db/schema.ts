import Dexie, { type EntityTable } from 'dexie'

// Content types
export interface Checklist {
  id: string
  category: 'essentials' | 'protest' | 'signal' | 'travel' | 'secondary-phone' | 'spyware' | 'emergency' | 'organizer'
  content: ChecklistContent
  version: string
  lastUpdated: string
}

export interface ChecklistContent {
  title: { en: string; es: string; [lang: string]: string }
  description: { en: string; es: string; [lang: string]: string }
  items: ChecklistItem[]
}

export interface ChecklistItem {
  id: string
  title: { en: string; es: string; [lang: string]: string }
  description: { en: string; es: string; [lang: string]: string }
  priority: 'essential' | 'recommended' | 'advanced'
  effort: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  steps?: { en: string; es: string }[]
  resources?: ExternalLink[]
  tags: string[]
}

export interface Scenario {
  id: string
  type: 'home' | 'workplace' | 'public' | 'courthouse'
  title: { en: string; es: string; [lang: string]: string }
  description: { en: string; es: string; [lang: string]: string }
  rights: Right[]
  doAndDont: {
    do: { en: string; es: string }[]
    dont: { en: string; es: string }[]
  }
  templates: Template[]
  hotlines: string[] // References to hotline IDs
  lastUpdated: string
}

export interface Right {
  title: { en: string; es: string }
  description: { en: string; es: string }
  legalBasis?: string
}

export interface Template {
  id: string
  type: 'red-card' | 'emergency-plan' | 'contact-list' | 'safety-checklist'
  content: { en: string; es: string }
}

export interface Hotline {
  id: string
  name: { en: string; es: string }
  phone: string
  type: 'national' | 'regional' | 'local'
  region?: string
  language: string[]
  available24_7: boolean
  description?: { en: string; es: string }
}

export interface Resource {
  id: string
  type: 'article' | 'guide' | 'video' | 'tool' | 'organization'
  content: any
  tags: string[]
  lastUpdated: string
}

export interface ExternalLink {
  url: string
  title: { en: string; es: string }
  description?: { en: string; es: string }
}

// User data types (local only, never sent anywhere)
export interface UserProgress {
  checklistId: string
  completedItems: string[]
  notes?: string
  timestamp: number
}

export interface SavedItem {
  id: string
  type: 'checklist' | 'scenario' | 'resource'
  content: any
  savedAt: number
}

export interface EmergencyContact {
  id: string
  name: string
  phone: string
  type: 'lawyer' | 'family' | 'friend' | 'organization'
  language?: string
  notes?: string
}

export interface AIConversation {
  id: string
  messages: Message[]
  context: 'rights' | 'security' | 'document-gen'
  timestamp: number
}

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

// AI types
export interface ContentEmbedding {
  contentId: string
  embedding: number[]
  metadata: {
    type: 'checklist' | 'scenario' | 'activism' | 'ai-defense'
    title: string
    snippet: string
    path?: string
  }
}

export interface ModelCache {
  modelId: string
  chunks: string[]
  version: string
  downloadedAt: number
}

export interface ContentVersion {
  module: 'checklists' | 'scenarios' | 'resources' | 'hotlines'
  version: string
  lastChecked: number
}

// Database class
export class RightsShieldDB extends Dexie {
  // Content tables
  checklists!: EntityTable<Checklist, 'id'>
  scenarios!: EntityTable<Scenario, 'id'>
  hotlines!: EntityTable<Hotline, 'id'>
  resources!: EntityTable<Resource, 'id'>

  // User data tables
  userProgress!: EntityTable<UserProgress, 'checklistId'>
  savedItems!: EntityTable<SavedItem, 'id'>
  emergencyContacts!: EntityTable<EmergencyContact, 'id'>
  aiConversations!: EntityTable<AIConversation, 'id'>

  // AI tables
  embeddings!: EntityTable<ContentEmbedding, 'contentId'>
  modelCache!: EntityTable<ModelCache, 'modelId'>

  // Metadata
  contentVersions!: EntityTable<ContentVersion, 'module'>

  constructor() {
    super('RightsShieldDB')

    this.version(1).stores({
      // Content
      checklists: 'id, category, lastUpdated',
      scenarios: 'id, type, lastUpdated',
      hotlines: 'id, type, region',
      resources: 'id, type, *tags, lastUpdated',

      // User data
      userProgress: 'checklistId, timestamp',
      savedItems: 'id, type, savedAt',
      emergencyContacts: 'id, type',
      aiConversations: 'id, context, timestamp',

      // AI
      embeddings: 'contentId, metadata.type',
      modelCache: 'modelId, downloadedAt',

      // Metadata
      contentVersions: 'module, lastChecked'
    })
  }
}

// Export singleton instance
export const db = new RightsShieldDB()
