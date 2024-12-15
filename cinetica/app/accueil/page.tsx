// app/accueil.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { X } from "lucide-react";

interface Media {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type: 'movie' | 'tv';
  overview: string;
  genres?: { id: number; name: string }[];
}

export default function Home() {
  const { data: session } = useSession();
  const [trendingMedia, setTrendingMedia] = useState<Media[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch('/api/discover/movie-TV');
        const data = await res.json();
        setTrendingMedia(data.results);
      } catch (error) {
        console.error('Error fetching trending:', error);
      }
    };

    fetchTrending();
  }, []);

  const handleMediaClick = async (media: Media) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${media.media_type === 'movie' ? 'movies' : 'shows'}/${media.id}`);
      const details = await res.json();
      setSelectedMedia({
        ...details,
        media_type: media.media_type,
        title: details.title || details.name
      });
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Tendances</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {trendingMedia.map((media) => (
          <div 
            key={media.id} 
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
            onClick={() => handleMediaClick(media)}
          >
            <div className="relative h-72">
              {media.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                  alt={media.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 line-clamp-1 dark:text-white">{media.title}</h2>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(media.release_date || media.first_air_date || "").getFullYear()}
                </span>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                    {media.vote_average.toFixed(1)} ★
                  </span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700">
                    {media.media_type === 'movie' ? 'Film' : 'Série'}
                  </span>
                </div>
              </div>
              {media.overview && (
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {media.overview}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute right-4 top-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : (
              <>
                <div className="relative h-[300px] w-full">
                  {selectedMedia.backdrop_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/original${selectedMedia.backdrop_path}`}
                      alt={selectedMedia.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {selectedMedia.title}
                    </h2>
                    <div className="flex items-center gap-4 text-white">
                      <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                        {selectedMedia.vote_average.toFixed(1)} ★
                      </span>
                      <span>
                        {new Date(selectedMedia.release_date || selectedMedia.first_air_date || "").getFullYear()}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-gray-700 text-sm">
                        {selectedMedia.media_type === 'movie' ? 'Film' : 'Série'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {selectedMedia.genres && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedMedia.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    {selectedMedia.overview}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
