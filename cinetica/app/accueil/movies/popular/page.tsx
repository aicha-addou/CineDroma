"use client"

import { useState, useEffect } from "react"
import { Movie } from "@/entities/Movie"
import Image from "next/image"

export default function PopularMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState<string>("")

  useEffect(() => {
    fetchPopularMovies()
  }, [])

  const fetchPopularMovies = async () => {
    try {
      const response = await fetch('/api/movies/popular')
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

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">Films Populaires</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200"
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
              <h2 className="text-lg font-bold mb-2 line-clamp-1 dark:text-white">{movie.title}</h2>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(movie.release_date).getFullYear()}
                </span>
                {movie.vote_average && (
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                    {movie.vote_average.toFixed(1)} ★
                  </span>
                )}
              </div>
              {movie.overview && (
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {movie.overview}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 