import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { ensureSearchIndex, searchContent, type SearchResult } from '@/features/ai/services/transformers/search'

const typeLabels: Record<string, { en: string; es: string }> = {
  checklist: { en: 'Checklist', es: 'Lista' },
  scenario: { en: 'Scenario', es: 'Escenario' },
  activism: { en: 'Activism', es: 'Activismo' },
  'ai-defense': { en: 'AI Defense', es: 'Defensa IA' },
}

export function GlobalSearch() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'es' ? 'es' : 'en'
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isIndexing, setIsIndexing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return

    setError(null)
    setIsSearching(true)

    try {
      setIsIndexing(true)
      await ensureSearchIndex()
      setIsIndexing(false)
      const data = await searchContent(query)
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setIsSearching(false)
      setIsIndexing(false)
    }
  }

  return (
    <section className="border border-border rounded-lg p-6 bg-background">
      <div className="flex items-center gap-3 mb-4">
        <Search className="h-5 w-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">{t('search.title')}</h2>
          <p className="text-sm text-muted-foreground">{t('search.description')}</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('search.placeholder')}
          className="flex-1 rounded-lg border border-border px-4 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={isSearching}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
        >
          <Search className="h-4 w-4" />
          {isSearching ? t('search.searching') : t('search.button')}
        </button>
      </form>

      <div className="mt-3 text-xs text-muted-foreground">{t('search.note')}</div>

      {isIndexing && (
        <p className="mt-4 text-sm text-muted-foreground">{t('search.indexing')}</p>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-500">{error}</p>
      )}

      {results.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold">{t('search.results')}</h3>
          <div className="space-y-2">
            {results.map((result) => (
              <Link
                key={result.id}
                to={result.path}
                className="block border border-border rounded-lg p-3 hover:border-primary/60 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-sm">{result.title}</h4>
                  <span className="text-xs text-muted-foreground">
                    {typeLabels[result.type]?.[lang] || result.type}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{result.snippet}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {results.length === 0 && query.trim() !== '' && !isSearching && !error && (
        <p className="mt-4 text-sm text-muted-foreground">{t('search.noResults')}</p>
      )}
    </section>
  )
}
