import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { jwtDecode } from "jwt-decode";
import { CurrentUser } from './types/auth';

export const COOKIE_TOKEN_NAME = "Refuth"

const PUBLIC_PAGES = [
  '/login',
  '/error/401'
]

export default function middleware(request: NextRequest) {
  let isAuthenticated = request.cookies.has(COOKIE_TOKEN_NAME)
  let isPublicPage = PUBLIC_PAGES.some(page => request.nextUrl.pathname === page)

  if (!isAuthenticated && !isPublicPage) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'

    return NextResponse.redirect(redirectUrl)
  }

  if (!isAuthenticated && isPublicPage) {
    return NextResponse.next()
  }

  if (isAuthenticated && request.nextUrl.pathname === "/login") {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/'

    return NextResponse.redirect(redirectUrl)
  }

  if (isAuthenticated && !isPublicPage) {
    let cookie = request.cookies.get(COOKIE_TOKEN_NAME)
    let user = jwtDecode<CurrentUser>(cookie?.value!)
    let hasPermission = user.permissions?.some(path => {
      let pathEscaped = path.replace(/\//g, '\\$&')
      let expressao = new RegExp(`^${pathEscaped}$`, 'g')

      return expressao.test(request.nextUrl.pathname)
    })

    if (hasPermission) {
      return NextResponse.next()
    }

    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/error/401'

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)',
  ],
}