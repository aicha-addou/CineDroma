"use client";

import {redirect} from "next/navigation";
import {useSession} from "next-auth/react";

export default function Home() {
  
    redirect("/login")
  
  
    return (
        <div>
            <h1>Bienvenue sur la page d'accueil</h1>
            {/* Contenu de la page d'accueil */}
        </div>
    );
}