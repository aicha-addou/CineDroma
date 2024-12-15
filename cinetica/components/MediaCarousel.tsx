"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { MediaItem, MediaDetails } from "@/types/media"

interface MediaCarouselProps {
  title: string
  items: MediaItem[]
  mediaType: "movie" | "tv"
}

export function MediaCarousel({ title, items, mediaType }: MediaCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [details, setDetails] = useState<MediaDetails | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchDetails = async (id: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/${mediaType}/${id}`)
      const data = await res.json()
      setDetails(data)
    } catch (error) {
      console.error('Error fetching details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleItemClick = (id: number) => {
    setSelectedId(id)
    fetchDetails(id)
  }

  const handleClose = () => {
    setSelectedId(null)
    setDetails(null)
  }

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 1200
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
    }
  }

  return (
    <>
      <div className="relative px-4 sm:px-8 lg:px-12 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 dark:text-white">{title}</h2>
        <div className="relative group">
          <button 
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-lg transform transition-transform hover:scale-110 hover:bg-white dark:hover:bg-gray-700"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <ChevronLeft className="h-6 w-6 text-gray-800 dark:text-white" />
          </button>
          
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto gap-2 sm:gap-4 scrollbar-hide scroll-smooth py-4 no-scrollbar"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {items.map((item) => (
              <div 
                key={item.id}
                className="flex-none w-32 sm:w-40 md:w-48 group/item"
                style={{ scrollSnapAlign: 'start' }}
                onClick={() => handleItemClick(item.id)}
              >
                <div className="relative h-72 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:scale-105 duration-200">
                  {item.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold text-sm line-clamp-1">{item.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-300 text-xs">
                        {new Date(item.release_date || item.first_air_date || "").getFullYear()}
                      </span>
                      <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs">
                        {item.vote_average.toFixed(1)} ★
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-lg transform transition-transform hover:scale-110 hover:bg-white dark:hover:bg-gray-700"
            style={{ transform: 'translate(50%, -50%)' }}
          >
            <ChevronRight className="h-6 w-6 text-gray-800 dark:text-white" />
          </button>
        </div>
      </div>

      {selectedId && details && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* ... reste du code du modal ... */}
        </div>
      )}
    </>
  )
} 