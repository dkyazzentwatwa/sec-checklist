import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AlertCircle, Check, Loader2, Shield } from 'lucide-react'
import { useWebLLM } from '@/features/ai/hooks/useWebLLM'
import { useAIStore } from '@/features/ai/stores/aiStore'
import { ModelDownloader } from '@/features/ai/components/ModelDownloader'
import essentialsData from '@/features/security/data/checklists/essentials.json'
import protestData from '@/features/security/data/checklists/protest.json'
import signalData from '@/features/security/data/checklists/signal.json'
import travelData from '@/features/security/data/checklists/travel.json'
import secondaryPhoneData from '@/features/security/data/checklists/secondary-phone.json'
import spywareData from '@/features/security/data/checklists/spyware.json'
import emergencyData from '@/features/security/data/checklists/emergency.json'
import organizerData from '@/features/security/data/checklists/organizer.json'

const allChecklists = [
  essentialsData,
  protestData,
  signalData,
  travelData,
  secondaryPhoneData,
  spywareData,
  emergencyData,
  organizerData
]

const threatLevels = ['low', 'medium', 'high'] as const
const focusAreas = ['immigration', 'protest', 'travel', 'organizing', 'family'] as const
const deviceTypes = ['phone', 'computer', 'cloud'] as const

type ThreatLevel = typeof threatLevels[number]
type FocusArea = typeof focusAreas[number]
type DeviceType = typeof deviceTypes[number]

interface AdvisorForm {
  threatLevel: ThreatLevel
  focus: FocusArea
  devices: Record<DeviceType, boolean>
  description: string
}

const defaultForm: AdvisorForm = {
  threatLevel: 'medium',
  focus: 'immigration',
  devices: {
    phone: true,
    computer: false,
    cloud: false
  },
  description: ''
}

export function SmartChecklistAdvisor() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'es' ? 'es' : 'en'
  const [form, setForm] = useState<AdvisorForm>(defaultForm)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const createConversation = useAIStore((state) => state.createConversation)

  const {
    isModelReady,
    isGenerating,
    generationError,
    sendMessage,
  } = useWebLLM({ assistantType: 'security' })

  const checklistSummary = useMemo(() => {
    return allChecklists.map((checklist) => {
      const items = checklist.content.items
        .map((item) => `${item.id}: ${item.title.en}`)
        .join('; ')
      return `${checklist.id}: ${checklist.content.title.en} -> ${items}`
    }).join('\n')
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!isModelReady || isGenerating) return

    const contextParts = [
      `Threat level: ${form.threatLevel}`,
      `Focus: ${form.focus}`,
      `Devices: ${Object.entries(form.devices)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join(', ') || 'none'}`,
      form.description ? `Details: ${form.description}` : null,
    ].filter(Boolean)

    const prompt = `You are a security advisor helping activists pick checklist items.
We have these checklists and items:
${checklistSummary}

Using only the item IDs listed above, recommend 5 items tailored to this user.
Respond with bullet points in this format:
* Checklist Item Title (Checklist ID) – short reason referencing the user context
User context:
${contextParts.join('\n')}`

    const conversationId = createConversation('security')

    try {
      const response = await sendMessage(prompt, { stream: false, conversationId })
      setResult(response)
    } catch (error) {
      console.error('Failed to generate recommendations:', error)
    }
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy recommendations:', error)
    }
  }

  if (!isModelReady) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>{lang === 'es' ? 'Descarga un modelo para obtener recomendaciones inteligentes.' : 'Download a model to get smart recommendations.'}</span>
        </div>
        <ModelDownloader />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          {lang === 'es' ? 'Listas inteligentes' : 'Smart Adaptive Checklists'}
        </h2>
        <p className="text-muted-foreground">
          {lang === 'es'
            ? 'Responde algunas preguntas y la IA recomendará elementos clave de las listas.'
            : 'Answer a few questions and the AI will suggest checklist items tailored to you.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium">
              {lang === 'es' ? 'Nivel de riesgo' : 'Threat level'}
            </span>
            <select
              className="mt-2 w-full border border-border rounded-lg px-3 py-2"
              value={form.threatLevel}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, threatLevel: event.target.value as ThreatLevel }))
              }
            >
              {threatLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="font-medium">{lang === 'es' ? 'Enfoque principal' : 'Primary focus'}</span>
            <select
              className="mt-2 w-full border border-border rounded-lg px-3 py-2"
              value={form.focus}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, focus: event.target.value as FocusArea }))
              }
            >
              {focusAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <span className="text-sm font-medium">
            {lang === 'es' ? 'Dispositivos a proteger' : 'Devices to protect'}
          </span>
          <div className="mt-2 flex flex-wrap gap-3">
            {deviceTypes.map((device) => (
              <label key={device} className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.devices[device]}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      devices: {
                        ...prev.devices,
                        [device]: event.target.checked
                      }
                    }))
                  }
                />
                <span>{device}</span>
              </label>
            ))}
          </div>
        </div>

        <label className="block text-sm">
          <span className="font-medium">
            {lang === 'es' ? 'Detalles adicionales' : 'Additional details'}
          </span>
          <textarea
            className="mt-2 w-full border border-border rounded-lg p-3"
            rows={4}
            value={form.description}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, description: event.target.value }))
            }
            placeholder={lang === 'es'
              ? 'Describe situaciones específicas, ubicaciones o inquietudes.'
              : 'Describe specific situations, locations, or concerns.'}
          />
        </label>

        <button
          type="submit"
          disabled={isGenerating}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium"
        >
          {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
          {lang === 'es' ? 'Obtener recomendaciones' : 'Get recommendations'}
        </button>
      </form>

      {generationError && (
        <div className="flex items-center gap-2 text-sm text-red-500">
          <AlertCircle className="h-4 w-4" />
          {generationError}
        </div>
      )}

      <div className="border border-border rounded-lg p-4 bg-muted/30 min-h-[180px]">
        {result ? (
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 text-sm text-primary"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Shield className="h-4 w-4" />}
              {copied ? (lang === 'es' ? 'Copiado' : 'Copied') : (lang === 'es' ? 'Copiar resultados' : 'Copy results')}
            </button>
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {lang === 'es'
              ? 'Tus recomendaciones aparecerán aquí.'
              : 'Your recommendations will appear here.'}
          </p>
        )}
      </div>
    </div>
  )
}
