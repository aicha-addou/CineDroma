"use client"

import Image from "next/image"
import { MediaItem } from "@/types/media"

interface MediaCardProps {
  item: MediaItem
  onClick: () => void
}

export function MediaCard({ item, onClick }: MediaCardProps) {
  return (
    <div 
      className="flex-none w-32 sm:w-40 md:w-48 group/item"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div 
        className="relative h-72 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:scale-105 duration-200"
        onClick={onClick}
      >
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
  )
} 