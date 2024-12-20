import { NextResponse } from 'next/server';

const API_KEY = "5713c1a1191884f7f6a81c60c1d730d8";

interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  first_air_date: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
}

export async function GET() {
  try {
    const [moviesRes, tvRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=fr-FR`),
      fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&language=fr-FR`)
    ])

    const [moviesData, tvData] = await Promise.all([
      moviesRes.json(),
      tvRes.json()
    ])

    const formattedTVShows = tvData.results.map((show: TVShow) => ({
      ...show,
      title: show.name,
      media_type: 'tv' as const
    }))

    const formattedMovies = moviesData.results.map((movie: Movie) => ({
      ...movie,
      media_type: 'movie' as const
    }))

    const combined = [...formattedMovies, ...formattedTVShows]
      .sort(() => Math.random() - 0.5)
      .slice(0, 20)

    return NextResponse.json({ results: combined })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.error()
  }
}
