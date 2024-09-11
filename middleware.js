
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
  const hassvtCookie = request.cookies.has('svt');
  const otpToken = request.cookies.get('svt')?.value;

  const userIdValue = request.cookies.get('c_user')?.value
  const tokenValue = request.cookies.get('token')?.value

 

  // Redirect logged-in users away from the login page to the messages page
  if (pathname === '/' || pathname === '/register' || pathname === '/login') {
    
    const isValidate = await validateToken({token:tokenValue, user:userIdValue})
    if (hasTokenCookie && isValidate ) {
      return NextResponse.redirect(new URL('/t/messages', request.url));
    }
  } else if (pathname === '/checkpoint') {
    const isOtpValidate = await validateOtp({token:otpToken})
    console.log(isOtpValidate, 'isotpvalidate')
    // Allow users to access the checkpoint page if they have the OTP cookie and are not logged in
    if (isOtpValidate && hassvtCookie) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/signup', request.url));
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


//validate the user
const validateToken = async ({token, user}) =>{

  try {
    
    const result = await fetch(`${process.env.NEXT_PUBLIC_API}/api/validateUser/${user}`,
      {
          method:'GET',
          headers:{
              'Authorization': `Bearer ${token}`,
              "userid": user,
          }
      },
      
      )

if(result.status === 201){
  const data = await result.json();
  console.log(data)
  return data.isValidate
}else{
  return false
}


  } catch (error) {
    console.log('Token validation error:', error);
    return false;
  }
}
const validateOtp = async ({token}) =>{

  try {
    
    const result = await fetch(`${process.env.NEXT_PUBLIC_API}/api/validateOtp/${token}`,
      {
          method:'GET',
      
      },
      
      )

if(result.status === 201){
  const data = await result.json();
  console.log(data)
  return data.isValidate
}else{
  return false
}


  } catch (error) {
    console.log('Token validation error:', error);
    return false;
  }
}


// Define the paths that the middleware should match
export const config = {
  matcher: ['/','/checkpoint', '/t/:path*', '/login',],
};

//'/checkpoint'
