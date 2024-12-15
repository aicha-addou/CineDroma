"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { MovieDetails } from "@/entities/MovieDetails"
import { Sidebar } from "@/components/Sidebar"

export default function MovieDetailsPage({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/accueil/components/movies/${params.id}`)
        const data = await res.json()
        setMovie(data)
      } catch (error) {
        console.error('Error fetching movie:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-red-500">Erreur lors du chargement du film</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative h-[400px] mb-8 rounded-xl overflow-hidden">
          {movie.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
            <div className="flex items-center gap-4 text-white">
              <span className="bg-blue-500 px-3 py-1 rounded-full">
                {movie.vote_average.toFixed(1)} ★
              </span>
              <span>
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span>
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative h-[450px] rounded-lg overflow-hidden">
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 