export type LocalizedString = {
  en: string
  es: string
}

export interface ScenarioRight {
  title: LocalizedString
  description: LocalizedString
  legalBasis?: LocalizedString
}

export interface ScenarioWarrant {
  title: LocalizedString
  description: LocalizedString
}

export interface Scenario {
  id: 'home' | 'workplace' | 'public' | 'courthouse'
  title: LocalizedString
  description: LocalizedString
  rights: ScenarioRight[]
  steps: LocalizedString[]
  avoid: LocalizedString[]
  phrases: LocalizedString[]
  warrantTypes?: ScenarioWarrant[]
  lastUpdated: string
}

export interface RightsCardTemplate {
  id: string
  title: LocalizedString
  content: LocalizedString
}

export interface HotlineEntry {
  id: string
  name: LocalizedString
  phone: string
  altPhone?: string
  hours: LocalizedString
  languages: string[]
  description?: LocalizedString
}

export interface HotlineRegion {
  id: string
  name: LocalizedString
  hotlines: HotlineEntry[]
}

export interface HotlineData {
  national: HotlineEntry[]
  regions: HotlineRegion[]
}
