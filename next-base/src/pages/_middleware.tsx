import { NextRequest, NextResponse } from 'next/server'
import { isPath, navigateCheck } from 'src/common/helpers/router-guard'

export async function middleware(req: NextRequest) {
  const pathname = req.page.name
  const isApi = isPath(pathname).startsWith('/api', '/spree_oauth/token')
  if (pathname && !isApi) {
    if (isPath(req.page.name).getType() !== 'loginRequired') {
      const basicAuth = handleBasicAuth(req)
      if (basicAuth) {
        return basicAuth
      }
    }

    const cookie = req.cookies
    const redirect = navigateCheck({ pathname, cookie })
    if (pathname !== redirect && !isPath(pathname).startsWith('/mfid/auth')) {
      let res = NextResponse.redirect(new URL(redirect, req.url), 307)
      if (redirect === '/login' && !isPath(pathname).startsWith('/mfid/auth', '/', '')) {
        res = res.cookie('client_redirect', pathname)
      }
      console.warn(`>>> do redirect ${pathname} -> ${redirect}`)
      return res
    } else if (pathname === cookie['client_redirect']) {
      let res = NextResponse.next()
      res = res.clearCookie('client_redirect')
      return res
    }
  }
  return NextResponse.next()
}

function handleBasicAuth(req: NextRequest) {
  if (!process.env.BASIC_AUTH_USER || !process.env.BASIC_AUTH_PASSWORD) {
    return
  }

  const basicAuth = req.headers.get('authorization')

  if (!basicAuth) {
    return new Response('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  } else {
    const auth = basicAuth.split(' ')[1]
    const [user, password] = Buffer.from(auth, 'base64').toString().split(':')

    if (!(user === process.env.BASIC_AUTH_USER && password === process.env.BASIC_AUTH_PASSWORD)) {
      return new Response('Auth required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      })
    }
  }
}

// export async function middleware(_req: NextRequest) {
//   return NextResponse.next()
// }
