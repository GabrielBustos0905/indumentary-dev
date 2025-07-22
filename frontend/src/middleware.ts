import { NextRequest, NextResponse } from 'next/server';
import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from './routes';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token_middleware')?.value;
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // const isPublicRoute = publicRoutes.includes(pathname);
  // const isAuthRoute = authRoutes.includes(pathname);

  // Decodificar el token para obtener el userType
  let userType: string | null = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userType = payload.userType;
    } catch (err) {
      console.error('Token inválido', err);
    }
  }

  // console.log({"user": userType})

  // // 🔐 Si es ruta de autenticación y está logueado, redirigir
  // if (isAuthRoute && token) {
  //   return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  // }

  // // 🔒 Si NO está logueado y NO es pública → redirigir al login
  // if (!token && !isPublicRoute) {
  //   const callbackUrl = pathname + nextUrl.search;
  //   return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl));
  // }

  // // 🚫 Si la ruta comienza con /admin y el userType no es admin
  // if (pathname.startsWith('/admin') && userType !== 'ADMIN') {
  //   return NextResponse.redirect(new URL('/unauthorized', nextUrl));
  // }

  // return NextResponse.next();
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if(isAuthRoute) {
    if(token) return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    return
  };
  
  if(!token && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;

    if(nextUrl.search) callbackUrl += nextUrl.search;

    const encodeCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodeCallbackUrl}`, nextUrl));
  };

  if(pathname.startsWith("/admin") && userType !== "ADMIN") {
    return NextResponse.redirect(new URL('/unauthorized', nextUrl))
  }

  return
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
