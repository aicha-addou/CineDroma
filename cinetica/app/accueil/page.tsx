// app/accueil.tsx
"use client";

import {redirect} from "next/navigation";
import {useSession} from "next-auth/react";

export default function Home() {
  


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
                <a href="#" className="hover:underline">
                  Now playing
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
        <h1 className="text-4xl font-bold">Bienvenue sur la page d'accueil !</h1>
        <p className="mt-4 text-xl">To be continued...</p>
      </div>
    </div>
  );
}
