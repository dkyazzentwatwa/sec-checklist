import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

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
    </section>
  )
}
