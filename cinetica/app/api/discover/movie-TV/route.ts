import { NextResponse } from 'next/server';

const API_KEY = "5713c1a1191884f7f6a81c60c1d730d8";

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

    // Transformer les séries TV pour avoir le même format que les films
    const formattedTVShows = tvData.results.map((show: any) => ({
      ...show,
      title: show.name,
      media_type: 'tv'
    }))

    // Ajouter le type aux films
    const formattedMovies = moviesData.results.map((movie: any) => ({
      ...movie,
      media_type: 'movie'
    }))

    // Combiner et mélanger les résultats
    const combined = [...formattedMovies, ...formattedTVShows]
      .sort(() => Math.random() - 0.5)
      .slice(0, 20) // Limiter à 20 résultats

    return NextResponse.json({ results: combined })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.error()
  }
}
