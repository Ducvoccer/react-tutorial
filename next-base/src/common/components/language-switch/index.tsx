import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Switch } from 'src/common/antd'
import { buildEnv, COOKIE_KEY } from 'src/common/helpers'
import { useLanguage, useUpdated } from 'src/common/hooks'

export function LanguageSwitch(): JSX.Element {
  const [lang, setLang] = useLanguage()
  const [checked, setChecked] = useState<boolean>()
  const [ref, onUpdated] = useUpdated()

  useEffect(() => {
    const currentLang = Cookies.get(COOKIE_KEY.NEXT_LOCALE) || 'jp'
    setChecked(lang === 'jp')
    setLanguage(currentLang)
    onUpdated()
  }, [lang])

  const setLanguage = (lang: string) => {
    setChecked(lang === 'jp')
    setLang(lang as Types.LanguageType)
    if (Cookies.get(COOKIE_KEY.NEXT_LOCALE) !== lang) {
      Cookies.set(COOKIE_KEY.NEXT_LOCALE, lang)
    }
  }

  const onChange = () => {
    const nextLang = lang === 'jp' ? 'en' : 'jp'
    setLanguage(nextLang)
  }

  return buildEnv.isProduction() ? null : (
    <>
      <label className="language-switch" ref={ref}>
        <Switch size="small" onChange={onChange} checked={checked} />
        <span className="label">{lang}</span>
      </label>
      <style jsx>{`
        .language-switch {
          position: fixed;
          bottom: 0;
          right: 0;
          padding: 10px;
          background-color: #eee;
          z-index: 10;
        }
        .label {
          padding-left: 6px;
        }
      `}</style>
    </>
  )
}
