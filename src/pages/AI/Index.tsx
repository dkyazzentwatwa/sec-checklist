import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Brain,
  Scale,
  Shield,
  FileText,
  MessageCircle,
  Lock,
  Cpu,
  Settings,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { ChatInterface } from '@/features/ai/components/ChatInterface'
import { ConversationHistory } from '@/features/ai/components/ConversationHistory'
import { ModelManager } from '@/features/ai/components/ModelManager'
import { PersonaManager } from '@/features/ai/components/PersonaManager'
import { DocumentGenerator } from '@/features/ai/components/DocumentGenerator'
import { useAIStore, selectActiveConversation, selectIsModelReady } from '@/features/ai/stores/aiStore'
import type { AssistantType } from '@/features/ai/services/webllm/prompts'
import { cn } from '@/utils/cn'

interface AssistantTab {
  id: AssistantType
  label: { en: string; es: string }
  description: { en: string; es: string }
  icon: React.ElementType
  color: string
}

const ASSISTANTS: AssistantTab[] = [
  {
    id: 'rights',
    label: { en: 'Rights Assistant', es: 'Asistente de Derechos' },
    description: {
      en: 'Get guidance on immigration rights and ICE encounters',
      es: 'Obten orientacion sobre derechos de inmigracion y encuentros con ICE',
    },
    icon: Scale,
    color: 'text-blue-500',
  },
  {
    id: 'security',
    label: { en: 'Security Advisor', es: 'Asesor de Seguridad' },
    description: {
      en: 'Get help with digital security practices',
      es: 'Obten ayuda con practicas de seguridad digital',
    },
    icon: Shield,
    color: 'text-green-500',
  },
  {
    id: 'document',
    label: { en: 'Document Generator', es: 'Generador de Documentos' },
    description: {
      en: 'Create emergency plans and rights cards',
      es: 'Crea planes de emergencia y tarjetas de derechos',
    },
    icon: FileText,
    color: 'text-orange-500',
  },
  {
    id: 'general',
    label: { en: 'General Help', es: 'Ayuda General' },
    description: {
      en: 'General questions about the app and resources',
      es: 'Preguntas generales sobre la app y recursos',
    },
    icon: MessageCircle,
    color: 'text-purple-500',
  },
]

export function AIIndex() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language === 'es' ? 'es' : 'en') as 'en' | 'es'
  const [activeTab, setActiveTab] = useState<AssistantType>('rights')
  const [showSettings, setShowSettings] = useState(false)

  const isModelReady = useAIStore(selectIsModelReady)
  const conversations = useAIStore((s) => s.conversations)
  const activeConversation = useAIStore(selectActiveConversation)
  const setActiveConversation = useAIStore((s) => s.setActiveConversation)
  const activeAssistant = ASSISTANTS.find((assistant) => assistant.id === activeTab) || ASSISTANTS[0]

  useEffect(() => {
    if (activeConversation?.type === activeTab) return
    const matching = conversations.find((conversation) => conversation.type === activeTab)
    setActiveConversation(matching?.id ?? null)
  }, [activeConversation?.type, activeTab, conversations, setActiveConversation])

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-8 w-8 text-pink-500" />
          <h1 className="text-3xl font-bold">{t('nav.ai')}</h1>
        </div>
        <p className="text-muted-foreground">
          {lang === 'es'
            ? 'Asistente de IA que funciona 100% localmente en tu navegador. Tus conversaciones nunca salen de tu dispositivo.'
            : 'AI-powered assistant running 100% locally in your browser. Your conversations never leave your device.'}
        </p>
      </div>

      {/* Privacy notice */}
      <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
        <Lock className="h-5 w-5 text-green-500 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-green-700 dark:text-green-400">
            {lang === 'es' ? 'Privacidad Completa' : 'Complete Privacy'}
          </p>
          <p className="text-sm text-muted-foreground">
            {lang === 'es'
              ? 'Todo el procesamiento de IA ocurre en tu dispositivo. Sin servidores, sin seguimiento, sin registro.'
              : 'All AI processing happens on your device. No servers, no tracking, no logging.'}
          </p>
        </div>
        {isModelReady && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Cpu className="h-4 w-4" />
            <span>Local AI</span>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
        <ConversationHistory filterType={activeTab} />

        <div className="space-y-4 min-w-0">
          {/* Tab navigation */}
          <div className="flex flex-wrap gap-2">
            {ASSISTANTS.map((assistant) => {
              const Icon = assistant.icon
              const isActive = activeTab === assistant.id

              return (
                <button
                  key={assistant.id}
                  onClick={() => setActiveTab(assistant.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border hover:border-primary/50'
                  )}
                >
                  <Icon className={cn('h-4 w-4', !isActive && assistant.color)} />
                  <span className="text-sm font-medium">{assistant.label[lang]}</span>
                </button>
              )
            })}
          </div>

          {/* Active assistant description */}
          <div className="text-sm text-muted-foreground">
            {activeAssistant.description[lang]}
          </div>

          {/* Active view */}
          {activeTab === 'document' ? (
            <DocumentGenerator />
          ) : (
            <ChatInterface
              key={activeTab}
              assistantType={activeTab}
              title={activeAssistant.label[lang]}
              description={activeAssistant.description[lang]}
            />
          )}
        </div>
      </div>

      {/* How it works section */}
      <div className="border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          {lang === 'es' ? '¿Cómo Funciona?' : 'How It Works'}
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="text-center">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-3">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1">
              {lang === 'es' ? 'IA Local' : 'Local AI'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {lang === 'es'
                ? 'El modelo de IA se descarga y se ejecuta completamente en tu dispositivo'
                : 'The AI model is downloaded and runs entirely on your device'}
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-3">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1">
              {lang === 'es' ? 'Sin Servidores' : 'No Servers'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {lang === 'es'
                ? 'Tus preguntas y respuestas nunca salen de tu telefono'
                : 'Your questions and answers never leave your phone'}
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-3">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1">
              {lang === 'es' ? 'Funciona Sin Conexion' : 'Works Offline'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {lang === 'es'
                ? 'Una vez descargado, funciona sin conexion a Internet'
                : 'Once downloaded, works without internet connection'}
            </p>
          </div>
        </div>
      </div>

      {/* Settings / Model Management */}
      <div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span>{lang === 'es' ? 'Configuracion avanzada' : 'Advanced settings'}</span>
          {showSettings ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showSettings && (
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="text-base font-semibold mb-2">
                {lang === 'es' ? 'Gestion de modelos' : 'Model management'}
              </h3>
              <ModelManager />
            </div>
            <div>
              <h3 className="text-base font-semibold mb-2">
                {lang === 'es' ? 'Personas personalizadas' : 'Custom personas'}
              </h3>
              <PersonaManager />
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-muted/50 border border-border rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          {lang === 'es'
            ? 'Esta herramienta proporciona informacion educativa general, no asesoria legal. Para situaciones especificas, consulta con un abogado calificado.'
            : 'This tool provides general educational information, not legal advice. For specific situations, consult with a qualified attorney.'}
        </p>
      </div>
    </div>
  )
}
