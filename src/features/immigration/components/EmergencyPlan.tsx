import { useTranslation } from 'react-i18next'

const planSections = [
  {
    id: 'before',
    title: {
      en: 'Before an encounter',
      es: 'Antes de un encuentro'
    },
    items: [
      {
        en: 'Share emergency contacts with trusted people',
        es: 'Comparte contactos de emergencia con personas de confianza'
      },
      {
        en: 'Carry a Know Your Rights card',
        es: 'Lleva una tarjeta de Conoce Tus Derechos'
      },
      {
        en: 'Store key phone numbers offline or on paper',
        es: 'Guarda números clave sin conexión o en papel'
      },
      {
        en: 'Review this guide with family or housemates',
        es: 'Revisa esta guía con tu familia o compañeros'
      }
    ]
  },
  {
    id: 'during',
    title: {
      en: 'If someone is detained',
      es: 'Si alguien es detenido'
    },
    items: [
      {
        en: 'Call a trusted hotline or immigration lawyer',
        es: 'Llama a una línea de ayuda o abogado de inmigración'
      },
      {
        en: 'Write down the person’s full name and A-number if known',
        es: 'Anota el nombre completo y número A si se conoce'
      },
      {
        en: 'Document the time, location, and agency involved',
        es: 'Documenta la hora, lugar y agencia involucrada'
      },
      {
        en: 'Do not share legal documents publicly',
        es: 'No compartas documentos legales públicamente'
      }
    ]
  },
  {
    id: 'after',
    title: {
      en: 'After an encounter',
      es: 'Después de un encuentro'
    },
    items: [
      {
        en: 'Follow up with legal counsel on next steps',
        es: 'Da seguimiento con asesoría legal sobre próximos pasos'
      },
      {
        en: 'Check in with family and update the plan',
        es: 'Comunícate con la familia y actualiza el plan'
      },
      {
        en: 'Save important documents in a safe place',
        es: 'Guarda documentos importantes en un lugar seguro'
      },
      {
        en: 'Review what worked and refine your preparedness plan',
        es: 'Revisa qué funcionó y mejora tu plan de preparación'
      }
    ]
  }
]

export function EmergencyPlan() {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'en' | 'es'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('immigration.emergencyPlanTitle')}</h2>
        <p className="text-muted-foreground">{t('immigration.emergencyPlanDescription')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {planSections.map((section) => (
          <div key={section.id} className="border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-3">{section.title[lang] || section.title.en}</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              {section.items.map((item, index) => (
                <li key={index}>{item[lang] || item.en}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
