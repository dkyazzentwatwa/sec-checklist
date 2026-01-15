import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { OfflineIndicator } from './OfflineIndicator'
import { ChatWidget } from '@/features/ai/components/ChatWidget'
import { ToastContainer } from '@/components/Toast'
import { OnboardingModal } from '@/features/onboarding/components/OnboardingModal'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <OfflineIndicator />
      <OnboardingModal />
      <main id="main-content" className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
      <ToastContainer />
    </div>
  )
}
