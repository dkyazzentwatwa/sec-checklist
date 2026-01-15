import { useTranslation } from 'react-i18next'
import hotlinesData from '../data/hotlines.json'
import type { HotlineData } from '../types'

const data = hotlinesData as HotlineData

function formatPhoneLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function HotlinesList() {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'en' | 'es'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('immigration.hotlinesTitle')}</h2>
        <p className="text-muted-foreground">{t('immigration.hotlinesDescription')}</p>
      </div>

      <div className="space-y-6">
        <section className="border border-border rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-3">{t('immigration.nationalHotlines')}</h3>
          <div className="space-y-3">
            {data.national.map((hotline) => (
              <div key={hotline.id} className="border border-border rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h4 className="font-semibold">{hotline.name[lang] || hotline.name.en}</h4>
                    {hotline.description && (
                      <p className="text-sm text-muted-foreground">
                        {hotline.description[lang] || hotline.description.en}
                      </p>
                    )}
                  </div>
                  <a
                    href={formatPhoneLink(hotline.phone)}
                    className="text-primary font-semibold"
                  >
                    {hotline.phone}
                  </a>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {hotline.hours[lang] || hotline.hours.en} · {hotline.languages.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-border rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-3">{t('immigration.regionalHotlines')}</h3>
          <div className="space-y-4">
            {data.regions.map((region) => (
              <div key={region.id}>
                <h4 className="font-semibold mb-2">{region.name[lang] || region.name.en}</h4>
                <div className="space-y-3">
                  {region.hotlines.map((hotline) => (
                    <div key={hotline.id} className="border border-border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h5 className="font-semibold">{hotline.name[lang] || hotline.name.en}</h5>
                          {hotline.description && (
                            <p className="text-sm text-muted-foreground">
                              {hotline.description[lang] || hotline.description.en}
                            </p>
                          )}
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          <a href={formatPhoneLink(hotline.phone)}>{hotline.phone}</a>
                          {hotline.altPhone && (
                            <>
                              <span className="text-muted-foreground"> · </span>
                              <a href={formatPhoneLink(hotline.altPhone)}>{hotline.altPhone}</a>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {hotline.hours[lang] || hotline.hours.en} · {hotline.languages.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
