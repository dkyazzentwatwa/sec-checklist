import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Shield, Scale, Lock, Users, Brain, Eye } from 'lucide-react'
import { GlobalSearch } from '@/components/GlobalSearch'

export function Home() {
  const { t } = useTranslation()

  const quickActions = [
    {
      title: t('nav.immigration'),
      description: 'Know your rights during ICE encounters',
      icon: Scale,
      link: '/immigration',
      color: 'text-blue-500',
    },
    {
      title: t('nav.security'),
      description: 'Protect your digital privacy',
      icon: Lock,
      link: '/security',
      color: 'text-green-500',
    },
    {
      title: t('nav.activism'),
      description: 'Tools for organizing and action',
      icon: Users,
      link: '/activism',
      color: 'text-purple-500',
    },
    {
      title: t('nav.ai'),
      description: 'AI-powered rights assistant',
      icon: Brain,
      link: '/ai',
      color: 'text-pink-500',
    },
    {
      title: t('nav.aiDefense'),
      description: 'Defend against surveillance',
      icon: Eye,
      link: '/ai-defense',
      color: 'text-orange-500',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Shield className="h-24 w-24 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">{t('home.title')}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('home.tagline')}
        </p>
        <div className="mt-6 flex gap-4 justify-center text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Lock className="h-4 w-4" />
            Privacy-first
          </span>
          <span className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            Works offline
          </span>
          <span className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            Local AI
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t('home.quickActions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.link}
              to={action.link}
              className="block p-6 border border-border rounded-lg hover:border-primary hover:shadow-md transition-all"
            >
              <action.icon className={`h-8 w-8 mb-3 ${action.color}`} />
              <h3 className="font-bold mb-2">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="mb-12">
        <GlobalSearch />
      </div>

      {/* Info */}
      <div className="bg-muted/50 border border-border rounded-lg p-6 text-sm">
        <h3 className="font-bold mb-2">⚖️ Important Disclaimer</h3>
        <p className="text-muted-foreground">
          This platform provides educational information about your rights, not legal advice.
          For specific situations, always consult with a qualified immigration attorney.
        </p>
      </div>
    </div>
  )
}
