import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { isPath } from 'src/common/helpers'
import { COOKIE_KEY } from 'src/common/helpers'
import { useLanguage } from 'src/common/hooks'

export const withAuth = (Component: any) => {
  const WithAuthWrapper = (props: any) => {
    const email = useSelector((state: any) => state?.session?.email || '')
    useEffect(() => {
      const pathname = location.pathname
      const loggedIn = Cookies.get(COOKIE_KEY.logged_in)
      if (isPath(pathname).getType() === 'loginRequired' && !email && loggedIn) {
        // get me API
      }
    }, [email])

    const [_lang, setLang] = useLanguage()
    useEffect(() => {
      const currentLang = Cookies.get(COOKIE_KEY.NEXT_LOCALE) || 'jp'
      setLang(currentLang as Types.LanguageType)
    }, [])
    return Component({ ...props })
  }
  return WithAuthWrapper
}
