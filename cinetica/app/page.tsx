"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Home() {
  // Définition des états
  const [username, setUsername] = useState(""); // État pour le nom d utilisateur
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [error, setError] = useState(""); // État pour afficher l erreur en cas d authentification échouée
  const router = useRouter(); // Déclare le hook useRouter
// Supprimez cette ligne si la variable n est pas utilisée

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Assure-toi que username et password sont bien définis
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push("/accueil"); // Redirige vers la nouvelle page "accueil"
      } else {
        setError(data.message || "Erreur inconnue");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

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
        {/* Utilisation de `Image` pour le logo */}
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
          <form className="flex flex-col" onSubmit={handleLogin}>
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

            <button
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
}
