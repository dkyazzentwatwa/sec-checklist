import { useEffect } from 'react'
import { Shield, WifiOff, Download } from 'lucide-react'
import { useOnboarding } from '../hooks/useOnboarding'

const STEPS = [
  {
    title: 'Welcome to Rights Shield',
    description: 'Your privacy-first toolkit for immigration rights, digital security, and community defense.',
    icon: Shield,
  },
  {
    title: 'Works offline',
    description: 'Install the app as a PWA so key resources stay available without an internet connection.',
    icon: WifiOff,
  },
  {
    title: 'Export your data anytime',
    description: 'Download a local JSON backup from Settings. Nothing is sent to external servers.',
    icon: Download,
  },
]

export function OnboardingModal() {
  const { isOpen, step, totalSteps, next, previous, skip, close } = useOnboarding(STEPS.length)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, close])

  if (!isOpen) return null

  const activeStep = STEPS[step]
  const Icon = activeStep.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="w-full max-w-lg rounded-xl border border-border bg-background shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
      >
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h2 id="onboarding-title" className="text-xl font-semibold">
                {activeStep.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{activeStep.description}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={skip}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Skip
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <span
                  key={`dot-${index}`}
                  className={`h-2 w-2 rounded-full ${index === step ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={previous}
                disabled={step === 0}
                className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {step === totalSteps - 1 ? 'Get started' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
