/**
 * Chat Interface Component
 *
 * Main conversational UI for the AI assistants.
 * Supports streaming responses, markdown rendering, and copy functionality.
 */

import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import {
  Send,
  Loader2,
  User,
  Bot,
  Sparkles,
  RotateCcw,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react'
import { useWebLLM } from '../hooks/useWebLLM'
import { useAIStore, selectActiveConversation } from '../stores/aiStore'
import { CONVERSATION_STARTERS, type AssistantType } from '../services/webllm/prompts'
import { ModelDownloader } from './ModelDownloader'
import { cn } from '@/utils/cn'

interface ChatInterfaceProps {
  assistantType: AssistantType
  title?: string
  description?: string
  context?: string
}

// Copy button component
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-all"
      title="Copy message"
      aria-label="Copy message"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-muted-foreground" />
      )}
    </button>
  )
}

export function ChatInterface({
  assistantType,
  title,
  description,
  context,
}: ChatInterfaceProps) {
  const { i18n } = useTranslation()
  const lang = (i18n.language === 'es' ? 'es' : 'en') as 'en' | 'es'

  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const {
    isModelReady,
    isGenerating,
    generationError,
    sendMessage,
    resetChat,
  } = useWebLLM({ assistantType, context })

  const activeConversation = useAIStore(selectActiveConversation)
  const createConversation = useAIStore((s) => s.createConversation)

  const messages = activeConversation?.messages || []
  const starters = CONVERSATION_STARTERS[assistantType]?.[lang] || []

  // Focus input when model is ready
  useEffect(() => {
    if (isModelReady) {
      inputRef.current?.focus()
    }
  }, [isModelReady])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating || !isModelReady) return

    const message = input.trim()
    setInput('')

    try {
      await sendMessage(message)
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const handleStarterClick = async (starter: string) => {
    if (isGenerating || !isModelReady) return

    try {
      await sendMessage(starter)
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const handleNewConversation = () => {
    createConversation(assistantType)
    resetChat()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Model not loaded
  if (!isModelReady) {
    return (
      <div className="space-y-6">
        {title && (
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        )}
        <ModelDownloader />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] border border-border rounded-lg overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{title || 'AI Assistant'}</h3>
            <p className="text-xs text-muted-foreground">
              {isGenerating ? 'Thinking...' : 'Ready to help'}
            </p>
          </div>
        </div>
        <button
          onClick={handleNewConversation}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-muted transition-colors"
          title="New conversation"
        >
          <RotateCcw className="h-4 w-4" />
          New
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.length === 0 ? (
          // Empty state with starters
          <div className="h-full flex flex-col items-center justify-center text-center">
            <Sparkles className="h-12 w-12 text-primary/50 mb-4" />
            <h4 className="text-lg font-medium mb-2">
              {lang === 'es' ? '¿Cómo puedo ayudarte?' : 'How can I help you?'}
            </h4>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              {lang === 'es'
                ? 'Pregúntame sobre tus derechos, seguridad digital, o pídeme crear documentos.'
                : 'Ask me about your rights, digital security, or have me create documents for you.'}
            </p>

            {/* Suggested prompts */}
            <div className="flex flex-wrap justify-center gap-2 max-w-lg">
              {starters.slice(0, 4).map((starter, i) => (
                <button
                  key={i}
                  onClick={() => handleStarterClick(starter)}
                  className="px-3 py-2 text-sm border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
                >
                  {starter}
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Message list
          messages.filter(m => m.role !== 'system').map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex gap-3 group',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}

              <div
                className={cn(
                  'max-w-[80%] rounded-lg px-4 py-2 relative',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {message.role === 'assistant' && message.content === '' && isGenerating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                ) : (
                  <div className="relative">
                    {message.role === 'assistant' ? (
                      // Render markdown for assistant messages
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      // Plain text for user messages
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}

                    {/* Copy button */}
                    {message.content && (
                      <div className="absolute -right-2 -top-2">
                        <CopyButton text={message.content} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))
        )}

        {/* Error message */}
        {generationError && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{generationError}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-border p-4 bg-muted/30"
      >
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={lang === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
            disabled={isGenerating}
            rows={1}
            className="flex-1 px-4 py-2 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background disabled:opacity-50"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            {isGenerating ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-2 text-center">
          {lang === 'es'
            ? 'Toda la conversación se procesa localmente. Tus datos nunca salen de tu dispositivo.'
            : 'All conversation is processed locally. Your data never leaves your device.'}
        </p>
      </form>
    </div>
  )
}
