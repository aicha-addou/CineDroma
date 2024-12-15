"use client"

import { useState, useEffect } from "react"
import { TVShow } from "@/entities/TVShows"
import Image from "next/image"

export default function TopRatedTVShowsPage() {
  const [shows, setShows] = useState<TVShow[]>([])
  const [error, setError] = useState<string>("")

  useEffect(() => {
    fetchTopRatedShows()
  }, [])

  const fetchTopRatedShows = async () => {
    try {
      const response = await fetch('/api/shows/top-rated')
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des séries')
      }
      const data = await response.json()
      setShows(data.results || [])
    } catch (error) {
      console.error('Error:', error)
      setError("Impossible de charger les séries")
    }
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">Séries les Mieux Notées</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {shows.map((show) => (
          <div 
            key={show.id} 
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200"
          >
            <div className="relative h-72">
              {show.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 line-clamp-1 dark:text-white">{show.name}</h2>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(show.first_air_date).getFullYear()}
                </span>
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                  {show.vote_average.toFixed(1)} ★
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {show.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 