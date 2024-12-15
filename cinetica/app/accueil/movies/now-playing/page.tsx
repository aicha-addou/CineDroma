"use client"

import { useState, useEffect } from "react"
import { Movie } from "@/entities/Movie"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

export default function NowPlayingMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    fetchNowPlayingMovies()
  }, [])

  const fetchNowPlayingMovies = async () => {
    try {
      const response = await fetch('/api/movies/now-playing')
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des films')
      }
      const data = await response.json()
      setMovies(data.results || [])
    } catch (error) {
      console.error('Error:', error)
      setError("Impossible de charger les films")
    }
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed left-0">
        <h1 className="text-2xl font-bold mb-8 text-center">Cinedroma</h1>
        <ul className="space-y-6">
          <li>
            <h2 className="text-lg font-semibold mb-3 text-gray-300">Movies</h2>
            <ul className="ml-4 space-y-2">
              <li>
                <button 
                  onClick={() => router.push('/accueil/movies/now-playing')}
                  className="text-blue-400 hover:text-blue-300 text-left w-full font-bold transition-colors"
                >
                  Now playing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/accueil')}
                  className="text-gray-300 hover:text-white text-left w-full transition-colors"
                >
                  Discover
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white text-left w-full transition-colors">
                  Top Rated
                </button>
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-lg font-semibold mb-3 text-gray-300">TV Shows</h2>
            <ul className="ml-4 space-y-2">
              <li>
                <button className="text-gray-300 hover:text-white text-left w-full transition-colors">
                  On the air
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white text-left w-full transition-colors">
                  Popular
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white text-left w-full transition-colors">
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

      {/* Main Content */}
      <div className="ml-64 flex-1 min-h-screen bg-gray-900 text-white">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Films à l'affiche</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <div 
                key={movie.id} 
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200"
              >
                <div className="relative h-72">
                  {movie.poster_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2 line-clamp-1">{movie.title}</h2>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                    {movie.vote_average && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                        {movie.vote_average.toFixed(1)} ★
                      </span>
                    )}
                  </div>
                  {movie.overview && (
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {movie.overview}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
