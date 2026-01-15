import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { LanguageSwitcher } from '@/features/common/LanguageSwitcher'
import { ThemeToggle } from '@/components/ThemeToggle'

interface MobileNavProps {
  onClose: () => void
}

export function MobileNav({ onClose }: MobileNavProps) {
  const { t } = useTranslation()

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-background text-foreground">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-8">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={onClose} aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col space-y-4">
          <Link
            to="/"
            onClick={onClose}
            className="text-lg font-medium py-2 hover:text-primary"
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/immigration"
            onClick={onClose}
            className="text-lg font-medium py-2 hover:text-primary"
          >
            {t('nav.immigration')}
          </Link>
          <Link
            to="/security"
            onClick={onClose}
            className="text-lg font-medium py-2 hover:text-primary"
          >
            {t('nav.security')}
          </Link>
          <Link
            to="/activism"
            onClick={onClose}
            className="text-lg font-medium py-2 hover:text-primary"
          >
            {t('nav.activism')}
          </Link>
          <Link
            to="/ai"
            onClick={onClose}
            className="text-lg font-medium py-2 hover:text-primary"
          >
            {t('nav.ai')}
          </Link>
          <Link
            to="/ai-defense"
            onClick={onClose}
            className="text-lg font-medium py-2 hover:text-primary"
          >
            {t('nav.aiDefense')}
          </Link>
          <Link
            to="/about"
            onClick={onClose}
            className="text-lg font-medium py-2 hover:text-primary"
          >
            {t('nav.about')}
          </Link>

          <div className="pt-4 border-t border-border">
            <LanguageSwitcher />
          </div>
          <div className="pt-4 border-t border-border">
            <ThemeToggle label="Theme" />
          </div>
        </nav>
      </div>
    </div>
  )
}
