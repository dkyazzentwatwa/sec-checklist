import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/core/db/schema'
import { useCallback } from 'react'
import { handleDBOperation, getErrorMessage } from '@/core/db/errorHandlers'
import { useToast } from '@/hooks/useToast'

export function useChecklistProgress(checklistId: string) {
  const toast = useToast()

  // Get progress from IndexedDB
  const progress = useLiveQuery(
    () => db.userProgress.get(checklistId),
    [checklistId]
  )

  // Toggle item completion
  const toggleItem = useCallback(async (itemId: string) => {
    const result = await handleDBOperation(async () => {
      const current = await db.userProgress.get(checklistId)
      const completedItems = current?.completedItems || []

      const isCompleted = completedItems.includes(itemId)
      const newCompletedItems = isCompleted
        ? completedItems.filter(id => id !== itemId)
        : [...completedItems, itemId]

      await db.userProgress.put({
        checklistId,
        completedItems: newCompletedItems,
        notes: current?.notes,
        timestamp: Date.now()
      })

      return newCompletedItems
    })

    if (!result.ok) {
      toast.error(getErrorMessage(result.error))
      throw result.error
    }

    return result.value
  }, [checklistId, toast])

  // Check if item is completed
  const isItemCompleted = useCallback((itemId: string) => {
    return progress?.completedItems?.includes(itemId) || false
  }, [progress])

  // Get completion percentage
  const getCompletionPercentage = useCallback((totalItems: number) => {
    if (!progress?.completedItems || totalItems === 0) return 0
    return Math.round((progress.completedItems.length / totalItems) * 100)
  }, [progress])

  // Update notes
  const updateNotes = useCallback(async (notes: string) => {
    const result = await handleDBOperation(async () => {
      const current = await db.userProgress.get(checklistId)
      await db.userProgress.put({
        checklistId,
        completedItems: current?.completedItems || [],
        notes,
        timestamp: Date.now()
      })
    })

    if (!result.ok) {
      toast.error(getErrorMessage(result.error))
      throw result.error
    }
  }, [checklistId, toast])

  // Reset progress
  const resetProgress = useCallback(async () => {
    const result = await handleDBOperation(async () => {
      await db.userProgress.delete(checklistId)
    })

    if (!result.ok) {
      toast.error(getErrorMessage(result.error))
      throw result.error
    }
  }, [checklistId, toast])

  return {
    progress,
    completedItems: progress?.completedItems || [],
    completedCount: progress?.completedItems?.length || 0,
    toggleItem,
    isItemCompleted,
    getCompletionPercentage,
    updateNotes,
    resetProgress
  }
}
