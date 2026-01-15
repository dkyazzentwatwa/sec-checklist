import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Bot,
  User,
  RotateCcw,
  Sparkles,
  Minimize2,
  Maximize2
} from 'lucide-react'
import { useWebLLM } from '../hooks/useWebLLM'
import { useAIStore, selectActiveConversation } from '../stores/aiStore'
import { ModelDownloader } from './ModelDownloader'
import { cn } from '@/utils/cn'

export function ChatWidget() {
  const { i18n } = useTranslation()
  const lang = (i18n.language === 'es' ? 'es' : 'en') as 'en' | 'es'
  
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Use 'rights' assistant as default for the global widget
  const {
    isModelReady,
    isGenerating,
    sendMessage,
    resetChat,
  } = useWebLLM({ assistantType: 'rights' })

  const activeConversation = useAIStore(selectActiveConversation)
  const createConversation = useAIStore((s) => s.createConversation)
  const messages = activeConversation?.messages || []

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isGenerating])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && isModelReady) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isModelReady])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating || !isModelReady) return

    const message = input.trim()
    setInput('')

    try {
      // Ensure we have a conversation context
      if (!activeConversation) {
        createConversation('rights')
      }
      await sendMessage(message)
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleNewConversation = () => {
    createConversation('rights')
    resetChat()
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-105 z-50 flex items-center justify-center"
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="h-7 w-7" />
      </button>
    )
  }

  return (
    <div 
      className={cn(
        "fixed bottom-6 right-6 bg-background border border-border rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-200 overflow-hidden",
        isExpanded 
          ? "w-[90vw] h-[80vh] max-w-4xl" 
          : "w-[350px] h-[500px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-6rem)]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h3 className="font-semibold">AI Assistant</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 hover:bg-primary-foreground/10 rounded transition-colors"
            title={isExpanded ? "Minimize" : "Expand"}
            aria-label={isExpanded ? 'Minimize chat' : 'Expand chat'}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-primary-foreground/10 rounded transition-colors"
            title="Close"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!isModelReady ? (
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
          <Sparkles className="h-12 w-12 text-primary/50 mb-4" />
          <h4 className="font-medium mb-2">Enable AI Assistant</h4>
          <p className="text-sm text-muted-foreground mb-6">
            Download the local AI model to chat privately. No data leaves your device.
          </p>
          <ModelDownloader compact onModelReady={() => {}} />
        </div>
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-4">
                <Bot className="h-10 w-10 mb-3 opacity-20" />
                <p className="text-sm">
                  {lang === 'es'
                    ? '¿En qué puedo ayudarte hoy?'
                    : 'How can I help you today?'}
                </p>
              </div>
            ) : (
              messages.filter(m => m.role !== 'system').map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex gap-2 max-w-[85%]',
                    message.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1",
                    message.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}>
                    {message.role === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                  </div>
                  
                  <div className={cn(
                    "rounded-lg px-3 py-2 text-sm",
                    message.role === 'user' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-foreground"
                  )}>
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-0 prose-headings:my-1 prose-ul:my-0 prose-li:my-0">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </div>
              ))
            )}
            
            {isGenerating && (
              <div className="flex gap-2 mr-auto max-w-[85%]">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center mt-1">
                  <Bot className="h-3 w-3" />
                </div>
                <div className="bg-muted rounded-lg px-3 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-border bg-background">
            {messages.length > 0 && (
              <div className="flex justify-center mb-2">
                <button
                  onClick={handleNewConversation}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted"
                >
                  <RotateCcw className="h-3 w-3" />
                  New Chat
                </button>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={lang === 'es' ? 'Mensaje...' : 'Message...'}
                disabled={isGenerating}
                rows={1}
                className="w-full pl-4 pr-10 py-2.5 text-sm border border-border rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 bg-muted/30"
                style={{ minHeight: '40px', maxHeight: '100px' }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isGenerating}
                className="absolute right-1.5 top-1.5 p-1.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
