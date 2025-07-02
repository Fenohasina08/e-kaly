 import React from 'react'

export default function Header() {
  return (
    <header className="flex flex-col w-screen h-screen font-sans bg-gray-50">
      {/* Navbar */}
      <nav className="p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-2xl font-bold text-black">e‑Kaly</h1>
          <ul className="hidden gap-8 font-medium text-gray-700 md:flex">
            <li className="transition-colors cursor-pointer hover:text-yellow-500">Accueil</li>
            <li className="transition-colors cursor-pointer hover:text-yellow-500">Menu</li>
            <li className="transition-colors cursor-pointer hover:text-yellow-500">Contact</li>
          </ul>
          <button className="hidden px-5 py-2 font-semibold text-black transition-colors bg-yellow-400 rounded-full shadow md:inline-block hover:bg-yellow-500">
            Commander
          </button>
        </div>
      </nav>

      {/* Hero section avec fond clair */}
      {/* <div className="flex flex-col items-center justify-center flex-grow px-4 text-center bg-gray-100">
        <h2 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-6xl">
          The best place to eat vegan in LA
        </h2>
        <p className="max-w-xl mb-6 text-lg text-gray-700 md:text-xl">
          Des saveurs végétales, fraîches et locales qui éveillent vos papilles.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button className="px-6 py-3 font-semibold text-black transition-transform transform bg-yellow-400 rounded-full shadow-md hover:bg-yellow-500 hover:scale-105">
            Réserver une table
          </button>
          <button className="px-6 py-3 font-semibold text-yellow-600 transition-transform transform border border-yellow-400 rounded-full shadow-md hover:bg-yellow-100 hover:scale-105">
            Commander en ligne
          </button>
        </div>
      </div> */}
    </header>
  )
}
