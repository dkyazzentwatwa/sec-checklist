import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { Check, Copy, FileText, Loader2, Printer } from 'lucide-react'
import { useWebLLM } from '../hooks/useWebLLM'
import { useAIStore } from '../stores/aiStore'
import { ModelDownloader } from './ModelDownloader'

type DocumentTemplate = {
  id: string
  label: { en: string; es: string }
  description: { en: string; es: string }
  prompt: (details: string) => string
}

const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'emergency-plan',
    label: { en: 'Emergency Preparedness Plan', es: 'Plan de Preparación de Emergencia' },
    description: {
      en: 'Step-by-step plan for family and community preparedness.',
      es: 'Plan paso a paso para preparación familiar y comunitaria.'
    },
    prompt: (details) =>
      `Create an emergency preparedness plan focused on immigration safety. Include sections for contacts, immediate actions, and long-term preparation. Use clear headings and bullet points. Details to include: ${details || 'No extra details provided.'}`
  },
  {
    id: 'red-card',
    label: { en: 'Know Your Rights Card', es: 'Tarjeta de Conoce Tus Derechos' },
    description: {
      en: 'Printable card to show during ICE encounters.',
      es: 'Tarjeta imprimible para mostrar en encuentros con ICE.'
    },
    prompt: (details) =>
      `Generate a printable Know Your Rights card for ICE encounters. Keep it short, bold, and formatted for print. Details to include: ${details || 'No extra details provided.'}`
  },
  {
    id: 'contact-list',
    label: { en: 'Emergency Contact List', es: 'Lista de Contactos de Emergencia' },
    description: {
      en: 'Template for legal, family, and trusted contacts.',
      es: 'Plantilla para contactos legales, familiares y de confianza.'
    },
    prompt: (details) =>
      `Create an emergency contact list template with sections for lawyers, family, medical, and trusted community members. Provide placeholder fields. Details to include: ${details || 'No extra details provided.'}`
  },
  {
    id: 'protest-checklist',
    label: { en: 'Protest Safety Checklist', es: 'Lista de Seguridad para Protestas' },
    description: {
      en: 'Checklist for preparation, during, and after actions.',
      es: 'Lista para preparación, durante y después de acciones.'
    },
    prompt: (details) =>
      `Create a protest safety checklist with sections for before, during, and after an action. Keep it concise and practical. Details to include: ${details || 'No extra details provided.'}`
  },
  {
    id: 'family-comms',
    label: { en: 'Family Communication Plan', es: 'Plan de Comunicación Familiar' },
    description: {
      en: 'Plan for check-ins, code words, and escalation.',
      es: 'Plan para reportes, palabras clave y escalamiento.'
    },
    prompt: (details) =>
      `Create a family communication plan with check-in times, code words, and escalation steps. Make it easy to print. Details to include: ${details || 'No extra details provided.'}`
  }
]

export function DocumentGenerator() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'es' ? 'es' : 'en'

  const [selectedTemplateId, setSelectedTemplateId] = useState(DOCUMENT_TEMPLATES[0].id)
  const [details, setDetails] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const createConversation = useAIStore((state) => state.createConversation)

  const {
    isModelReady,
    isGenerating,
    generationError,
    sendMessage,
  } = useWebLLM({ assistantType: 'document' })

  const selectedTemplate = useMemo(
    () => DOCUMENT_TEMPLATES.find((template) => template.id === selectedTemplateId) || DOCUMENT_TEMPLATES[0],
    [selectedTemplateId]
  )

  const handleGenerate = async () => {
    if (!isModelReady || isGenerating) return

    const prompt = selectedTemplate.prompt(details.trim())
    const conversationId = createConversation('document')

    try {
      const response = await sendMessage(prompt, { stream: false, conversationId })
      setOutput(response)
    } catch (error) {
      console.error('Failed to generate document:', error)
    }
  }

  const handleCopy = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy document:', error)
    }
  }

  const handlePrint = () => {
    if (!output) return
    const printWindow = window.open('', '', 'width=700,height=900')
    if (!printWindow) return

    const safeOutput = output
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Generated Document</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 24px;
            line-height: 1.5;
          }
          h1, h2, h3 { margin-top: 16px; }
          ul { padding-left: 20px; }
          pre { white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <pre>${safeOutput}</pre>
        <script>
          window.print();
          window.onafterprint = () => window.close();
        </script>
      </body>
      </html>
    `)
    printWindow.document.close()
  }

  if (!isModelReady) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>{lang === 'es' ? 'Descarga un modelo para generar documentos.' : 'Download a model to generate documents.'}</span>
        </div>
        <ModelDownloader />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">
          {lang === 'es' ? 'Generador de Documentos' : 'Document Generator'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {lang === 'es'
            ? 'Genera documentos listos para imprimir con IA local.'
            : 'Generate print-ready documents with local AI.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          {DOCUMENT_TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => setSelectedTemplateId(template.id)}
              className={`w-full text-left border rounded-lg p-4 transition-colors ${
                selectedTemplateId === template.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/60'
              }`}
            >
              <h4 className="font-semibold">
                {template.label[lang] || template.label.en}
              </h4>
              <p className="text-sm text-muted-foreground">
                {template.description[lang] || template.description.en}
              </p>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2">
              {lang === 'es' ? 'Detalles opcionales' : 'Optional details'}
            </label>
            <textarea
              className="w-full min-h-[160px] p-3 border border-border rounded-lg"
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              placeholder={
                lang === 'es'
                  ? 'Agrega nombres, números, ubicación, necesidades, etc.'
                  : 'Add names, numbers, location, needs, etc.'
              }
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
            {lang === 'es' ? 'Generar documento' : 'Generate document'}
          </button>

          {generationError && (
            <p className="text-sm text-red-500">{generationError}</p>
          )}
        </div>
      </div>

      <div className="border border-border rounded-lg p-4 bg-muted/20 min-h-[200px]">
        {output ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                {copied ? (lang === 'es' ? 'Copiado' : 'Copied') : (lang === 'es' ? 'Copiar' : 'Copy')}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm"
              >
                <Printer className="h-4 w-4" />
                {lang === 'es' ? 'Imprimir' : 'Print'}
              </button>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {lang === 'es'
              ? 'El documento generado aparecerá aquí.'
              : 'Your generated document will appear here.'}
          </p>
        )}
      </div>
    </div>
  )
}
