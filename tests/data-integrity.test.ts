import { describe, it, expect } from 'vitest'
import essentials from '@/features/security/data/checklists/essentials.json'
import protest from '@/features/security/data/checklists/protest.json'
import signal from '@/features/security/data/checklists/signal.json'
import travel from '@/features/security/data/checklists/travel.json'
import secondaryPhone from '@/features/security/data/checklists/secondary-phone.json'
import spyware from '@/features/security/data/checklists/spyware.json'
import emergency from '@/features/security/data/checklists/emergency.json'
import organizer from '@/features/security/data/checklists/organizer.json'
import scenarios from '@/features/immigration/data/scenarios.json'
import protestRights from '@/features/activism/data/protest-rights.json'
import organizing from '@/features/activism/data/organizing.json'
import aiThreats from '@/features/ai-defense/data/ai-threats.json'
import countermeasures from '@/features/ai-defense/data/countermeasures.json'
import enTranslation from '@/assets/locales/en/translation.json'
import esTranslation from '@/assets/locales/es/translation.json'
import frTranslation from '@/assets/locales/fr/translation.json'
import arTranslation from '@/assets/locales/ar/translation.json'
import zhTranslation from '@/assets/locales/zh/translation.json'
import viTranslation from '@/assets/locales/vi/translation.json'

const securityChecklists = [
  essentials,
  protest,
  signal,
  travel,
  secondaryPhone,
  spyware,
  emergency,
  organizer
]

describe('Security checklist content', () => {
  it('every checklist has at least one item with bilingual text', () => {
    securityChecklists.forEach((checklist) => {
      expect(checklist.content.items.length).toBeGreaterThan(0)
      checklist.content.items.forEach((item: any) => {
        expect(item.title.en).toBeTruthy()
        expect(item.title.es).toBeTruthy()
        expect(item.description.en).toBeTruthy()
        expect(item.description.es).toBeTruthy()
      })
    })
  })
})

describe('Immigration scenarios data', () => {
  it('each scenario lists rights and steps', () => {
    scenarios.scenarios.forEach((scenario: any) => {
      expect(scenario.rights.length).toBeGreaterThan(0)
      expect(scenario.steps.length).toBeGreaterThan(0)
    })
  })
})

describe('Activism module data', () => {
  it('protest rights include legal observer details', () => {
    expect(protestRights.legalObserver.steps.length).toBeGreaterThan(0)
    protestRights.rights.forEach((right: any) => {
      expect(right.title.en).toBeTruthy()
      expect(right.description.es).toBeTruthy()
    })
  })

  it('organizing toolkit sections have items', () => {
    organizing.sections.forEach((section: any) => {
      expect(section.items.length).toBeGreaterThan(0)
    })
  })
})

describe('AI defense data', () => {
  it('threat entries list risks', () => {
    aiThreats.threats.forEach((threat: any) => {
      expect(threat.risks.length).toBeGreaterThan(0)
    })
  })

  it('countermeasure categories include tips', () => {
    countermeasures.categories.forEach((category: any) => {
      expect(category.tips.length).toBeGreaterThan(0)
    })
  })
})

describe('Translation resources', () => {
  const locales = [
    { code: 'es', data: esTranslation },
    { code: 'fr', data: frTranslation },
    { code: 'ar', data: arTranslation },
    { code: 'zh', data: zhTranslation },
    { code: 'vi', data: viTranslation }
  ]

  const flattenKeys = (obj: Record<string, any>, prefix = ''): string[] => {
    return Object.entries(obj).flatMap(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return flattenKeys(value, path)
      }
      return path
    })
  }

  const baseKeys = flattenKeys(enTranslation)

  locales.forEach(({ code, data }) => {
    it(`locale ${code} has translation keys parity`, () => {
      const localeKeys = flattenKeys(data)
      expect(localeKeys).toEqual(baseKeys)
    })
  })
})
