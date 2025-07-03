import React from "react";

export default function Hero() {
    return (
        <div className="relative flex flex-col items-center justify-center w-screen h-screen text-center bg-gray-100"  >
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-6xl">
                The best place to eat vegan in LA
            </h2>
            <p className="max-w-xl mb-6 text-lg text-gray-700 md:text-xl">
                Des saveurs végétales, fraîches et locales qui éveillent vos papilles.
            </p>
            <div className="flex flex-col w-full max-w-md gap-4 mx-auto">
                <form className="flex items-center w-full px-3 pt-2 bg-white border rounded-full shadow-sm">
                    <button type="submit" className="mr-2 text-gray-500 hover:text-gray-700">
                    🔍
                    </button>
                    <input
                    type="search"
                    placeholder="Rechercher le plat que vous voulez"
                    className="flex-grow outline-none"
                    />
                </form>

                <div className="flex justify-center gap-4">
                    <button className="px-6 py-3 font-semibold text-black transition-transform transform bg-yellow-400 rounded-full shadow-md hover:bg-yellow-500 hover:scale-105">
                    Recettes disponibles
                    </button>
                    <button className="px-6 py-3 font-semibold text-yellow-600 transition-transform transform border border-yellow-400 rounded-full shadow-md hover:bg-yellow-100 hover:scale-105">
                    Commander en ligne
                    </button>
                </div>
            </div>
        </div>

    )
} 