"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SessionProvider, signIn, useSession } from "next-auth/react";
export default function Home() {
// Definition des etats
  const [username, setUsername] = useState(""); // Etat pour le nom d utilisateur
  const [password, setPassword] = useState(""); // Etat pour le mot de passe
  const [error, setError] = useState(""); // Etat pour afficher l erreur en cas d authentification echouee
  const router = useRouter(); // Declare le hook useRouter
// Supprimez cette ligne si la variable n est pas utilisée


  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/img/fond_auth.jpg)", 
          filter: "blur(4px)", 
          zIndex: -1, 
        }}
      ></div>
      <div className="text-center text-white">
        {/* Utilisation de Image pour le logo */}
        <Image
          src="/img/logo.png" // Chemin absolu vers l image dans public
          alt="Logo Cinedroma"
          width={180}  // Largeur en pixels (équivalent de w-24 dans Tailwind)
          height={180} // Hauteur en pixels
          className="mb-6 mx-auto"
        />
        <div className="bg-black bg-opacity-70 p-8 rounded-lg w-80 mx-auto">
          <h2 className="text-2xl mb-6 tracking-wide">LOGIN</h2>
          {/* Affichage du message d erreur */}
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form className="flex flex-col" >
            <label htmlFor="username" className="text-left mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Mise à jour du nom d utilisateur
              required
              className="p-2 mb-4 rounded border-none outline-none text-black"
            />

            <label htmlFor="password" className="text-left mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Mise à jour du mot de passe
              required
              className="p-2 mb-6 rounded border-none outline-none text-black"
            />

            <button onClick={handleClick}
              type="submit"
              className="p-2 rounded bg-gray-600 text-white hover:bg-gray-500 transition duration-300"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  async function handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Empêche le rechargement de la page
    const res = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false, // Ne pas rediriger automatiquement
    });

    if (res?.error) {
        setError(res.error); // Affiche l'erreur si l'authentification échoue
    } else {
        router.push('../accueil'); // Redirige vers la page d'accueil si l'authentification réussit
    }
  }
}



