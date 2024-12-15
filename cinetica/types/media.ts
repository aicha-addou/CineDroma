export interface MediaItem {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date?: string
  first_air_date?: string
}

export interface MediaDetails extends MediaItem {
  overview: string
  backdrop_path: string | null
  genres: { id: number; name: string }[]
  runtime?: number
  number_of_seasons?: number
} 