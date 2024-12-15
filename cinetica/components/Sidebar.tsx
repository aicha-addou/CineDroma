"use client"

import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { ThemeToggle } from "./ThemeToggle"

export function Sidebar() {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  return (
    <div className="w-64 h-screen bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-4 fixed left-0">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">Cinedroma</h1>
        <ThemeToggle />
      </div>
      <ul className="space-y-6">
        <li className="mb-1">
          <button 
            onClick={() => router.push('/accueil')}
            className="text-lg font-semibold hover:text-blue-500 transition-colors w-full text-left"
          >
            Discover
          </button>
        </li>
        <li>
          <h2 className="text-lg font-semibold">Movies</h2>
          <ul className="ml-4 mt-2">
            <li className="mb-1">
              <button 
                onClick={() => router.push('/accueil/movies/now-playing')}
                className="hover:text-blue-500 text-left w-full transition-colors"
              >
                Now playing
              </button>
            </li>
            <li className="mb-1">
              <button 
                onClick={() => router.push('/accueil/movies/popular')}
                className="hover:text-blue-500 text-left w-full transition-colors"
              >
                Popular
              </button>
            </li>
            <li>
              <button 
                onClick={() => router.push('/accueil/movies/top-rated')}
                className="hover:text-blue-500 text-left w-full transition-colors"
              >
                Top Rated
              </button>
            </li>
          </ul>
        </li>
        <li>
          <h2 className="text-lg font-semibold">TV Shows</h2>
          <ul className="ml-4 mt-2">
            <li className="mb-1">
              <button 
                onClick={() => router.push('/accueil/tv/on-the-air')}
                className="hover:text-blue-500 text-left w-full transition-colors"
              >
                On the air
              </button>
            </li>
            <li className="mb-1">
              <button 
                onClick={() => router.push('/accueil/tv/popular')}
                className="hover:text-blue-500 text-left w-full transition-colors"
              >
                Popular
              </button>
            </li>
            <li>
              <button 
                onClick={() => router.push('/accueil/tv/top-rated')}
                className="hover:text-blue-500 text-left w-full transition-colors"
              >
                Top Rated
              </button>
            </li>
          </ul>
        </li>
      </ul>
      <button 
        onClick={handleLogout}
        className="mt-12 w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Déconnexion
      </button>
    </div>
  )
} 