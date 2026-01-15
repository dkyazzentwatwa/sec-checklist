export type LocalizedString = {
  en: string
  es: string
}

export interface ThreatItem {
  id: string
  title: LocalizedString
  description: LocalizedString
  risks: LocalizedString[]
}

export interface ThreatsData {
  title: LocalizedString
  intro: LocalizedString
  threats: ThreatItem[]
}

export interface CountermeasureCategory {
  id: string
  title: LocalizedString
  description: LocalizedString
  tips: LocalizedString[]
}

export interface CountermeasuresData {
  title: LocalizedString
  intro: LocalizedString
  categories: CountermeasureCategory[]
}

export interface ThreatUpdate {
  id: string
  title: LocalizedString
  summary: LocalizedString
  source: string
  date: string
  url: string
}

export interface ThreatUpdatesData {
  title: LocalizedString
  intro: LocalizedString
  updates: ThreatUpdate[]
}

export interface DataBrokerResource {
  title: LocalizedString
  url: string
}

export interface DataBrokerData {
  title: LocalizedString
  intro: LocalizedString
  steps: LocalizedString[]
  resources: DataBrokerResource[]
}
