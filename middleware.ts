import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
// import { admin } from '@/firebase/firebaseAdmin';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const cookietoken = cookieStore.get('token');

  const requestHeaders = new Headers(request.headers);

  if (
    request.nextUrl.pathname !== '/' &&
    request.nextUrl.pathname !== '/signin' &&
    request.nextUrl.pathname.indexOf('/introduce/') === -1
  ) {
    requestHeaders.set('x-hello-from-middleware1', 'hello');
  }
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
  return response;
}
export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|Iconly|assets|favicon.ico|logo.svg).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
