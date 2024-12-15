"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { MediaDetails } from "@/types/media"

interface MediaDetailsModalProps {
  isOpen: boolean
  details: MediaDetails | null
  loading: boolean
  onClose: () => void
}

export function MediaDetailsModal({ isOpen, details, loading, onClose }: MediaDetailsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-[95vw] sm:max-w-4xl max-h-[95vh] overflow-y-auto relative">
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
          <>
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] w-full">
              {details.backdrop_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
                  alt={details.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-800" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
                  {details.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-white">
                  <span className="bg-blue-500 px-3 py-1 rounded-full">
                    {details.vote_average.toFixed(1)} ★
                  </span>
                  <span>
                    {new Date(details.release_date || details.first_air_date || "").getFullYear()}
                  </span>
                  {details.runtime && (
                    <span>
                      {Math.floor(details.runtime / 60)}h {details.runtime % 60}min
                    </span>
                  )}
                  {details.number_of_seasons && (
                    <span>
                      {details.number_of_seasons} saison{details.number_of_seasons > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {details.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {details.overview}
              </p>
            </div>
          </>
        ) : (
          <div className="h-96 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Une erreur s'est produite</p>
          </div>
        )}
      </div>
    </div>
  )
} 