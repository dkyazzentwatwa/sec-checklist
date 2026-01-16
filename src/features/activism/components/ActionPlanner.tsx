import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Download, Copy, Check } from 'lucide-react'

const defaultFields = [
  {
    id: 'goal',
    label: { en: 'Goal and message', es: 'Meta y mensaje' },
    placeholder: { en: 'What change are you aiming for?', es: '¿Qué cambio buscan?' },
  },
  {
    id: 'audience',
    label: { en: 'Audience and allies', es: 'Audiencia y aliados' },
    placeholder: { en: 'Who needs to hear this and who can help?', es: '¿Quién debe escuchar y quién puede ayudar?' },
  },
  {
    id: 'logistics',
    label: { en: 'Logistics', es: 'Logística' },
    placeholder: { en: 'Location, time, permits, supplies.', es: 'Lugar, hora, permisos, suministros.' },
  },
  {
    id: 'roles',
    label: { en: 'Roles and responsibilities', es: 'Roles y responsabilidades' },
    placeholder: { en: 'Who is leading, documenting, supporting?', es: '¿Quién lidera, documenta, apoya?' },
  },
  {
    id: 'safety',
    label: { en: 'Safety and contingency', es: 'Seguridad y contingencia' },
    placeholder: { en: 'Risk assessment, exit routes, legal support.', es: 'Evaluación de riesgos, salidas, apoyo legal.' },
  },
]

export function ActionPlanner() {
  const { i18n, t } = useTranslation()
  const lang = i18n.language === 'es' ? 'es' : 'en'
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem('rights-shield:action-plan')
      if (stored) {
        setNotes(JSON.parse(stored))
      }
    } catch (error) {
      console.warn('Failed to restore action plan draft:', error)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('rights-shield:action-plan', JSON.stringify(notes))
    } catch (error) {
      console.warn('Failed to save action plan draft:', error)
    }
  }, [notes])

  const exportToMarkdown = () => {
    let markdown = '# Action Plan\n\n'
    markdown += `*Generated on ${new Date().toLocaleDateString()}*\n\n---\n\n`

    defaultFields.forEach(field => {
      const label = field.label[lang] || field.label.en
      const content = notes[field.id] || ''
      markdown += `## ${label}\n\n${content || '_No content_'}\n\n`
    })

    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `action-plan-${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportToJSON = () => {
    const data = {
      title: 'Action Plan',
      generatedAt: new Date().toISOString(),
      language: lang,
      sections: defaultFields.map(field => ({
        id: field.id,
        label: field.label[lang] || field.label.en,
        content: notes[field.id] || ''
      }))
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `action-plan-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = async () => {
    let text = 'ACTION PLAN\n'
    text += `Generated on ${new Date().toLocaleDateString()}\n\n`
    text += '─────────────────────────────────────\n\n'

    defaultFields.forEach(field => {
      const label = field.label[lang] || field.label.en
      const content = notes[field.id] || ''
      text += `${label.toUpperCase()}\n${content || '(No content)'}\n\n`
    })

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  return (
    <section id="action-plan" className="border border-border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-2">{t('activism.actionPlanTitle')}</h2>
      <p className="text-muted-foreground mb-4">{t('activism.actionPlanDescription')}</p>

      <div className="space-y-4">
        {defaultFields.map((field) => (
          <label key={field.id} className="block">
            <span className="text-sm font-medium">
              {field.label[lang] || field.label.en}
            </span>
            <textarea
              className="w-full mt-2 p-3 border border-border rounded-lg text-sm"
              rows={3}
              value={notes[field.id] || ''}
              onChange={(event) =>
                setNotes((prev) => ({
                  ...prev,
                  [field.id]: event.target.value,
                }))
              }
              placeholder={field.placeholder[lang] || field.placeholder.en}
            />
          </label>
        ))}
      </div>

      {/* Export Actions */}
      <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-3">
        <button
          onClick={exportToMarkdown}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          <Download className="h-4 w-4" />
          Export Markdown
        </button>

        <button
          onClick={exportToJSON}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium"
        >
          <Download className="h-4 w-4" />
          Export JSON
        </button>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy to Clipboard
            </>
          )}
        </button>
      </div>
    </section>
  )
}
