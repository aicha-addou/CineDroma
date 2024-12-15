// app/accueil.tsx
"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-200 text-black p-4">
        <h1 className="text-xl font-bold mb-4">Cinedroma</h1>
        <ul>
          <li className="mb-2">
            <h2 className="text-lg font-semibold">Movies</h2>
            <ul className="ml-4 mt-2">
              <li className="mb-1">
                <button 
                  onClick={() => router.push('/accueil/movies/now-playing')}
                  className="hover:underline text-left w-full"
                >
                  Now playing
                </button>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  Popular
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Top Rated
                </a>
              </li>
            </ul>
          </li>
          <li>
            <h2 className="text-lg font-semibold">TV Shows</h2>
            <ul className="ml-4 mt-2">
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  On the air
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  Popular
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Top Rated
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center min-h-screen text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Bienvenue sur la page d'accueil !</h1>
          <p className="mt-4 text-xl">To be continued...</p>
          <button onClick={handleLogout} className="mt-4 p-2 bg-red-500 text-white rounded">
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}
