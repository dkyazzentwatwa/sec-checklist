export type LocalizedString = {
  en: string
  es: string
}

export interface ProtestRight {
  id: string
  title: LocalizedString
  description: LocalizedString
}

export interface ProtestRightsData {
  title: LocalizedString
  intro: LocalizedString
  rights: ProtestRight[]
  do: LocalizedString[]
  dont: LocalizedString[]
  legalObserver: {
    title: LocalizedString
    description: LocalizedString
    steps: LocalizedString[]
  }
  support: {
    title: LocalizedString
    items: LocalizedString[]
  }
}

export interface OrganizingSection {
  id: string
  title: LocalizedString
  items: LocalizedString[]
}

export interface OrganizingToolkitData {
  title: LocalizedString
  intro: LocalizedString
  sections: OrganizingSection[]
}
