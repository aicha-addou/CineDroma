"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselNavigationProps {
  onScroll: (direction: "left" | "right") => void
}

export function CarouselNavigation({ onScroll }: CarouselNavigationProps) {
  return (
    <>
      <button 
        onClick={() => onScroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-lg transform transition-transform hover:scale-110 hover:bg-white dark:hover:bg-gray-700"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <ChevronLeft className="h-6 w-6 text-gray-800 dark:text-white" />
      </button>

      <button 
        onClick={() => onScroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-lg transform transition-transform hover:scale-110 hover:bg-white dark:hover:bg-gray-700"
        style={{ transform: 'translate(50%, -50%)' }}
      >
        <ChevronRight className="h-6 w-6 text-gray-800 dark:text-white" />
      </button>
    </>
  )
} 