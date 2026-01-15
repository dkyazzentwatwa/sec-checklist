/**
 * Model Manager Component
 *
 * Allows users to view downloaded AI models, see storage usage,
 * and delete models to free up space.
 */

import { useState, useEffect } from 'react'
import {
  HardDrive,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Database,
} from 'lucide-react'
import { AVAILABLE_MODELS, type ModelId } from '../services/webllm/engine'
import { cn } from '@/utils/cn'

interface CachedModel {
  id: string
  name: string
  size: number
  cacheKeys: string[]
}

interface StorageInfo {
  used: number
  quota: number
  models: CachedModel[]
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

async function getStorageInfo(): Promise<StorageInfo> {
  const models: CachedModel[] = []
  let totalUsed = 0

  try {
    // Get storage estimate
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate()
      totalUsed = estimate.usage || 0
    }

    // Get all cache names
    const cacheNames = await caches.keys()

    // Find WebLLM caches
    for (const cacheName of cacheNames) {
      if (cacheName.includes('webllm') || cacheName.includes('mlc')) {
        const cache = await caches.open(cacheName)
        const keys = await cache.keys()

        let cacheSize = 0
        for (const request of keys) {
          try {
            const response = await cache.match(request)
            if (response) {
              const blob = await response.clone().blob()
              cacheSize += blob.size
            }
          } catch {
            // Skip if can't read size
          }
        }

        if (keys.length > 0) {
          // Try to identify which model this cache belongs to
          const modelId = identifyModel(cacheName, keys.map(k => k.url))

          models.push({
            id: cacheName,
            name: modelId ? AVAILABLE_MODELS[modelId as ModelId]?.name || modelId : cacheName,
            size: cacheSize,
            cacheKeys: keys.map(k => k.url),
          })
        }
      }
    }

    // Also check for model weights in IndexedDB
    // WebLLM may store some data there
    const quota = (await navigator.storage?.estimate())?.quota || 0

    return {
      used: totalUsed,
      quota,
      models,
    }
  } catch (error) {
    console.error('Failed to get storage info:', error)
    return { used: 0, quota: 0, models: [] }
  }
}

function identifyModel(cacheName: string, urls: string[]): string | null {
  // Try to identify model from cache name or URLs
  const modelPatterns = Object.keys(AVAILABLE_MODELS)

  for (const pattern of modelPatterns) {
    const shortName = pattern.replace('-MLC', '').toLowerCase()
    if (cacheName.toLowerCase().includes(shortName)) {
      return pattern
    }
    for (const url of urls) {
      if (url.toLowerCase().includes(shortName)) {
        return pattern
      }
    }
  }

  return null
}

async function deleteModelCache(cacheId: string): Promise<boolean> {
  try {
    const deleted = await caches.delete(cacheId)
    return deleted
  } catch (error) {
    console.error('Failed to delete cache:', error)
    return false
  }
}

async function clearAllModelCaches(): Promise<number> {
  let deletedCount = 0
  try {
    const cacheNames = await caches.keys()
    for (const cacheName of cacheNames) {
      if (cacheName.includes('webllm') || cacheName.includes('mlc')) {
        const deleted = await caches.delete(cacheName)
        if (deleted) deletedCount++
      }
    }
  } catch (error) {
    console.error('Failed to clear caches:', error)
  }
  return deletedCount
}

export function ModelManager() {
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const loadStorageInfo = async () => {
    setLoading(true)
    setError(null)
    try {
      const info = await getStorageInfo()
      setStorageInfo(info)
    } catch (err) {
      setError('Failed to load storage information')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStorageInfo()
  }, [])

  const handleDeleteModel = async (cacheId: string, modelName: string) => {
    setDeleting(cacheId)
    setError(null)
    setSuccess(null)

    try {
      const deleted = await deleteModelCache(cacheId)
      if (deleted) {
        setSuccess(`Deleted ${modelName}`)
        await loadStorageInfo()
      } else {
        setError(`Failed to delete ${modelName}`)
      }
    } catch {
      setError(`Failed to delete ${modelName}`)
    } finally {
      setDeleting(null)
    }
  }

  const handleClearAll = async () => {
    if (!confirm('Delete all downloaded AI models? You will need to re-download them to use AI features.')) {
      return
    }

    setDeleting('all')
    setError(null)
    setSuccess(null)

    try {
      const count = await clearAllModelCaches()
      setSuccess(`Cleared ${count} model cache(s)`)
      await loadStorageInfo()
    } catch {
      setError('Failed to clear model caches')
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="text-muted-foreground">Loading storage info...</span>
        </div>
      </div>
    )
  }

  const usedPercent = storageInfo?.quota
    ? Math.round((storageInfo.used / storageInfo.quota) * 100)
    : 0

  return (
    <div className="border border-border rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Database className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold">Downloaded AI Models</h3>
            <p className="text-sm text-muted-foreground">
              Manage cached models to free up storage
            </p>
          </div>
        </div>
        <button
          onClick={loadStorageInfo}
          disabled={loading}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          title="Refresh"
          aria-label="Refresh storage info"
        >
          <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
        </button>
      </div>

      {/* Storage Usage */}
      {storageInfo && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-muted-foreground" />
              <span>Storage Used</span>
            </span>
            <span className="font-medium">
              {formatBytes(storageInfo.used)} / {formatBytes(storageInfo.quota)}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full transition-all',
                usedPercent > 90 ? 'bg-red-500' : usedPercent > 70 ? 'bg-yellow-500' : 'bg-green-500'
              )}
              style={{ width: `${Math.min(usedPercent, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Success/Error Messages */}
      {success && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle2 className="h-4 w-4" />
          <span>{success}</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Model List */}
      {storageInfo && storageInfo.models.length > 0 ? (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Cached Models</h4>
          <div className="space-y-2">
            {storageInfo.models.map((model) => (
              <div
                key={model.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">{model.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(model.size)} • {model.cacheKeys.length} files
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteModel(model.id, model.name)}
                  disabled={deleting !== null}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-destructive border border-border rounded-md hover:border-destructive/50 transition-colors disabled:opacity-50"
                >
                  {deleting === model.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  <span>Delete</span>
                </button>
              </div>
            ))}
          </div>

          {/* Clear All Button */}
          {storageInfo.models.length > 1 && (
            <button
              onClick={handleClearAll}
              disabled={deleting !== null}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-destructive border border-destructive/30 rounded-lg hover:bg-destructive/10 transition-colors disabled:opacity-50"
            >
              {deleting === 'all' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              <span>Clear All Models</span>
            </button>
          )}
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          <Database className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No AI models downloaded yet</p>
          <p className="text-sm mt-1">
            Download a model from the AI Assistant page to use AI features
          </p>
        </div>
      )}

      {/* Info */}
      <div className="text-xs text-muted-foreground border-t border-border pt-4">
        <p>
          Models are stored in your browser's cache. Deleting them will require
          re-downloading (~2GB) to use AI features again.
        </p>
      </div>
    </div>
  )
}
