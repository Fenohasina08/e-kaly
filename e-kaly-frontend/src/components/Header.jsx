  import React from 'react'

export default function Header() {
  return (
      <header className="fixed top-0 left-0 z-50 flex flex-col w-screen h-[1%] font-sans bg-gray-50 p-0">
        <nav className="p-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between w-[98vw]">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-black ">e‑Kaly</h1>

            {/* Menu */}
              <ul className="hidden gap-8 font-medium text-gray-700 ml-60 md:flex">
                <li className="transition-colors cursor-pointer hover:text-yellow-500">Accueil</li>
                <li className="transition-colors cursor-pointer hover:text-yellow-500">Recettes</li>
                <li className="transition-colors cursor-pointer hover:text-yellow-500">Contacts</li>
              </ul>

            {/* Boutons */}
            <div className="flex flex-row gap-4 ml-20 ">
              <button className="hidden py-2 font-semibold text-black transition-colors bg-yellow-400 rounded-full shadow md:inline-block hover:bg-yellow-500">
                Commander
              </button>
              <button className="font-semibold text-black">
                Se connecter
              </button>
            </div>
          </div>
        </nav>
      </header>
  )
}