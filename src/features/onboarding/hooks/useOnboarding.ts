import { useEffect, useState } from 'react'

const ONBOARDING_STORAGE_KEY = 'rights-shield:onboarding:v1'

/**
 * Manage first-time onboarding modal state with localStorage persistence.
 */
export function useOnboarding(totalSteps: number) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hasCompleted = localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true'
    if (!hasCompleted) {
      setIsOpen(true)
    }
  }, [])

  const close = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true')
    }
    setIsOpen(false)
  }

  const next = () => {
    setStep((current) => {
      if (current >= totalSteps - 1) {
        close()
        return current
      }
      return current + 1
    })
  }

  const previous = () => setStep((current) => Math.max(0, current - 1))

  return {
    isOpen,
    step,
    totalSteps,
    next,
    previous,
    skip: close,
    close,
  }
}
