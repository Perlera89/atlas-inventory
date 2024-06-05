export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/',
    '/clients/:path*',
    '/employees/:path',
    '/inventory/:path*',
    '/orders/:path*',
    '/profile/:path*'
  ]
}
