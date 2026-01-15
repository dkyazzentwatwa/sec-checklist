import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Printer } from 'lucide-react'
import cardsData from '../data/rights-cards.json'
import type { RightsCardTemplate } from '../types'

const [defaultCard] = cardsData.cards as RightsCardTemplate[]

export function RedCardGenerator() {
  const { i18n, t } = useTranslation()
  const lang = i18n.language === 'es' ? 'es' : 'en'
  const [customText, setCustomText] = useState('')

  const templateText = defaultCard?.content[lang] || ''
  const displayText = customText || templateText

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=800')
    if (!printWindow) return

    const content = displayText

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Know Your Rights Card</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20mm;
            max-width: 85mm;
            margin: 0 auto;
          }
          .card {
            border: 2px solid #000;
            padding: 10mm;
            background: white;
          }
          .card p {
            font-size: 11pt;
            line-height: 1.4;
            margin: 8pt 0;
          }
          .header {
            text-align: center;
            font-weight: bold;
            font-size: 14pt;
            margin-bottom: 10pt;
            color: #dc2626;
          }
          @media print {
            body { padding: 0; }
            @page { margin: 10mm; }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">KNOW YOUR RIGHTS / CONOZCA SUS DERECHOS</div>
          <p>${content.replace(/\n/g, '</p><p>')}</p>
        </div>
        <script>
          window.print();
          window.onafterprint = () => window.close();
        </script>
      </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">{t('immigration.redCardTitle')}</h3>
        <p className="text-sm text-muted-foreground">{t('immigration.redCardDescription')}</p>
      </div>

      <div className="border border-border rounded-lg p-4 bg-white">
        <div className="text-center font-bold text-red-600 mb-4">
          KNOW YOUR RIGHTS / CONOZCA SUS DERECHOS
        </div>
        <div className="whitespace-pre-wrap text-sm">{displayText}</div>
      </div>

      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium">
            {lang === 'es' ? 'Personalizar (opcional)' : 'Customize (optional)'}
          </span>
          <textarea
            className="w-full mt-1 p-3 border border-border rounded-lg"
            rows={8}
            value={customText}
            onChange={(event) => setCustomText(event.target.value)}
            placeholder={lang === 'es' ? 'Editar texto de la tarjeta...' : 'Edit card text...'}
          />
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Printer className="h-5 w-5" />
            {t('common.print')}
          </button>
        </div>
      </div>
    </div>
  )
}
