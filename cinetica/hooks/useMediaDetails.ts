"use client"

import { useState } from "react"
import { MediaDetails, MediaItem } from "@/types/media"

export function useMediaDetails(mediaType: "movie" | "tv") {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [details, setDetails] = useState<MediaDetails | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchDetails = async (id: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/accueil/components/${mediaType === "movie" ? "movies" : "TVShows"}/${id}`)
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

  return {
    selectedId,
    details,
    loading,
    handleItemClick,
    handleClose
  }
} 