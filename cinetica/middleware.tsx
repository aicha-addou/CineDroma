import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value 
  || request.cookies.get('__Secure-next-auth.session-token')?.value;  
  const { pathname } = request.nextUrl;

  console.log("Middleware actif, token :", token);
  console.log("Requête pour :", pathname);

  // Si l'utilisateur n'est pas authentifié
  if (!token) {
    if (pathname === "/" || pathname.startsWith("/accueil")) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }
  // Si l'utilisateur est authentifié
  else {
    if (pathname === "/login") {
      const dashboardUrl = new URL("/accueil", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Matcher pour appliquer le middleware sur les routes nécessaires
export const config = {
  matcher: ["/", "/login", "/accueil/:path*"],
};