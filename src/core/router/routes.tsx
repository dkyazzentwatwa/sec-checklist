import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'

const Home = lazy(() => import('@/pages/Home').then((module) => ({ default: module.Home })))
const ImmigrationIndex = lazy(() =>
  import('@/pages/Immigration/Index').then((module) => ({ default: module.ImmigrationIndex }))
)
const SecurityIndex = lazy(() =>
  import('@/pages/Security/Index').then((module) => ({ default: module.SecurityIndex }))
)
const SecurityChecklist = lazy(() =>
  import('@/pages/Security/Checklist').then((module) => ({ default: module.SecurityChecklist }))
)
const SecurityAdvisor = lazy(() =>
  import('@/pages/Security/Advisor').then((module) => ({ default: module.default }))
)
const ActivismIndex = lazy(() =>
  import('@/pages/Activism/Index').then((module) => ({ default: module.ActivismIndex }))
)
const AIIndex = lazy(() => import('@/pages/AI/Index').then((module) => ({ default: module.AIIndex })))
const AIDefenseIndex = lazy(() =>
  import('@/pages/AIDefense/Index').then((module) => ({ default: module.AIDefenseIndex }))
)
const About = lazy(() => import('@/pages/About').then((module) => ({ default: module.About })))
const Privacy = lazy(() => import('@/pages/Privacy').then((module) => ({ default: module.Privacy })))
const Settings = lazy(() => import('@/pages/Settings').then((module) => ({ default: module.Settings })))
const Help = lazy(() => import('@/pages/Help').then((module) => ({ default: module.Help })))

function LoadingFallback() {
  const { t } = useTranslation()
  return (
    <div className="flex items-center justify-center py-20 text-muted-foreground">
      {t('common.loading')}
    </div>
  )
}

export function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Immigration Rights */}
          <Route path="immigration" element={<ImmigrationIndex />} />
          <Route path="immigration/emergency" element={<ImmigrationIndex />} />

          {/* Digital Security */}
          <Route path="security" element={<SecurityIndex />} />
          <Route path="security/:checklistId" element={<SecurityChecklist />} />
          <Route path="security/advisor" element={<SecurityAdvisor />} />

          {/* Activism Tools */}
          <Route path="activism" element={<ActivismIndex />} />

          {/* AI Assistant */}
          <Route path="ai" element={<AIIndex />} />

          {/* AI Defense */}
          <Route path="ai-defense" element={<AIDefenseIndex />} />

          {/* Meta pages */}
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
