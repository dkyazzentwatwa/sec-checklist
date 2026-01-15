import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Shield, Menu } from 'lucide-react'
import { useState } from 'react'
import { MobileNav } from './MobileNav'
import { LanguageSwitcher } from '@/features/common/LanguageSwitcher'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Header() {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6" />
            <span className="font-bold text-lg">Rights Shield</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/immigration" className="text-sm font-medium hover:text-primary">
              {t('nav.immigration')}
            </Link>
            <Link to="/security" className="text-sm font-medium hover:text-primary">
              {t('nav.security')}
            </Link>
            <Link to="/activism" className="text-sm font-medium hover:text-primary">
              {t('nav.activism')}
            </Link>
            <Link to="/ai" className="text-sm font-medium hover:text-primary">
              {t('nav.ai')}
            </Link>
            <Link to="/ai-defense" className="text-sm font-medium hover:text-primary">
              {t('nav.aiDefense')}
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary">
              {t('nav.about')}
            </Link>
            <ThemeToggle compact label="Theme" />
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <MobileNav onClose={() => setMobileMenuOpen(false)} />
      )}
    </header>
  )
}
