//Middleware

import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req) {

    //Determine the path the user is currently in
    const pathname = req.nextUrl.pathname

    //Manage route protection
    //getToken automatically checks an decrypts JSON web token
    const isAuth = await getToken({ req })
    const isLoginPage = pathname.startsWith('/login')

    const sensitiveRoutes = ['/dashboard']
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    )

    if (isLoginPage) {
      if (isAuth) {
        //Redirect to the base URL- the dashboard
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }

      //If not authenticated
      return NextResponse.next()
    }

    //If not authenticated and accessing senstive route
    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

//Determines in which routes this middleware runs in
export const config = {
  matchter: ['/', '/login', '/dashboard/:path*'],
}