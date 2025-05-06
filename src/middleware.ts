import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protect dashboard and subpages
const protectedPaths = [
  '/dashboard',
  '/dashboard/upload',
  '/dashboard/analyze',
  '/dashboard/explain',
  '/dashboard/history',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Check if the path is protected
  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    // Check for a session token (e.g., cookie 'token')
    const token = request.cookies.get('token');
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
