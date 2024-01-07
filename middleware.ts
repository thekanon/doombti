import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
// import { admin } from '@/firebase/firebaseAdmin';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const cookietoken = cookieStore.get('token');

  // if (
  //   cookietoken &&
  //   cookietoken.value === '' &&
  //   request.nextUrl.pathname !== '/' &&
  //   request.nextUrl.pathname !== '/signin' &&
  //   request.nextUrl.pathname.indexOf('/introduce/') === -1
  // ) {
  //   return NextResponse.redirect(new URL('/signin', request.url));
  // }
  return NextResponse.next();
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
