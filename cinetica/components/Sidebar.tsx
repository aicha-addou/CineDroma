"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { ThemeToggle } from "./ThemeToggle"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface SidebarProps {
  children: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  return (
    <>
      {/* Bouton Toggle avec flèche */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 z-50 transition-all duration-300 bg-gray-200 dark:bg-gray-800 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 ${
          isOpen ? 'left-64' : 'left-6'
        }`}
      >
        {isOpen ? (
          <ChevronLeft className="h-6 w-6 text-gray-800 dark:text-white" />
        ) : (
          <ChevronRight className="h-6 w-6 text-gray-800 dark:text-white" />
        )}
      </button>

      {/* Sidebar */}
      <div 
        className={`w-72 h-screen bg-gray-200 dark:bg-gray-800 text-black dark:text-white fixed left-0 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-[90px] flex items-center border-b dark:border-gray-700">
          <div className="w-20" />
          <h1 className="text-xl font-bold flex-1">Cinedroma</h1>
          <div className="mr-10">
            <ThemeToggle />
          </div>
        </div>

        <div className="p-6">
          <ul className="space-y-8">
            <li>
              <button 
                onClick={() => router.push('/accueil')}
                className="w-full text-left px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <span className="text-lg">Discover</span>
              </button>
            </li>

            <li className="space-y-3">
              <h2 className="text-sm uppercase font-bold text-gray-500 dark:text-gray-400 px-4 tracking-wider">
                Movies
              </h2>
              <ul className="space-y-1">
                <li>
                  <button 
                    onClick={() => router.push('/accueil/movies/now-playing')}
                    className="w-full text-left px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Now Playing
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => router.push('/accueil/movies/popular')}
                    className="w-full text-left px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Popular
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => router.push('/accueil/movies/top-rated')}
                    className="w-full text-left px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Top Rated
                  </button>
                </li>
              </ul>
            </li>

            <li className="space-y-3">
              <h2 className="text-sm uppercase font-bold text-gray-500 dark:text-gray-400 px-4 tracking-wider">
                TV Shows
              </h2>
              <ul className="space-y-1">
                <li>
                  <button 
                    onClick={() => router.push('/accueil/tv/on-the-air')}
                    className="w-full text-left px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    On the Air
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => router.push('/accueil/tv/popular')}
                    className="w-full text-left px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Popular
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => router.push('/accueil/tv/top-rated')}
                    className="w-full text-left px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Top Rated
                  </button>
                </li>
              </ul>
            </li>
          </ul>

          <button 
            onClick={handleLogout}
            className="mt-12 w-full py-2.5 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Contenu principal avec margin et padding ajustables */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? 'ml-72' : 'ml-20'
        }`}
      >
        {children}
      </div>
    </>
  )
} 