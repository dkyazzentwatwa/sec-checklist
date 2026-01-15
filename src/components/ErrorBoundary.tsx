import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console in development for debugging
    if (import.meta.env.DEV) {
      console.error('Error caught by ErrorBoundary:', error, errorInfo)
    }

    // In production, you could send this to an error tracking service
    // For privacy-first app, we only log to console in dev mode
  }

  handleRefresh = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      const isDev = import.meta.env.DEV

      // Development mode: Show full error details
      if (isDev) {
        return (
          <div className="min-h-screen flex items-center justify-center p-4 bg-red-50 dark:bg-red-950">
            <div className="max-w-2xl w-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  <h1 className="text-2xl font-bold text-red-600">
                    Development Error
                  </h1>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  This error display is only shown in development mode. In production,
                  users will see a generic error message.
                </p>
                <div className="bg-red-50 dark:bg-red-950 rounded p-4 mb-4">
                  <p className="font-mono text-sm text-red-900 dark:text-red-100 whitespace-pre-wrap break-words">
                    {this.state.error?.message}
                  </p>
                </div>
                {this.state.error?.stack && (
                  <details className="mb-4">
                    <summary className="cursor-pointer font-semibold text-sm mb-2">
                      Stack Trace
                    </summary>
                    <pre className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-xs overflow-x-auto">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
                <button
                  onClick={this.handleRefresh}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        )
      }

      // Production mode: Show generic error message (no sensitive details)
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <div className="max-w-md w-full text-center">
            <div className="bg-card rounded-lg shadow-lg p-8">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-16 w-16 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
              <p className="text-muted-foreground mb-6">
                We're sorry for the inconvenience. Please try refreshing the page.
                If the problem persists, your data is safe and stored locally on your device.
              </p>
              <button
                onClick={this.handleRefresh}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                Refresh Page
              </button>
              <p className="text-xs text-muted-foreground mt-4">
                Your privacy is protected. No error data is sent to external servers.
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
