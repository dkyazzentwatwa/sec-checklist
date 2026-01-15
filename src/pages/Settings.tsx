import { DataExport } from '@/features/settings/components/DataExport'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ReadingPreferences } from '@/components/ReadingPreferences'
import { useAIStore } from '@/features/ai/stores/aiStore'
import { safeConfirm, safePrompt } from '@/utils/userInput'
import { useToast } from '@/hooks/useToast'

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

export function Settings() {
  const toast = useToast()
  const promptTemplates = useAIStore((s) => s.promptTemplates)
  const addPromptTemplate = useAIStore((s) => s.addPromptTemplate)
  const updatePromptTemplate = useAIStore((s) => s.updatePromptTemplate)
  const deletePromptTemplate = useAIStore((s) => s.deletePromptTemplate)

  const handleAddTemplate = () => {
    const title = safePrompt('Template title', '', { maxLength: 100 })
    if (!title || !title.trim()) return
    const content = safePrompt('Template content', '', { maxLength: 1000 })
    if (!content || !content.trim()) return

    addPromptTemplate({
      id: generateId(),
      title: title.trim(),
      content: content.trim(),
    })
    toast.success('Template added')
  }

  const handleEditTemplate = (templateId: string, currentTitle: string, currentContent: string) => {
    const title = safePrompt('Edit title', currentTitle, { maxLength: 100 })
    if (title === null) return
    const content = safePrompt('Edit content', currentContent, { maxLength: 1000 })
    if (content === null) return

    updatePromptTemplate(templateId, {
      title: title.trim() || currentTitle,
      content: content.trim() || currentContent,
    })
    toast.success('Template updated')
  }

  const handleDeleteTemplate = (templateId: string) => {
    if (!safeConfirm('Delete this template?')) return
    deletePromptTemplate(templateId)
    toast.success('Template deleted')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage local data and privacy-focused preferences.
        </p>
      </header>

      <DataExport />

      <section className="border border-border rounded-lg p-6 bg-background">
        <h2 className="text-lg font-semibold">Theme</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose a visual theme designed for readability and accessibility.
        </p>
        <div className="mt-4 max-w-sm">
          <ThemeToggle />
        </div>
      </section>

      <ReadingPreferences />

      <section className="border border-border rounded-lg p-6 bg-background space-y-4">
        <div>
          <h2 className="text-lg font-semibold">AI prompt templates</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Save common prompts for quick access in the AI chat.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddTemplate}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-border hover:bg-muted transition-colors"
          >
            Add template
          </button>
        </div>
        {promptTemplates.length === 0 ? (
          <p className="text-sm text-muted-foreground">No templates saved yet.</p>
        ) : (
          <div className="space-y-3">
            {promptTemplates.map((template) => (
              <div
                key={template.id}
                className="border border-border rounded-lg p-4 bg-muted/20 space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{template.title}</p>
                    <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                      {template.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditTemplate(template.id, template.title, template.content)}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="text-xs text-destructive hover:text-destructive/80"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="border border-border rounded-lg p-6 bg-muted/30">
        <h2 className="text-lg font-semibold">Privacy reminders</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
          <li>Your data is stored locally on your device and never uploaded.</li>
          <li>Clearing browser storage will remove saved progress and conversations.</li>
          <li>Export files are unencrypted; store them securely.</li>
        </ul>
      </section>
    </div>
  )
}
