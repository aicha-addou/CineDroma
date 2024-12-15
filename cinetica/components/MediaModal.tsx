"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface MediaDetails {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path: string | null
  vote_average: number
  release_date?: string
  first_air_date?: string
  genres: { id: number; name: string }[]
  runtime?: number
  number_of_seasons?: number
}

interface MediaModalProps {
  mediaId: number
  mediaType: "movie" | "tv"
  isOpen: boolean
  onClose: () => void
}

export function MediaModal({ mediaId, mediaType, isOpen, onClose }: MediaModalProps) {
  const [details, setDetails] = useState<MediaDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen && mediaId) {
      const fetchDetails = async () => {
        try {
          setLoading(true)
          const res = await fetch(`/api/${mediaType}/${mediaId}`)
          const data = await res.json()
          setDetails({
            ...data,
            title: data.title || data.name,
          })
        } catch (error) {
          console.error('Error fetching details:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchDetails()
    }
  }, [mediaId, mediaType, isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : details ? (
          <div className="flex flex-col md:flex-row gap-8 p-6">
            <div className="relative w-full md:w-80 h-[450px] flex-shrink-0">
              {details.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                  alt={details.title || ""}
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold dark:text-white mb-4">{details.title}</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full">
                    {details.vote_average.toFixed(1)} ★
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {new Date(details.release_date || details.first_air_date || "").getFullYear()}
                  </span>
                  {details.runtime && (
                    <span className="text-gray-600 dark:text-gray-400">
                      {Math.floor(details.runtime / 60)}h {details.runtime % 60}min
                    </span>
                  )}
                  {details.number_of_seasons && (
                    <span className="text-gray-600 dark:text-gray-400">
                      {details.number_of_seasons} saison{details.number_of_seasons > 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {details.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {details.overview}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-96 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Une erreur s'est produite</p>
          </div>
        )}
      </div>
    </div>
  )
} 