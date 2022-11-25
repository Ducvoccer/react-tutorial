import { setSessionCookie } from 'common-ui/open-api/cookie'
import { apiPjc, navigateCheck } from 'src/common/helpers'

export function useLoginController() {
  return {
    onLogin,
  }
}

const onLogin = async ({ username, password }: { username: string; password: string }) => {
  const result: ResultType = (
    await apiPjc.post(process.env.PATH_AUTH, {
      grant_type: 'password',
      username,
      password,
      scope: 'admin',
    })
  ).data
  setSessionCookie(result)
  const redirect = navigateCheck({
    pathname: window.location.pathname,
    cookie: document.cookie,
  })
  window.location.replace(redirect)
}

type ResultType = {
  access_token: string
  created_at: number
  expires_in: number
  refresh_token: string
  token_type: string
}
