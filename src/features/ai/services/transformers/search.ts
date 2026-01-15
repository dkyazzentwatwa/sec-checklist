import { db } from '@/core/db/schema'
import essentialsData from '@/features/security/data/checklists/essentials.json'
import protestData from '@/features/security/data/checklists/protest.json'
import signalData from '@/features/security/data/checklists/signal.json'
import travelData from '@/features/security/data/checklists/travel.json'
import secondaryPhoneData from '@/features/security/data/checklists/secondary-phone.json'
import spywareData from '@/features/security/data/checklists/spyware.json'
import emergencyData from '@/features/security/data/checklists/emergency.json'
import organizerData from '@/features/security/data/checklists/organizer.json'
import scenariosData from '@/features/immigration/data/scenarios.json'
import protestRightsData from '@/features/activism/data/protest-rights.json'
import organizingData from '@/features/activism/data/organizing.json'
import threatsData from '@/features/ai-defense/data/ai-threats.json'
import countermeasuresData from '@/features/ai-defense/data/countermeasures.json'
import threatUpdatesData from '@/features/ai-defense/data/threat-updates.json'
import dataBrokerData from '@/features/ai-defense/data/data-broker-opt-out.json'
import { cosineSimilarity, generateEmbedding } from './embeddings'

type SearchType = 'checklist' | 'scenario' | 'activism' | 'ai-defense'

interface SearchDocument {
  id: string
  type: SearchType
  title: string
  snippet: string
  path: string
  text: string
}

export interface SearchResult {
  id: string
  type: SearchType
  title: string
  snippet: string
  path: string
  score: number
}

const checklists = [
  essentialsData,
  protestData,
  signalData,
  travelData,
  secondaryPhoneData,
  spywareData,
  emergencyData,
  organizerData,
]

function toSearchText(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function getSearchDocuments(): SearchDocument[] {
  const checklistDocuments = checklists.flatMap((checklist) =>
    checklist.content.items.map((item) => {
      const text = toSearchText(
        item.title.en,
        item.title.es,
        item.description.en,
        item.description.es,
        item.steps?.map((step) => `${step.en} ${step.es}`).join(' ')
      )

      return {
        id: `checklist:${checklist.id}:${item.id}`,
        type: 'checklist' as const,
        title: item.title.en,
        snippet: item.description.en,
        path: `/security/${checklist.id}`,
        text,
      }
    })
  )

  const scenarioDocuments = scenariosData.scenarios.map((scenario) => {
    const rightsText = scenario.rights
      .map((right) => `${right.title.en} ${right.title.es} ${right.description.en} ${right.description.es}`)
      .join(' ')

    const text = toSearchText(
      scenario.title.en,
      scenario.title.es,
      scenario.description.en,
      scenario.description.es,
      rightsText
    )

    return {
      id: `scenario:${scenario.id}`,
      type: 'scenario' as const,
      title: scenario.title.en,
      snippet: scenario.description.en,
      path: `/immigration?scenario=${scenario.id}`,
      text,
    }
  })

  const activismDocuments = [
    ...protestRightsData.rights.map((right) => ({
      id: `activism:protest-rights:${right.id}`,
      type: 'activism' as const,
      title: right.title.en,
      snippet: right.description.en,
      path: '/activism#protest-rights',
      text: toSearchText(right.title.en, right.title.es, right.description.en, right.description.es),
    })),
    ...organizingData.sections.map((section) => ({
      id: `activism:organizing:${section.id}`,
      type: 'activism' as const,
      title: section.title.en,
      snippet: section.items[0]?.en || section.items[0]?.es || '',
      path: '/activism#organizing',
      text: toSearchText(
        section.title.en,
        section.title.es,
        section.items.map((item) => `${item.en} ${item.es}`).join(' ')
      ),
    })),
  ]

  const aiDefenseDocuments = [
    ...threatsData.threats.map((threat) => ({
      id: `ai-defense:threat:${threat.id}`,
      type: 'ai-defense' as const,
      title: threat.title.en,
      snippet: threat.description.en,
      path: '/ai-defense#threats',
      text: toSearchText(
        threat.title.en,
        threat.title.es,
        threat.description.en,
        threat.description.es,
        threat.risks.map((risk) => `${risk.en} ${risk.es}`).join(' ')
      ),
    })),
    ...countermeasuresData.categories.map((category) => ({
      id: `ai-defense:countermeasure:${category.id}`,
      type: 'ai-defense' as const,
      title: category.title.en,
      snippet: category.description.en,
      path: '/ai-defense#countermeasures',
      text: toSearchText(
        category.title.en,
        category.title.es,
        category.description.en,
        category.description.es,
        category.tips.map((tip) => `${tip.en} ${tip.es}`).join(' ')
      ),
    })),
    ...threatUpdatesData.updates.map((update) => ({
      id: `ai-defense:update:${update.id}`,
      type: 'ai-defense' as const,
      title: update.title.en,
      snippet: update.summary.en,
      path: '/ai-defense#updates',
      text: toSearchText(update.title.en, update.title.es, update.summary.en, update.summary.es),
    })),
    {
      id: 'ai-defense:data-broker',
      type: 'ai-defense' as const,
      title: dataBrokerData.title.en,
      snippet: dataBrokerData.intro.en,
      path: '/ai-defense#data-brokers',
      text: toSearchText(
        dataBrokerData.title.en,
        dataBrokerData.title.es,
        dataBrokerData.intro.en,
        dataBrokerData.intro.es,
        dataBrokerData.steps.map((step) => `${step.en} ${step.es}`).join(' ')
      ),
    },
  ]

  return [...checklistDocuments, ...scenarioDocuments, ...activismDocuments, ...aiDefenseDocuments]
}

export async function ensureSearchIndex(documents = getSearchDocuments()) {
  if (documents.length === 0) return

  const existing = await db.embeddings
    .where('contentId')
    .anyOf(documents.map((doc) => doc.id))
    .toArray()
  const existingById = new Map(existing.map((item) => [item.contentId, item]))

  const embeddings = []

  for (const doc of documents) {
    const current = existingById.get(doc.id)
    const metadata = {
      type: doc.type,
      title: doc.title,
      snippet: doc.snippet,
      path: doc.path,
    }

    if (!current) {
      const embedding = await generateEmbedding(doc.text)
      embeddings.push({ contentId: doc.id, embedding, metadata })
      continue
    }

    const needsMetadataUpdate =
      current.metadata.type !== metadata.type
      || current.metadata.title !== metadata.title
      || current.metadata.snippet !== metadata.snippet
      || current.metadata.path !== metadata.path

    if (needsMetadataUpdate) {
      embeddings.push({ contentId: doc.id, embedding: current.embedding, metadata })
    }
  }

  if (embeddings.length > 0) {
    await db.embeddings.bulkPut(embeddings)
  }
}

export async function searchContent(query: string, limit = 8): Promise<SearchResult[]> {
  if (!query.trim()) return []

  const queryEmbedding = await generateEmbedding(query)
  const embeddings = await db.embeddings.toArray()

  const results = embeddings
    .map((item) => {
      const score = cosineSimilarity(queryEmbedding, item.embedding)
      return {
        id: item.contentId,
        type: item.metadata.type,
        title: item.metadata.title,
        snippet: item.metadata.snippet,
        path: item.metadata.path ?? '/',
        score,
      }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return results
}
