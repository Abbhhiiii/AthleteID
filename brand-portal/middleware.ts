import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/admin']

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    // For protected routes, we can't check localStorage in middleware
    // So we'll just allow access and let client-side code handle auth check
    // This is because middleware runs on the server where localStorage is not available
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
