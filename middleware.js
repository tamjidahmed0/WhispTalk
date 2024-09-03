
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if(pathname === '/t/settings'){
    return NextResponse.redirect(new URL('/t/settings/profile', request.url));
  }else if(pathname === '/t'){
    return NextResponse.redirect(new URL('/t/messages', request.url));
  }



  // Check for the presence of cookies
  const hasTokenCookie = request.cookies.has('token');
  const hasOtpCookieToken = request.cookies.has('sec');

  // Redirect logged-in users away from the login page to the messages page
  if (pathname === '/' || pathname === '/register' || pathname === '/login') {
    if (hasTokenCookie) {
      return NextResponse.redirect(new URL('/t/messages', request.url));
    }
  } else if (pathname === '/checkpoint') {
    // Allow users to access the checkpoint page if they have the OTP cookie and are not logged in
    if (!hasTokenCookie && hasOtpCookieToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else if (pathname.startsWith('/t/messages') || pathname.startsWith('/t/settings')) {
    // Redirect non-logged-in users to the login page
    if (!hasTokenCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow the request to continue for all other cases
  return NextResponse.next();
}

// Define the paths that the middleware should match
export const config = {
  matcher: ['/','/t/:path*',  '/register', '/login',],
};

//'/checkpoint'
