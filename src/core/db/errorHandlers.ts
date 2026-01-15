/**
 * Database Error Handling Utilities
 *
 * Provides type-safe error handling for IndexedDB operations,
 * with special handling for quota exceeded errors.
 */

export type DBErrorType =
  | 'QUOTA_EXCEEDED'
  | 'NOT_FOUND'
  | 'CONSTRAINT_ERROR'
  | 'TRANSACTION_ERROR'
  | 'UNKNOWN_ERROR'

export interface DBError {
  type: DBErrorType
  message: string
  originalError?: Error
}

export type Result<T, E = DBError> =
  | { ok: true; value: T }
  | { ok: false; error: E }

/**
 * Categorizes database errors into specific types for better handling
 */
function categorizeError(error: unknown): DBError {
  if (!(error instanceof Error)) {
    return {
      type: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred'
    }
  }

  const errorName = error.name
  const errorMessage = error.message.toLowerCase()

  // Quota exceeded - most critical for this app (AI models are large)
  if (errorName === 'QuotaExceededError' || errorMessage.includes('quota')) {
    return {
      type: 'QUOTA_EXCEEDED',
      message: 'Storage quota exceeded. Please free up space by deleting old data or AI models.',
      originalError: error
    }
  }

  // Not found errors
  if (errorName === 'NotFoundError' || errorMessage.includes('not found')) {
    return {
      type: 'NOT_FOUND',
      message: 'The requested data was not found.',
      originalError: error
    }
  }

  // Constraint violations
  if (errorName === 'ConstraintError' || errorMessage.includes('constraint')) {
    return {
      type: 'CONSTRAINT_ERROR',
      message: 'A database constraint was violated.',
      originalError: error
    }
  }

  // Transaction errors
  if (errorName === 'TransactionInactiveError' || errorMessage.includes('transaction')) {
    return {
      type: 'TRANSACTION_ERROR',
      message: 'Database transaction failed.',
      originalError: error
    }
  }

  // Default unknown error
  return {
    type: 'UNKNOWN_ERROR',
    message: error.message || 'An unknown database error occurred',
    originalError: error
  }
}

/**
 * Wraps a database operation with error handling
 *
 * @example
 * ```typescript
 * const result = await handleDBOperation(async () => {
 *   return await db.userProgress.put({ ... })
 * })
 *
 * if (!result.ok) {
 *   if (result.error.type === 'QUOTA_EXCEEDED') {
 *     // Show UI to free up space
 *   }
 * }
 * ```
 */
export async function handleDBOperation<T>(
  operation: () => Promise<T>
): Promise<Result<T>> {
  try {
    const value = await operation()
    return { ok: true, value }
  } catch (error) {
    const dbError = categorizeError(error)

    // Log in development for debugging
    if (import.meta.env.DEV) {
      console.error('Database operation failed:', dbError)
    }

    return { ok: false, error: dbError }
  }
}

/**
 * Gets user-friendly error message for display in UI
 */
export function getErrorMessage(error: DBError): string {
  switch (error.type) {
    case 'QUOTA_EXCEEDED':
      return 'Storage is full. Please delete old conversations or AI models to free up space.'
    case 'NOT_FOUND':
      return 'The requested data could not be found.'
    case 'CONSTRAINT_ERROR':
      return 'This operation conflicts with existing data.'
    case 'TRANSACTION_ERROR':
      return 'Database operation failed. Please try again.'
    case 'UNKNOWN_ERROR':
    default:
      return error.message || 'An unexpected error occurred. Please try again.'
  }
}

/**
 * Estimates storage usage and quota
 * Returns null if StorageManager API is not available
 */
export async function getStorageInfo(): Promise<{
  usage: number
  quota: number
  percentUsed: number
} | null> {
  if (!navigator.storage || !navigator.storage.estimate) {
    return null
  }

  try {
    const estimate = await navigator.storage.estimate()
    const usage = estimate.usage || 0
    const quota = estimate.quota || 0
    const percentUsed = quota > 0 ? (usage / quota) * 100 : 0

    return { usage, quota, percentUsed }
  } catch (error) {
    console.error('Failed to get storage info:', error)
    return null
  }
}

/**
 * Formats bytes to human-readable string
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`
}
