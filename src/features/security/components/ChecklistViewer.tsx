import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Circle, ChevronDown, ChevronUp, ExternalLink, Printer } from 'lucide-react'
import { useChecklistProgress } from '../hooks/useChecklistProgress'
import type { ChecklistContent, ChecklistItem } from '@/core/db/schema'

interface ChecklistViewerProps {
  checklistId: string
  content: ChecklistContent
}

export function ChecklistViewer({ checklistId, content }: ChecklistViewerProps) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'en' | 'es'
  const { completedCount, toggleItem, isItemCompleted, getCompletionPercentage } = useChecklistProgress(checklistId)

  const totalItems = content.items.length
  const percentage = getCompletionPercentage(totalItems)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {content.title[lang] || content.title.en}
            </h1>
            <p className="text-muted-foreground">
              {content.description[lang] || content.description.en}
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="no-print p-2 hover:bg-muted rounded-lg"
            title={t('common.print')}
            aria-label={t('common.print')}
          >
            <Printer className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 no-print">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            {completedCount} / {totalItems} completed
          </span>
          <span className="text-sm font-medium">{percentage}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {content.items.map((item) => (
          <ChecklistItemCard
            key={item.id}
            item={item}
            lang={lang}
            isCompleted={isItemCompleted(item.id)}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </div>

      {/* Harm Reduction Message */}
      <div className="mt-8 p-4 bg-muted/50 border border-border rounded-lg text-center no-print">
        <p className="text-sm italic text-muted-foreground">
          "Start where you are, do what you can. Perfect security doesn't exist -
          every step forward helps protect you and your community."
        </p>
      </div>
    </div>
  )
}

interface ChecklistItemCardProps {
  item: ChecklistItem
  lang: 'en' | 'es'
  isCompleted: boolean
  onToggle: () => void
}

function ChecklistItemCard({ item, lang, isCompleted, onToggle }: ChecklistItemCardProps) {
  const [expanded, setExpanded] = useState(false)

  const title = item.title[lang] || item.title.en
  const description = item.description[lang] || item.description.en

  const priorityColors = {
    essential: 'border-red-500/50 bg-red-500/5',
    recommended: 'border-yellow-500/50 bg-yellow-500/5',
    advanced: 'border-blue-500/50 bg-blue-500/5'
  }

  const priorityLabels = {
    essential: { en: 'Essential', es: 'Esencial' },
    recommended: { en: 'Recommended', es: 'Recomendado' },
    advanced: { en: 'Advanced', es: 'Avanzado' }
  }

  return (
    <div
      className={`border rounded-lg transition-all ${
        isCompleted ? 'border-green-500/50 bg-green-500/5' : priorityColors[item.priority]
      }`}
    >
      {/* Main row */}
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button
            onClick={onToggle}
            className="mt-0.5 flex-shrink-0 no-print"
            aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground hover:text-foreground" />
            )}
          </button>

          {/* Print checkbox */}
          <div className="hidden print:block mt-0.5 flex-shrink-0">
            <div className={`w-5 h-5 border-2 rounded ${isCompleted ? 'bg-black' : 'bg-white'}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                {title}
              </h3>
              <span className={`text-xs px-2 py-0.5 rounded-full no-print ${
                item.priority === 'essential' ? 'bg-red-500/20 text-red-700 dark:text-red-400' :
                item.priority === 'recommended' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
                'bg-blue-500/20 text-blue-700 dark:text-blue-400'
              }`}>
                {priorityLabels[item.priority][lang]}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>

            {/* Expand button */}
            {(item.steps || item.resources) && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-sm text-primary flex items-center gap-1 no-print"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    <span>Show less</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    <span>Show steps & resources</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-4 ml-10 space-y-4">
            {/* Steps */}
            {item.steps && item.steps.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">How to do this:</h4>
                <ol className="list-decimal list-inside space-y-1">
                  {item.steps.map((step, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {step[lang] || step.en}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Resources */}
            {item.resources && item.resources.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Helpful resources:</h4>
                <ul className="space-y-1">
                  {item.resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {resource.title[lang] || resource.title.en}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
