import { useEffect } from 'react'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useToastStore, type Toast as ToastType } from '@/hooks/useToast'

const toastStyles = {
  success: {
    container: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    text: 'text-green-900 dark:text-green-100'
  },
  error: {
    container: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    text: 'text-red-900 dark:text-red-100'
  },
  warning: {
    container: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800',
    icon: 'text-yellow-600 dark:text-yellow-400',
    text: 'text-yellow-900 dark:text-yellow-100'
  },
  info: {
    container: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    text: 'text-blue-900 dark:text-blue-100'
  }
}

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
}

function ToastItem({ toast }: { toast: ToastType }) {
  const removeToast = useToastStore((state) => state.removeToast)
  const styles = toastStyles[toast.type]
  const Icon = icons[toast.type]

  useEffect(() => {
    // Ensure toast is removed after duration
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        removeToast(toast.id)
      }, toast.duration)

      return () => clearTimeout(timer)
    }
  }, [toast.id, toast.duration, removeToast])

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg transition-all duration-300 ease-out animate-in slide-in-from-top-5 ${styles.container}`}
      role="alert"
      aria-live="polite"
    >
      <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${styles.icon}`} aria-hidden="true" />

      <p className={`flex-1 text-sm font-medium ${styles.text}`}>
        {toast.message}
      </p>

      <button
        onClick={() => removeToast(toast.id)}
        className={`flex-shrink-0 rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${styles.icon}`}
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts)

  if (toasts.length === 0) {
    return null
  }

  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} />
        </div>
      ))}
    </div>
  )
}
