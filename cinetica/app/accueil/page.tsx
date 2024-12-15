// app/accueil.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { MediaCarousel } from "@/components/MediaCarousel";

interface Media {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

export default function Home() {
  const { data: session } = useSession();
  const [trendingMovies, setTrendingMovies] = useState<Media[]>([]);
  const [trendingTVShows, setTrendingTVShows] = useState<Media[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        // Fetch trending movies
        const moviesRes = await fetch('/api/movies/popular');
        const moviesData = await moviesRes.json();
        setTrendingMovies(moviesData.results);

        // Fetch trending TV shows
        const tvRes = await fetch('/api/shows/on-the-air');
        const tvData = await tvRes.json();
        setTrendingTVShows(tvData.results.map((show: any) => ({
          ...show,
          title: show.name // TV shows use 'name' instead of 'title'
        })));
      } catch (error) {
        console.error('Error fetching trending:', error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Découvrez</h1>
      
      <MediaCarousel 
        title="Films Tendances" 
        items={trendingMovies}
        mediaType="movie"
      />
      
      <MediaCarousel 
        title="Séries Tendances" 
        items={trendingTVShows}
        mediaType="tv"
      />
    </div>
  );
}
