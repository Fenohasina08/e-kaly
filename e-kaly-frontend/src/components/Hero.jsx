import React from "react";
import BackgroundImage from "../../public/images/assiettes.webp"
export default function Hero() {
    return (
        <div
  style={{ backgroundImage: `url(${BackgroundImage})` }}
  className="relative flex flex-col items-center justify-center w-screen h-screen text-center bg-center bg-cover"
>
  {/* Overlay pour améliorer la lisibilité */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  
  {/* Contenu */}
  <div className="relative z-10">
    <h2 className="text-4xl font-extrabold text-center text-white md:text-6xl">
      🍽️ Bienvenue chez <span className="text-yellow-400">e‑Kaly</span>
    </h2>
    <p className="max-w-2xl mx-auto mt-4 text-lg font-medium text-center text-white md:text-xl">
      Découvrez les meilleurs <span className="font-semibold text-yellow-300">plats malgaches</span> livrés directement chez vous.
      Frais, locaux et préparés avec Amour ❤️.
    </p>
    <p className="mt-8 text-sm italic text-center text-gray-200 pb-14 md:text-base">
      “Votre prochaine bouchée préférée est à un clic.”
    </p>

    <div className="flex flex-col w-full max-w-md gap-4 mx-auto">
      <form className="flex items-center w-full max-w-md px-4 py-2 bg-white border border-gray-300 rounded-full shadow focus-within:ring-2 focus-within:ring-yellow-200">
        <span className="mr-2 text-gray-500">🔍</span>
        <input
          type="search"
          placeholder="Rechercher le plat que vous voulez"
          className="flex-grow text-sm text-black placeholder-gray-400 bg-transparent outline-none"
        />
        <button
          type="submit"
          className="px-4 py-1 ml-2 text-sm font-semibold text-white transition-colors bg-yellow-500 rounded-full hover:bg-yellow-600"
        >
          Rechercher
        </button>
      </form>

      <div className="flex justify-center gap-4">
        <button className="px-6 py-3 font-semibold text-black transition-transform transform bg-yellow-400 rounded-full shadow-md hover:bg-yellow-500 hover:scale-105">
          Recettes disponibles
        </button>
        <button className="px-6 py-3 font-semibold text-white transition-transform transform bg-green-600 rounded-full shadow-md hover:bg-green-700 hover:scale-105">
          Commander en ligne
        </button>
      </div>
    </div>
  </div>
</div>
    )
} 