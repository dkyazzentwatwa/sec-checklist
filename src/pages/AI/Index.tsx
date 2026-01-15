import { useState } from 'react'
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
import { ModelDownloader } from '@/features/ai/components/ModelDownloader'
import { ModelManager } from '@/features/ai/components/ModelManager'
import { DocumentGenerator } from '@/features/ai/components/DocumentGenerator'
import { useAIStore, selectIsModelReady } from '@/features/ai/stores/aiStore'
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
      es: 'Obtén orientación sobre derechos de inmigración y encuentros con ICE',
    },
    icon: Scale,
    color: 'text-blue-500',
  },
  {
    id: 'security',
    label: { en: 'Security Advisor', es: 'Asesor de Seguridad' },
    description: {
      en: 'Get help with digital security practices',
      es: 'Obtén ayuda con prácticas de seguridad digital',
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

  const activeAssistant = ASSISTANTS.find((a) => a.id === activeTab)!

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
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
      <div className="flex items-center gap-3 p-4 mb-6 bg-green-500/10 border border-green-500/30 rounded-lg">
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

      {/* Model downloader (if not ready) */}
      {!isModelReady && (
        <div className="mb-8">
          <ModelDownloader />
        </div>
      )}

      {/* Assistant tabs and chat */}
      {isModelReady && (
        <div className="space-y-4">
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

          {/* Chat interface or document generator */}
          {activeTab === 'document' ? (
            <DocumentGenerator />
          ) : (
            <ChatInterface
              key={activeTab}
              assistantType={activeTab}
              title={activeAssistant.label[lang]}
            />
          )}
        </div>
      )}

      {/* How it works section */}
      <div className="mt-8 border border-border rounded-lg p-6">
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
                ? 'Tus preguntas y respuestas nunca salen de tu teléfono'
                : 'Your questions and answers never leave your phone'}
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-3">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1">
              {lang === 'es' ? 'Funciona Sin Conexión' : 'Works Offline'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {lang === 'es'
                ? 'Una vez descargado, funciona sin conexión a Internet'
                : 'Once downloaded, works without internet connection'}
            </p>
          </div>
        </div>
      </div>

      {/* Settings / Model Management */}
      <div className="mt-8">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span>{lang === 'es' ? 'Configuración de Modelos' : 'Model Settings'}</span>
          {showSettings ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showSettings && (
          <div className="mt-4">
            <ModelManager />
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-muted/50 border border-border rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          {lang === 'es'
            ? 'Esta herramienta proporciona información educativa general, no asesoría legal. Para situaciones específicas, consulta con un abogado calificado.'
            : 'This tool provides general educational information, not legal advice. For specific situations, consult with a qualified attorney.'}
        </p>
      </div>
    </div>
  )
}
