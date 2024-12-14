import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Récupérer le token depuis les cookies
  const token = request.cookies.get('auth-token')?.value
  const isAuthenticated = !!token
  const path = request.nextUrl.pathname

  // Création de l'URL de redirection
  const loginUrl = new URL('/login', request.url)
  const dashboardUrl = new URL('/accueil', request.url)

  // Règle 1 & 2 : Gestion de la route "/"
  if (path === '/') {
    if (!isAuthenticated) {
      return NextResponse.redirect(loginUrl)
    } else {
      return NextResponse.redirect(dashboardUrl)
    }
  }

  // Règle 3 : Utilisateur authentifié essayant d'accéder à /login
  if (path === '/login' && isAuthenticated) {
    return NextResponse.redirect(dashboardUrl)
  }

  // Règle 4 & 5 : Protection des routes /dashboard/*
  if (path.startsWith('/app/accueil')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// Configuration des chemins sur lesquels le middleware doit s'exécuter
export const config = {
  matcher: ['/', '/app/login', '/app/accueil/:path*']
}