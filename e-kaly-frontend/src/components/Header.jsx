 import React from 'react'
import { Link } from 'react-router-dom'
import commande from "./Commander";
export default function Header() {
  return (
      <header className="fixed top-0 left-0 z-50 flex flex-col w-screen h-[1%] font-sans bg-gray-50 p-0 ">
        <nav className="flex flex-col gap-2 p-4 bg-white border-b border-gray-200 shadow-sm md:flex ">
          <div className="flex items-center justify-between w-[98vw]">
            <h1 className="text-2xl font-bold text-black ">e‑Kaly</h1>

            <ul className="hidden gap-8 font-medium text-gray-700 ml-60 md:flex">
              <li className="transition-colors cursor-pointer hover:text-yellow-500"><Link to="/" className='no-underline text-inherit'>Accueil</Link></li>
              <li className="transition-colors cursor-pointer hover:text-yellow-500"><Link to="/commander" className="no-underline text-inherit">Recettes</Link></li> 
              <li className="transition-colors cursor-pointer hover:text-yellow-500">Contacts</li>
            </ul>

            <div className="flex flex-row gap-4 ml-20 ">
              <Link to="/commander">
                 <button className="hidden px-6 py-2 font-semibold text-black transition-colors bg-yellow-400 rounded-full shadow md:inline-block hover:bg-yellow-500">
                  Commander
                </button>
              </Link>
               <Link to="/connecter">
                <button className="px-6 py-2 font-semibold text-black transition-colors bg-purple-400 rounded-full hover:bg-purple-500">
                  Se connecter
                </button>
               </Link>
            </div>
          </div>
        </nav>
      </header>
  )
}