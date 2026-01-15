/**
 * AI State Store (Zustand)
 *
 * Manages global AI state including model status, conversations, and settings.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ModelId, ModelLoadProgress, ChatMessage } from '../services/webllm/engine'
import type { AssistantType } from '../services/webllm/prompts'

export interface Conversation {
  id: string
  type: AssistantType
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
  title?: string
}

interface AIState {
  // Model state
  modelStatus: 'idle' | 'downloading' | 'loading' | 'ready' | 'error'
  modelProgress: ModelLoadProgress | null
  currentModel: ModelId | null
  modelError: string | null

  // Conversation state
  conversations: Conversation[]
  activeConversationId: string | null

  // Settings
  preferredModel: ModelId
  autoLoadModel: boolean

  // Actions
  setModelStatus: (status: AIState['modelStatus']) => void
  setModelProgress: (progress: ModelLoadProgress | null) => void
  setCurrentModel: (model: ModelId | null) => void
  setModelError: (error: string | null) => void

  createConversation: (type: AssistantType) => string
  addMessage: (conversationId: string, message: ChatMessage) => void
  updateLastAssistantMessage: (conversationId: string, content: string) => void
  setActiveConversation: (id: string | null) => void
  deleteConversation: (id: string) => void
  clearAllConversations: () => void

  setPreferredModel: (model: ModelId) => void
  setAutoLoadModel: (autoLoad: boolean) => void

  reset: () => void
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

const initialState = {
  modelStatus: 'idle' as const,
  modelProgress: null,
  currentModel: null,
  modelError: null,
  conversations: [],
  activeConversationId: null,
  preferredModel: 'Llama-3.2-3B-Instruct-q4f16_1-MLC' as ModelId,
  autoLoadModel: false,
}

export const useAIStore = create<AIState>()(
  persist(
    (set) => ({
      ...initialState,

      // Model actions
      setModelStatus: (status) => set({ modelStatus: status }),
      setModelProgress: (progress) => set({ modelProgress: progress }),
      setCurrentModel: (model) => set({ currentModel: model }),
      setModelError: (error) => set({ modelError: error }),

      // Conversation actions
      createConversation: (type) => {
        const id = generateId()
        const conversation: Conversation = {
          id,
          type,
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }

        set((state) => ({
          conversations: [conversation, ...state.conversations],
          activeConversationId: id,
        }))

        return id
      },

      addMessage: (conversationId, message) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, message],
                  updatedAt: Date.now(),
                  // Auto-generate title from first user message
                  title: conv.title || (message.role === 'user'
                    ? message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '')
                    : conv.title),
                }
              : conv
          ),
        }))
      },

      updateLastAssistantMessage: (conversationId, content) => {
        set((state) => ({
          conversations: state.conversations.map((conv) => {
            if (conv.id !== conversationId) return conv

            const messages = [...conv.messages]
            const lastIndex = messages.length - 1

            if (lastIndex >= 0 && messages[lastIndex].role === 'assistant') {
              messages[lastIndex] = { ...messages[lastIndex], content }
            }

            return { ...conv, messages, updatedAt: Date.now() }
          }),
        }))
      },

      setActiveConversation: (id) => set({ activeConversationId: id }),

      deleteConversation: (id) => {
        set((state) => ({
          conversations: state.conversations.filter((c) => c.id !== id),
          activeConversationId:
            state.activeConversationId === id ? null : state.activeConversationId,
        }))
      },

      clearAllConversations: () => {
        set({ conversations: [], activeConversationId: null })
      },

      // Settings actions
      setPreferredModel: (model) => set({ preferredModel: model }),
      setAutoLoadModel: (autoLoad) => set({ autoLoadModel: autoLoad }),

      // Reset
      reset: () => set(initialState),
    }),
    {
      name: 'rights-shield-ai',
      // Only persist settings and conversations, not runtime state
      partialize: (state) => ({
        conversations: state.conversations,
        preferredModel: state.preferredModel,
        autoLoadModel: state.autoLoadModel,
      }),
    }
  )
)

// Selectors
export const selectIsModelReady = (state: AIState) => state.modelStatus === 'ready'
export const selectIsModelLoading = (state: AIState) =>
  state.modelStatus === 'downloading' || state.modelStatus === 'loading'
export const selectActiveConversation = (state: AIState) =>
  state.conversations.find((c) => c.id === state.activeConversationId)
